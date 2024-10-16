"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomWarehouses = void 0;
const faker_1 = require("@faker-js/faker");
const internal_1 = require("../core/entities/internal");
const utils_1 = require("../core/seeds/utils");
const createRandomWarehouses = async (dataSource, tenants, tenantOrganizationsMap) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, Product Warehouses will not be created');
        return;
    }
    const countries = await dataSource.manager.find(internal_1.Country);
    for await (const tenant of tenants) {
        const organizations = tenantOrganizationsMap.get(tenant);
        let warehouses = [];
        for await (const organization of organizations) {
            const products = await dataSource.manager.find(internal_1.Product, {
                where: {
                    tenantId: tenant.id,
                    organizationId: organization.id
                },
                relations: {
                    variants: true
                }
            });
            for (let i = 0; i <= Math.floor(Math.random() * 3) + 1; i++) {
                const warehouse = applyRandomProperties(tenant, organization, countries);
                warehouse.products = [];
                for (let i = 0; i <= Math.floor(Math.random() * 2); i++) {
                    const product = faker_1.faker.helpers.arrayElement(products);
                    let warehouseProduct = new internal_1.WarehouseProduct();
                    warehouseProduct.product = product;
                    warehouseProduct.tenant = tenant;
                    warehouseProduct.organization = organization;
                    warehouseProduct.variants = [];
                    let productsQuantity = 0;
                    for await (const variant of product.variants) {
                        const quantity = faker_1.faker.number.int(200);
                        productsQuantity += quantity;
                        const warehouseVariant = new internal_1.WarehouseProductVariant();
                        warehouseVariant.tenant = tenant;
                        warehouseVariant.organization = organization;
                        warehouseVariant.variant = variant;
                        warehouseVariant.quantity = quantity;
                        warehouseProduct.variants.push(warehouseVariant);
                    }
                    warehouseProduct.quantity = productsQuantity;
                    warehouse.products.push(warehouseProduct);
                }
                warehouses.push(warehouse);
            }
        }
        await dataSource.manager.save(warehouses);
    }
};
exports.createRandomWarehouses = createRandomWarehouses;
const applyRandomProperties = (tenant, organization, countries) => {
    const warehouse = new internal_1.Warehouse();
    warehouse.name = faker_1.faker.company.name();
    warehouse.code = faker_1.faker.string.uuid();
    warehouse.email = (0, utils_1.getEmailWithPostfix)(faker_1.faker.internet.exampleEmail(warehouse.name));
    warehouse.description = faker_1.faker.lorem.words();
    warehouse.active = faker_1.faker.datatype.boolean();
    warehouse.organization = organization;
    warehouse.tenant = tenant;
    const contact = new internal_1.Contact();
    contact.firstName = faker_1.faker.person.firstName();
    contact.lastName = faker_1.faker.person.lastName();
    contact.name = contact.firstName + ' ' + contact.lastName;
    contact.website = faker_1.faker.internet.url();
    contact.address = faker_1.faker.location.streetAddress();
    contact.address2 = faker_1.faker.location.secondaryAddress();
    contact.city = faker_1.faker.location.city();
    contact.country = faker_1.faker.helpers.arrayElement(countries).isoCode;
    contact.fax = faker_1.faker.number.int(8).toString();
    contact.longitude = +faker_1.faker.location.longitude();
    contact.latitude = +faker_1.faker.location.latitude();
    contact.organization = organization;
    contact.tenant = tenant;
    const logo = new internal_1.ImageAsset();
    logo.name = faker_1.faker.company.name();
    logo.url = faker_1.faker.image.url();
    logo.organization = organization;
    logo.tenant = tenant;
    warehouse.contact = contact;
    warehouse.logo = logo;
    return warehouse;
};
//# sourceMappingURL=warehouse.seed.js.map