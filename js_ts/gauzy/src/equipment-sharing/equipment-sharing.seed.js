"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomEquipmentSharing = exports.createDefaultEquipmentSharing = void 0;
const faker_1 = require("@faker-js/faker");
const date_fns_1 = require("date-fns");
const equipment_sharing_entity_1 = require("./equipment-sharing.entity");
const internal_1 = require("./../core/entities/internal");
const createDefaultEquipmentSharing = async (dataSource, tenant, organization, defaultEmployees, noOfEquipmentSharingPerTenant) => {
    const { id: tenantId } = tenant;
    const { id: organizationId } = organization;
    let equipmentSharings = [];
    const equipments = await dataSource.manager.findBy(internal_1.Equipment, {
        tenantId,
        organizationId
    });
    for (let i = 0; i < noOfEquipmentSharingPerTenant; i++) {
        for await (const equipment of equipments) {
            const sharing = new equipment_sharing_entity_1.EquipmentSharing();
            sharing.name = faker_1.faker.company.name();
            sharing.equipment = equipment;
            sharing.shareRequestDay = faker_1.faker.date.recent({ days: 30 });
            sharing.shareStartDay = faker_1.faker.date.future({ years: 0.5 });
            sharing.shareEndDay = (0, date_fns_1.addDays)(sharing.shareStartDay, faker_1.faker.number.int(15));
            sharing.status = faker_1.faker.number.int({ min: 1, max: 3 });
            sharing.employees = [faker_1.faker.helpers.arrayElement(defaultEmployees)];
            sharing.organization = organization;
            sharing.tenant = tenant;
            const equipmentSharing = await dataSource.manager.save(sharing);
            equipmentSharings.push(equipmentSharing);
        }
    }
    return equipmentSharings;
};
exports.createDefaultEquipmentSharing = createDefaultEquipmentSharing;
const createRandomEquipmentSharing = async (dataSource, tenants, tenantOrganizationsMap, organizationEmployeesMap, noOfEquipmentSharingPerTenant) => {
    let equipmentSharings = [];
    for await (const tenant of tenants) {
        const organizations = tenantOrganizationsMap.get(tenant);
        for await (const organization of organizations) {
            const { id: organizationId } = organization;
            const { id: tenantId } = tenant;
            const employees = organizationEmployeesMap.get(organization);
            const equipments = await dataSource.manager.findBy(internal_1.Equipment, {
                tenantId,
                organizationId
            });
            for (let i = 0; i < noOfEquipmentSharingPerTenant; i++) {
                for await (const equipment of equipments) {
                    const sharing = new equipment_sharing_entity_1.EquipmentSharing();
                    sharing.name = faker_1.faker.company.name();
                    sharing.equipment = equipment;
                    sharing.shareRequestDay = faker_1.faker.date.recent({ days: 30 });
                    sharing.shareStartDay = faker_1.faker.date.future({ years: 0.5 });
                    sharing.shareEndDay = (0, date_fns_1.addDays)(sharing.shareStartDay, faker_1.faker.number.int(15));
                    sharing.status = faker_1.faker.number.int({ min: 1, max: 3 });
                    sharing.employees = [faker_1.faker.helpers.arrayElement(employees)];
                    sharing.organization = organization;
                    sharing.tenant = tenant;
                    const equipmentSharing = await dataSource.manager.save(sharing);
                    equipmentSharings.push(equipmentSharing);
                }
            }
        }
    }
    return equipmentSharings;
};
exports.createRandomEquipmentSharing = createRandomEquipmentSharing;
//# sourceMappingURL=equipment-sharing.seed.js.map