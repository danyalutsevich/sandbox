"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomAvailabilitySlots = exports.createDefaultAvailabilitySlots = void 0;
const faker_1 = require("@faker-js/faker");
const moment_1 = __importDefault(require("moment"));
const index_1 = require("../../plugins/contracts/dist/index");
const availability_slots_entity_1 = require("./availability-slots.entity");
const createDefaultAvailabilitySlots = async (dataSource, tenants, organization, employees, noOfAvailabilitySlotsPerOrganization) => {
    let slots = [];
    for (const tenant of tenants) {
        slots = await dataOperation(dataSource, slots, noOfAvailabilitySlotsPerOrganization, employees, organization, tenant);
    }
    return slots;
};
exports.createDefaultAvailabilitySlots = createDefaultAvailabilitySlots;
const createRandomAvailabilitySlots = async (dataSource, tenants, tenantOrganizationsMap, organizationEmployeesMap, noOfAvailabilitySlotsPerOrganization) => {
    let slots = [];
    for (const tenant of tenants) {
        const organizations = tenantOrganizationsMap.get(tenant);
        for (const organization of organizations) {
            const employees = organizationEmployeesMap.get(organization);
            slots = await dataOperation(dataSource, slots, noOfAvailabilitySlotsPerOrganization, employees, organization, tenant);
        }
    }
    return slots;
};
exports.createRandomAvailabilitySlots = createRandomAvailabilitySlots;
const dataOperation = async (dataSource, slots, noOfAvailabilitySlotsPerOrganization, employees, organization, tenant) => {
    for (let i = 0; i < noOfAvailabilitySlotsPerOrganization; i++) {
        const slot = new availability_slots_entity_1.AvailabilitySlot();
        slot.allDay = faker_1.faker.datatype.boolean();
        slot.employee = faker_1.faker.helpers.arrayElement([
            faker_1.faker.helpers.arrayElement(employees),
            null
        ]);
        slot.organization = organization;
        slot.tenant = tenant;
        slot.startTime = faker_1.faker.date.between({
            from: new Date(),
            to: (0, moment_1.default)(new Date()).add(2, 'months').toDate()
        });
        slot.endTime = faker_1.faker.date.between({
            from: slot.startTime,
            to: (0, moment_1.default)(slot.startTime).add(7, 'hours').toDate()
        });
        slot.type = faker_1.faker.helpers.arrayElement(Object.values(index_1.AvailabilitySlotType));
        slots.push(slot);
    }
    await dataSource.manager.save(slots);
    return slots;
};
//# sourceMappingURL=availability-slots.seed.js.map