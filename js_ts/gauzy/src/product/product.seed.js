"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomProduct = exports.createDefaultProducts = void 0;
const faker_1 = require("@faker-js/faker");
const index_1 = require("../../plugins/contracts/dist/index");
const internal_1 = require("./../core/entities/internal");
const createDefaultProducts = async (dataSource, tenant, organization) => {
    const productTypes = await dataSource.manager.find(internal_1.ProductType);
    const productCategories = await dataSource.manager.find(internal_1.ProductCategory);
    const products = [];
    for (let i = 0; i <= 30; i++) {
        const product = new internal_1.Product();
        const translation = new internal_1.ProductTranslation();
        translation.organization = organization;
        translation.tenant = tenant;
        translation.languageCode = index_1.LanguagesEnum.ENGLISH;
        translation.name = faker_1.faker.commerce.productName();
        translation.description = faker_1.faker.lorem.words();
        product.code = faker_1.faker.lorem.word();
        product.productType =
            productTypes[Math.floor(Math.random() * productTypes.length)];
        product.productCategory =
            productCategories[Math.floor(Math.random() * productCategories.length)];
        product.translations = [translation];
        product.organization = organization;
        product.tenant = tenant;
        products.push(product);
    }
    await insertProduct(dataSource, products);
};
exports.createDefaultProducts = createDefaultProducts;
const insertProduct = async (dataSource, products) => {
    await dataSource.manager.save(products);
};
const createRandomProduct = async (dataSource, tenants, tenantOrganizationsMap) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, Product will not be created');
        return;
    }
    const products = [];
    for (const tenant of tenants) {
        const { id: tenantId } = tenant;
        const tenantOrgs = tenantOrganizationsMap.get(tenant);
        for (const tenantOrg of tenantOrgs) {
            const { id: organizationId } = tenantOrg;
            const productCategories = await dataSource.manager.find(internal_1.ProductCategory, {
                where: {
                    tenantId,
                    organizationId
                }
            });
            const productTypes = await dataSource.manager.find(internal_1.ProductType, {
                where: {
                    tenantId,
                    organizationId
                }
            });
            const product = new internal_1.Product();
            const translation = new internal_1.ProductTranslation();
            translation.organization = tenantOrg;
            translation.tenant = tenant;
            translation.languageCode = index_1.LanguagesEnum.ENGLISH;
            translation.name = faker_1.faker.commerce.productName();
            translation.description = faker_1.faker.lorem.words();
            product.translations = [translation];
            product.code = faker_1.faker.lorem.word();
            product.productType =
                productTypes[Math.floor(Math.random() * productTypes.length)];
            product.productCategory =
                productCategories[Math.floor(Math.random() * productCategories.length)];
            product.tenant = tenant;
            product.organization = tenantOrg;
            products.push(product);
        }
    }
    await dataSource.manager.save(products);
};
exports.createRandomProduct = createRandomProduct;
//# sourceMappingURL=product.seed.js.map