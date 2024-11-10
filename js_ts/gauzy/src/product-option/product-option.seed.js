"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomProductOptionGroups = exports.createRandomProductOption = void 0;
const product_option_entity_1 = require("./product-option.entity");
const faker_1 = require("@faker-js/faker");
const product_category_entity_1 = require("../product-category/product-category.entity");
const product_entity_1 = require("../product/product.entity");
const product_option_group_entity_1 = require("./product-option-group.entity");
const createRandomProductOption = async (dataSource, tenants, tenantOrganizationsMap, numberOfOptionPerProduct) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, Product Options will not be created');
        return;
    }
    const productOptions = [];
    for (const tenant of tenants) {
        const tenantOrgs = tenantOrganizationsMap.get(tenant);
        for (const tenantOrg of tenantOrgs) {
            const productCategories = await dataSource.manager.findBy(product_category_entity_1.ProductCategory, {
                organizationId: tenantOrg.id
            });
            for (const productCategory of productCategories) {
                const products = await dataSource.manager.find(product_entity_1.Product, {
                    where: {
                        productCategoryId: productCategory.id
                    }
                });
                for (const product of products) {
                    const productOptionGroups = await dataSource.manager.find(product_option_group_entity_1.ProductOptionGroup, {
                        where: {
                            productId: product.id
                        }
                    });
                    for (let group of productOptionGroups) {
                        for (let i = 0; i <= numberOfOptionPerProduct; i++) {
                            const productOption = new product_option_entity_1.ProductOption();
                            productOption.name = faker_1.faker.company.name();
                            productOption.code = product.code;
                            productOption.tenant = tenant;
                            productOption.organization = tenantOrg;
                            productOption.group = group;
                            productOptions.push(productOption);
                        }
                    }
                }
            }
        }
    }
    return await dataSource.manager.save(productOptions);
};
exports.createRandomProductOption = createRandomProductOption;
const createRandomProductOptionGroups = async (dataSource, tenants, tenantOrganizationsMap, numberOfOptionGroupPerProduct) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, Product Options Groups will not be created');
        return;
    }
    const productOptionGroups = [];
    for (const tenant of tenants) {
        const tenantOrgs = tenantOrganizationsMap.get(tenant);
        for (const tenantOrg of tenantOrgs) {
            const productCategories = await dataSource.manager.find(product_category_entity_1.ProductCategory, {
                where: {
                    organizationId: tenantOrg.id
                }
            });
            for (const productCategory of productCategories) {
                const products = await dataSource.manager.find(product_entity_1.Product, {
                    where: {
                        productCategoryId: productCategory.id
                    }
                });
                for (const product of products) {
                    for (let i = 0; i <= numberOfOptionGroupPerProduct; i++) {
                        const productOptionGroup = new product_option_group_entity_1.ProductOptionGroup();
                        productOptionGroup.name = faker_1.faker.company.name();
                        productOptionGroup.tenant = tenant;
                        productOptionGroup.organization = tenantOrg;
                        productOptionGroup.product = product;
                        productOptionGroups.push(productOptionGroup);
                    }
                }
            }
        }
    }
    return await dataSource.manager.save(productOptionGroups);
};
exports.createRandomProductOptionGroups = createRandomProductOptionGroups;
//# sourceMappingURL=product-option.seed.js.map