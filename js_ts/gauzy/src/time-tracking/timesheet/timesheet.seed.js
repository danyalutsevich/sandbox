"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomTimesheet = exports.createDefaultTimeSheet = void 0;
const faker_1 = require("@faker-js/faker");
const contracts_1 = require("../../../plugins/contracts");
const moment_1 = __importDefault(require("moment"));
const _ = __importStar(require("underscore"));
const chalk_1 = __importDefault(require("chalk"));
const time_log_seed_1 = require("./../time-log/time-log.seed");
const activity_seed_1 = require("../activity/activity.seed");
const internal_1 = require("./../../core/entities/internal");
const random_seed_config_1 = require("./../../core/seeds/random-seed-config");
const createDefaultTimeSheet = async (dataSource, config, tenant, organization, employees) => {
    try {
        const timesheets = [];
        for (let index = 0; index < 5; index++) {
            const date = (0, moment_1.default)().subtract(index, 'week').toDate();
            const startedAt = (0, moment_1.default)(date).startOf('week').toDate();
            const stoppedAt = (0, moment_1.default)(date).endOf('week').toDate();
            for await (const employee of employees) {
                const status = faker_1.faker.helpers.arrayElement(Object.keys(contracts_1.TimesheetStatus));
                let isBilled = false;
                let approvedAt = null;
                let submittedAt = null;
                if (contracts_1.TimesheetStatus[status] === contracts_1.TimesheetStatus.PENDING) {
                    approvedAt = null;
                    submittedAt = faker_1.faker.date.past();
                }
                else if (contracts_1.TimesheetStatus[status] === contracts_1.TimesheetStatus.IN_REVIEW) {
                    approvedAt = null;
                    submittedAt = faker_1.faker.date.between({ from: startedAt, to: new Date() });
                }
                else if (contracts_1.TimesheetStatus[status] === contracts_1.TimesheetStatus.APPROVED) {
                    isBilled = faker_1.faker.helpers.arrayElement([true, false]);
                    approvedAt = faker_1.faker.date.between({ from: startedAt, to: new Date() });
                    submittedAt = faker_1.faker.date.between({ from: startedAt, to: approvedAt });
                }
                const timesheet = new internal_1.Timesheet();
                timesheet.employee = employee;
                timesheet.organization = organization;
                timesheet.tenant = tenant;
                timesheet.approvedBy = null;
                timesheet.startedAt = startedAt;
                timesheet.stoppedAt = stoppedAt;
                timesheet.duration = 0;
                timesheet.keyboard = 0;
                timesheet.mouse = 0;
                timesheet.overall = 0;
                timesheet.approvedAt = approvedAt;
                timesheet.submittedAt = submittedAt;
                timesheet.lockedAt = null;
                timesheet.isBilled = isBilled;
                timesheet.status = contracts_1.TimesheetStatus[status];
                timesheets.push(timesheet);
            }
        }
        await dataSource.getRepository(internal_1.Timesheet).save(timesheets);
    }
    catch (error) {
        console.log(chalk_1.default.red(`SEEDING Default Timesheet`, error));
    }
    try {
        console.log(chalk_1.default.green(`SEEDING Default TimeLogs & Activities`));
        const { id: tenantId } = tenant;
        const { id: organizationId } = organization;
        const createdTimesheets = await dataSource.manager.findBy(internal_1.Timesheet, {
            tenantId,
            organizationId
        });
        const timeSlots = await (0, time_log_seed_1.createRandomTimeLogs)(dataSource, config, tenant, createdTimesheets);
        /**
         * Recalculate Timesheet Activities
         */
        await (0, time_log_seed_1.recalculateTimesheetActivity)(dataSource, createdTimesheets);
        await (0, activity_seed_1.createRandomActivities)(dataSource, tenant, timeSlots);
    }
    catch (error) {
        console.log(chalk_1.default.red(`SEEDING Default TimeLogs & Activities`, error));
    }
};
exports.createDefaultTimeSheet = createDefaultTimeSheet;
const createRandomTimesheet = async (dataSource, config, tenants) => {
    for await (const tenant of tenants) {
        try {
            const timesheets = [];
            const { id: tenantId } = tenant;
            const employees = await dataSource.getRepository(internal_1.Employee).find({
                where: {
                    tenantId: tenantId
                },
                relations: {
                    organization: true
                }
            });
            for (let index = 0; index < random_seed_config_1.randomSeedConfig.noOfTimesheetPerEmployee; index++) {
                const date = (0, moment_1.default)().subtract(index, 'week').toDate();
                const startedAt = (0, moment_1.default)(date).startOf('week').toDate();
                const stoppedAt = (0, moment_1.default)(date).endOf('week').toDate();
                _.chain(employees)
                    .shuffle()
                    .take(faker_1.faker.number.int(employees.length))
                    .each((employee) => {
                    const status = faker_1.faker.helpers.arrayElement(Object.keys(contracts_1.TimesheetStatus));
                    let isBilled = false;
                    let approvedAt = null;
                    let submittedAt = null;
                    if (contracts_1.TimesheetStatus[status] === contracts_1.TimesheetStatus.PENDING) {
                        approvedAt = null;
                        submittedAt = faker_1.faker.date.past();
                    }
                    else if (contracts_1.TimesheetStatus[status] === contracts_1.TimesheetStatus.IN_REVIEW) {
                        approvedAt = null;
                        submittedAt = faker_1.faker.date.between({ from: startedAt, to: new Date() });
                    }
                    else if (contracts_1.TimesheetStatus[status] === contracts_1.TimesheetStatus.APPROVED) {
                        isBilled = faker_1.faker.helpers.arrayElement([true, false]);
                        approvedAt = faker_1.faker.date.between({ from: startedAt, to: new Date() });
                        submittedAt = faker_1.faker.date.between({ from: startedAt, to: approvedAt });
                    }
                    const timesheet = new internal_1.Timesheet();
                    timesheet.employee = employee;
                    timesheet.organization = employee.organization;
                    timesheet.tenant = tenant;
                    timesheet.approvedBy = null;
                    timesheet.startedAt = startedAt;
                    timesheet.stoppedAt = stoppedAt;
                    timesheet.duration = 0;
                    timesheet.keyboard = 0;
                    timesheet.mouse = 0;
                    timesheet.overall = 0;
                    timesheet.approvedAt = approvedAt;
                    timesheet.submittedAt = submittedAt;
                    timesheet.lockedAt = null;
                    timesheet.isBilled = isBilled;
                    timesheet.status = contracts_1.TimesheetStatus[status];
                    timesheets.push(timesheet);
                });
            }
            await dataSource.getRepository(internal_1.Timesheet).save(timesheets);
        }
        catch (error) {
            console.log(chalk_1.default.red(`SEEDING Default Timesheet`, error));
        }
    }
    try {
        console.log(chalk_1.default.green(`SEEDING Random TimeLogs & Activities`));
        for await (const tenant of tenants) {
            const { id: tenantId } = tenant;
            const createdTimesheets = await dataSource.manager.findBy(internal_1.Timesheet, {
                tenantId
            });
            const timeSlots = await (0, time_log_seed_1.createRandomTimeLogs)(dataSource, config, tenant, createdTimesheets);
            /**
             * Recalculate Timesheet Activities
             */
            await (0, time_log_seed_1.recalculateTimesheetActivity)(dataSource, createdTimesheets);
            await (0, activity_seed_1.createRandomActivities)(dataSource, tenant, timeSlots);
        }
    }
    catch (error) {
        console.log(chalk_1.default.red(`SEEDING Random TimeLogs & Activities`, error));
    }
};
exports.createRandomTimesheet = createRandomTimesheet;
//# sourceMappingURL=timesheet.seed.js.map