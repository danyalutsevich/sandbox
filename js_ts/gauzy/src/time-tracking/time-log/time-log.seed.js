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
exports.recalculateTimesheetActivity = exports.createRandomTimeLogs = void 0;
const typeorm_1 = require("typeorm");
const faker_1 = require("@faker-js/faker");
const _ = __importStar(require("underscore"));
const contracts_1 = require("../../../plugins/contracts");
const moment_1 = __importDefault(require("moment"));
const index_1 = require("../../../plugins/common/dist/index");
const screenshot_seed_1 = require("../screenshot/screenshot.seed");
const time_slot_seed_1 = require("../time-slot/time-slot.seed");
const internal_1 = require("./../../core/entities/internal");
const utils_1 = require("./../../core/utils");
const common_1 = require("@nestjs/common");
const database_helper_1 = require("./../../database/database.helper");
const createRandomTimeLogs = async (dataSource, config, tenant, timeSheets) => {
    const query = dataSource.getRepository(internal_1.OrganizationProject).createQueryBuilder('organization_project');
    const projects = await query
        .leftJoinAndSelect(`${query.alias}.tasks`, 'tasks')
        .leftJoinAndSelect(`${query.alias}.organizationContact`, 'organizationContact')
        .andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" =:tenantId`), { tenantId: tenant.id })
        .andWhere((0, database_helper_1.prepareSQLQuery)(`"tasks"."tenantId" =:tenantId`), { tenantId: tenant.id })
        .getMany();
    if ((0, index_1.isEmpty)(projects)) {
        console.warn(`Warning: projects not found for tenantId: ${tenant.id}, RandomTimesheet will not be created`);
        return;
    }
    const timeSheetChunk = _.chunk(timeSheets, 5);
    const allTimeSlots = [];
    for (let timeSheetChunkIndex = 0; timeSheetChunkIndex < timeSheetChunk.length; timeSheetChunkIndex++) {
        const timeLogs = [];
        for (let timeSheetIndex = 0; timeSheetIndex < timeSheetChunk[timeSheetChunkIndex].length; timeSheetIndex++) {
            const timesheet = timeSheetChunk[timeSheetChunkIndex][timeSheetIndex];
            const randomDays = _.chain([0, 1, 2, 3, 4, 5, 6])
                .shuffle()
                .take(faker_1.faker.number.int({ min: 3, max: 5 }))
                .values()
                .value();
            for (let index = 0; index <= randomDays.length; index++) {
                const day = randomDays[index];
                const date = (0, moment_1.default)(timesheet.startedAt).add(day, 'day').toDate();
                const range = dateRanges(moment_1.default.utc(date).startOf('day').toDate(), moment_1.default.utc(date).toDate());
                for (let rangeIndex = 0; rangeIndex < range.length; rangeIndex++) {
                    const { startedAt, stoppedAt } = range[rangeIndex];
                    if (moment_1.default.utc().isAfter(moment_1.default.utc(stoppedAt))) {
                        const project = faker_1.faker.helpers.arrayElement(projects);
                        const task = faker_1.faker.helpers.arrayElement(project.tasks);
                        const source = faker_1.faker.helpers.arrayElement(Object.keys(contracts_1.TimeLogSourceEnum));
                        let logType = contracts_1.TimeLogType.TRACKED;
                        if (source === contracts_1.TimeLogSourceEnum.WEB_TIMER ||
                            source === contracts_1.TimeLogSourceEnum.BROWSER_EXTENSION) {
                            logType = contracts_1.TimeLogType.MANUAL;
                        }
                        const { employeeId, organizationId } = timesheet;
                        const timeLog = new internal_1.TimeLog({
                            employeeId,
                            organizationId,
                            timesheet,
                            project,
                            task,
                            startedAt: moment_1.default.utc(startedAt).toDate(),
                            stoppedAt: moment_1.default.utc(stoppedAt).toDate(),
                            logType,
                            source,
                            tenant
                        });
                        timeLog.organizationContact = project.organizationContact;
                        timeLog.description = faker_1.faker.lorem.sentence(faker_1.faker.number.int(10));
                        timeLog.isBillable = faker_1.faker.helpers.arrayElement([true, false]);
                        timeLog.isRunning = false;
                        timeLogs.push(timeLog);
                    }
                }
            }
        }
        const savedTimeLogs = await dataSource.getRepository(internal_1.TimeLog).save(timeLogs);
        const trackedTimeSlots = [];
        for await (const timeLog of savedTimeLogs) {
            const { startedAt, stoppedAt, employeeId, organizationId, tenantId } = timeLog;
            const newTimeSlots = (0, time_slot_seed_1.createTimeSlots)(startedAt, stoppedAt).map((timeSlot) => {
                return {
                    ...timeSlot,
                    employeeId,
                    organizationId,
                    tenantId,
                    timeLogs: [timeLog]
                };
            });
            trackedTimeSlots.push(...newTimeSlots);
        }
        /*
        * Saved Tracked Time Log & Time Slots and Related Screenshots
        */
        const newTrackedTimeSlots = [];
        for await (const timeSlot of trackedTimeSlots) {
            const { tenantId, organizationId, startedAt, stoppedAt } = timeSlot;
            const randomScreenshots = await (0, screenshot_seed_1.createRandomScreenshot)(config, tenantId, organizationId, startedAt, stoppedAt);
            const screenshots = randomScreenshots.map((item) => new internal_1.Screenshot(_.omit(item, ['timeSlotId'])));
            const savedScreenshots = await dataSource.getRepository(internal_1.Screenshot).save(screenshots);
            const newTimeSlot = new internal_1.TimeSlot({
                ..._.omit(timeSlot),
                screenshots: savedScreenshots
            });
            newTrackedTimeSlots.push(newTimeSlot);
        }
        await dataSource.getRepository(internal_1.TimeSlot).save(newTrackedTimeSlots);
        allTimeSlots.push(...newTrackedTimeSlots);
    }
    return allTimeSlots;
};
exports.createRandomTimeLogs = createRandomTimeLogs;
function dateRanges(start, stop) {
    const range = [];
    const startedAt = faker_1.faker.date.between({ from: start, to: stop });
    const stoppedAt = faker_1.faker.date.between({
        from: startedAt,
        to: (0, moment_1.default)(startedAt).add(2, 'hours').toDate()
    });
    range.push({ startedAt, stoppedAt });
    return range;
}
const recalculateTimesheetActivity = async (dataSource, timesheets) => {
    for await (const timesheet of timesheets) {
        const { id, startedAt, stoppedAt, employeeId, organizationId, tenantId } = timesheet;
        const { start, end } = (0, utils_1.getDateRangeFormat)(moment_1.default.utc(startedAt), moment_1.default.utc(stoppedAt));
        const query = dataSource.getRepository(internal_1.TimeSlot).createQueryBuilder();
        const timeSlot = await query
            .select('SUM(duration)', 'duration')
            .addSelect('AVG(keyboard)', 'keyboard')
            .addSelect('AVG(mouse)', 'mouse')
            .addSelect('AVG(overall)', 'overall')
            .where(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."employeeId" = :employeeId`), {
                employeeId
            });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), {
                organizationId
            });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), {
                tenantId
            });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."startedAt" >= :startedAt AND "${query.alias}"."startedAt" < :stoppedAt`), {
                startedAt: start,
                stoppedAt: end
            });
        }))
            .getRawOne();
        try {
            await dataSource.getRepository(internal_1.Timesheet).update(id, {
                duration: Math.round(timeSlot.duration),
                keyboard: Math.round(timeSlot.keyboard),
                mouse: Math.round(timeSlot.mouse),
                overall: Math.round(timeSlot.overall)
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(`Can\'t update timesheet for employee-${employeeId} of organization-${organizationId}`);
        }
    }
};
exports.recalculateTimesheetActivity = recalculateTimesheetActivity;
//# sourceMappingURL=time-log.seed.js.map