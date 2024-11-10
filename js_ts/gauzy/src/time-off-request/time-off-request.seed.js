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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomEmployeeTimeOff = exports.createDefaultEmployeeTimeOff = void 0;
const faker_1 = require("@faker-js/faker");
const date_fns_1 = require("date-fns");
const _ = __importStar(require("underscore"));
const index_1 = require("../../plugins/contracts/dist/index");
const time_off_request_entity_1 = require("./time-off-request.entity");
const time_off_policy_entity_1 = require("../time-off-policy/time-off-policy.entity");
const status = Object.values(index_1.StatusTypesEnum);
const createDefaultEmployeeTimeOff = async (dataSource, tenant, organization, employees, noOfEmployeeTimeOffRequest) => {
    let timeOffRequests = [];
    const { id: tenantId } = tenant;
    const { id: organizationId } = organization;
    const policies = await dataSource.manager.find(time_off_policy_entity_1.TimeOffPolicy, {
        where: {
            tenantId,
            organizationId
        }
    });
    for (let i = 0; i < noOfEmployeeTimeOffRequest; i++) {
        for await (const policy of policies) {
            const request = new time_off_request_entity_1.TimeOffRequest();
            request.policy = policy;
            request.organizationId = organizationId;
            request.tenantId = tenantId;
            request.employees = _.chain(employees)
                .shuffle()
                .take(faker_1.faker.number.int({ min: 1, max: 3 }))
                .values()
                .value();
            request.description = 'Time off';
            request.isHoliday = faker_1.faker.helpers.arrayElement([true, false]);
            request.isArchived = faker_1.faker.helpers.arrayElement([true, false]);
            request.start = faker_1.faker.date.future({ years: 0.5 });
            request.end = (0, date_fns_1.addDays)(request.start, faker_1.faker.number.int(7));
            request.requestDate = faker_1.faker.date.recent();
            request.status = faker_1.faker.helpers.arrayElement(status);
            request.documentUrl = '';
            const timeOffRequest = await dataSource.manager.save(request);
            timeOffRequests.push(timeOffRequest);
        }
    }
    return timeOffRequests;
};
exports.createDefaultEmployeeTimeOff = createDefaultEmployeeTimeOff;
const createRandomEmployeeTimeOff = async (dataSource, tenants, tenantOrganizationsMap, organizationEmployeesMap, noOfEmployeeTimeOffRequest) => {
    let requests = [];
    for await (const tenant of tenants) {
        const organizations = tenantOrganizationsMap.get(tenant);
        for await (const organization of organizations) {
            const { id: organizationId } = organization;
            const { id: tenantId } = tenant;
            const employees = organizationEmployeesMap.get(organization);
            const policies = await dataSource.manager.find(time_off_policy_entity_1.TimeOffPolicy, {
                where: {
                    tenantId,
                    organizationId
                }
            });
            for (let i = 0; i < noOfEmployeeTimeOffRequest; i++) {
                for await (const policy of policies) {
                    const request = new time_off_request_entity_1.TimeOffRequest();
                    request.policy = policy;
                    request.organizationId = organizationId;
                    request.tenantId = tenantId;
                    request.employees = _.chain(employees)
                        .shuffle()
                        .take(faker_1.faker.number.int({ min: 1, max: 3 }))
                        .values()
                        .value();
                    request.description = 'Time off';
                    request.isHoliday = faker_1.faker.helpers.arrayElement([true, false]);
                    request.isArchived = faker_1.faker.helpers.arrayElement([true, false]);
                    request.start = faker_1.faker.date.future({ years: 0.5 });
                    request.end = (0, date_fns_1.addDays)(request.start, faker_1.faker.number.int(7));
                    request.requestDate = faker_1.faker.date.recent();
                    request.status = faker_1.faker.helpers.arrayElement(status);
                    request.documentUrl = '';
                    const timeOffRequest = await dataSource.manager.save(request);
                    requests.push(timeOffRequest);
                }
            }
        }
    }
    return requests;
};
exports.createRandomEmployeeTimeOff = createRandomEmployeeTimeOff;
//# sourceMappingURL=time-off-request.seed.js.map