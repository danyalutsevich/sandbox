"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomActivities = exports.AppsNames = void 0;
const faker_1 = require("@faker-js/faker");
const underscore_1 = __importDefault(require("underscore"));
const moment_1 = __importDefault(require("moment"));
const contracts_1 = require("../../../plugins/contracts");
const activity_entity_1 = require("./activity.entity");
const internal_1 = require("./../../core/entities/internal");
const employee_entity_1 = require("../../employee/employee.entity");
const database_helper_1 = require("./../../database/database.helper");
exports.AppsNames = [
    'Sublime Text',
    'Chrome',
    'Visual Studio Core',
    'Git Desktop',
    'Slack',
    'Skype',
    'Mail',
    'Terminal',
    "Desktop Timer",
    "PgAdmin"
];
const createRandomActivities = async (dataSource, tenant, timeSlots) => {
    const { id: tenantId } = tenant;
    const employees = await dataSource.manager.findBy(employee_entity_1.Employee, {
        tenantId
    });
    let query = dataSource
        .getRepository(internal_1.OrganizationProject)
        .createQueryBuilder();
    query.leftJoinAndSelect(`${query.alias}.tasks`, 'tasks');
    query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId: tenant.id });
    const projects = await query.getMany();
    const appNames = underscore_1.default.shuffle(exports.AppsNames);
    const allActivities = [];
    for (let day = 0; day < 5; day++) {
        const date = (0, moment_1.default)().subtract(day, 'day').toDate();
        for await (const employee of employees || []) {
            const employeeTimeSlots = timeSlots.filter((x) => x.employeeId === employee.id);
            const activities = [];
            for (let i = 0; i < faker_1.faker.number.int({ min: 0, max: appNames.length }); i++) {
                const appName = appNames[i];
                const project = faker_1.faker.helpers.arrayElement(projects);
                const task = faker_1.faker.helpers.arrayElement(project.tasks);
                const timeSlot = faker_1.faker.helpers.arrayElement(employeeTimeSlots);
                const activity = new activity_entity_1.Activity();
                activity.organizationId = employee.organizationId;
                activity.tenant = tenant;
                activity.employee = employee;
                activity.project = project;
                activity.timeSlot = timeSlot;
                activity.task = task;
                activity.title = appName;
                activity.date = (0, moment_1.default)(date).format('YYYY-MM-DD');
                activity.time = (0, moment_1.default)(faker_1.faker.date.between({
                    from: (0, moment_1.default)(date).startOf('day').toDate(),
                    to: (0, moment_1.default)(date).endOf('day').toDate()
                })).format('HH:mm:ss');
                activity.recordedAt = (0, moment_1.default)(date).toDate();
                activity.duration = faker_1.faker.number.int(100);
                activity.type = contracts_1.ActivityType.APP;
                activities.push(activity);
            }
            for (let i = 0; i < faker_1.faker.number.int({ min: 0, max: 10 }); i++) {
                const url = faker_1.faker.internet.domainName();
                for (let j = 0; j < faker_1.faker.number.int({ min: 5, max: 10 }); j++) {
                    const project = faker_1.faker.helpers.arrayElement(projects);
                    const task = faker_1.faker.helpers.arrayElement(project.tasks);
                    const timeSlot = faker_1.faker.helpers.arrayElement(employeeTimeSlots);
                    const activity = new activity_entity_1.Activity();
                    activity.organizationId = employee.organizationId;
                    activity.tenant = tenant;
                    activity.employee = employee;
                    activity.project = project;
                    activity.timeSlot = timeSlot;
                    activity.task = task;
                    activity.title = url;
                    activity.metaData = {
                        url: faker_1.faker.internet.url(),
                        title: faker_1.faker.internet.domainSuffix(),
                        description: faker_1.faker.lorem.sentence()
                    };
                    activity.description = faker_1.faker.lorem.sentence();
                    activity.date = (0, moment_1.default)(date).format('YYYY-MM-DD');
                    activity.time = (0, moment_1.default)(faker_1.faker.date.between({
                        from: (0, moment_1.default)(date).startOf('day').toDate(),
                        to: (0, moment_1.default)(date).endOf('day').toDate()
                    })).format('HH:mm:ss');
                    activity.duration = faker_1.faker.number.int({
                        min: 10,
                        max: 100
                    });
                    activity.type = contracts_1.ActivityType.URL;
                    activities.push(activity);
                }
            }
            await dataSource.manager.save(activities);
            allActivities.push(...allActivities);
        }
    }
    return allActivities;
};
exports.createRandomActivities = createRandomActivities;
//# sourceMappingURL=activity.seed.js.map