"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomEquipments = exports.createDefaultEquipments = void 0;
const faker_1 = require("@faker-js/faker");
const index_1 = require("../../plugins/config/dist/index");
const default_equipments_1 = require("./default-equipments");
const internal_1 = require("./../core/entities/internal");
const createDefaultEquipments = async (dataSource, tenant, organization) => {
    const tags = await dataSource
        .getRepository(internal_1.Tag)
        .createQueryBuilder()
        .getMany();
    const equipments = [];
    const equipment = new internal_1.Equipment();
    equipment.name = 'Fiat Freemont';
    equipment.type = 'Car';
    equipment.serialNumber = 'CB0950AT';
    equipment.manufacturedYear = 2015;
    equipment.initialCost = 40000;
    equipment.currency = index_1.environment.defaultCurrency;
    equipment.maxSharePeriod = 7;
    equipment.tags = [faker_1.faker.helpers.arrayElement(tags)];
    equipment.tenant = tenant;
    equipment.organization = organization;
    equipment.autoApproveShare = true;
    equipments.push(equipment);
    await insertEquipment(dataSource, equipments);
    return equipments;
};
exports.createDefaultEquipments = createDefaultEquipments;
const insertEquipment = async (dataSource, equipment) => {
    await dataSource.manager.save(equipment);
};
const createRandomEquipments = async (dataSource, tenants, noOfEquipmentsPerTenant) => {
    const equipments = [];
    const tags = await dataSource
        .getRepository(internal_1.Tag)
        .createQueryBuilder()
        .getMany();
    for await (const tenant of tenants || []) {
        const { id: tenantId } = tenant;
        const organizations = await dataSource.manager.findBy(internal_1.Organization, {
            tenantId
        });
        for (let i = 0; i < noOfEquipmentsPerTenant; i++) {
            const equipment = new internal_1.Equipment();
            const randomElement = faker_1.faker.helpers.arrayElement(default_equipments_1.DEFAULT_RANDOM_EQUIPMENTS);
            equipment.type = randomElement.key;
            equipment.name = faker_1.faker.helpers.arrayElement(randomElement.value);
            equipment.serialNumber = faker_1.faker.string.uuid();
            equipment.manufacturedYear = faker_1.faker.number.int({
                min: 2000,
                max: 2020
            });
            equipment.initialCost = faker_1.faker.number.int({
                min: 10000,
                max: 50000
            });
            equipment.currency = index_1.environment.defaultCurrency;
            equipment.maxSharePeriod = faker_1.faker.number.int({ min: 1, max: 15 });
            equipment.tags = [faker_1.faker.helpers.arrayElement(tags)];
            equipment.tenant = tenant;
            (equipment.organization = faker_1.faker.helpers.arrayElement(organizations)),
                (equipment.autoApproveShare = faker_1.faker.datatype.boolean());
            equipments.push(equipment);
        }
    }
    await insertEquipment(dataSource, equipments);
    return equipments;
};
exports.createRandomEquipments = createRandomEquipments;
//# sourceMappingURL=equipment.seed.js.map