"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomProductVariantSettings = void 0;
const product_setting_entity_1 = require("./product-setting.entity");
const faker_1 = require("@faker-js/faker");
const product_category_entity_1 = require("../product-category/product-category.entity");
const product_entity_1 = require("../product/product.entity");
const product_variant_entity_1 = require("../product-variant/product-variant.entity");
const createRandomProductVariantSettings = async (dataSource, tenants, tenantOrganizationsMap) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, Product Options  will not be created');
        return;
    }
    const productVariantSettings = [];
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
                    const productVariants = await dataSource.manager.find(product_variant_entity_1.ProductVariant, {
                        where: [{ productId: product.id }]
                    });
                    for (const productVariant of productVariants) {
                        const productVariantSetting = new product_setting_entity_1.ProductVariantSetting();
                        productVariantSetting.productVariant = productVariant;
                        productVariantSetting.isSubscription = faker_1.faker.datatype.boolean();
                        productVariantSetting.isPurchaseAutomatically = faker_1.faker.datatype.boolean();
                        productVariantSetting.canBeSold = faker_1.faker.datatype.boolean();
                        productVariantSetting.canBePurchased = faker_1.faker.datatype.boolean();
                        productVariantSetting.canBeCharged = faker_1.faker.datatype.boolean();
                        productVariantSetting.canBeRented = faker_1.faker.datatype.boolean();
                        productVariantSetting.isEquipment = faker_1.faker.datatype.boolean();
                        productVariantSetting.trackInventory = faker_1.faker.datatype.boolean();
                        productVariantSetting.tenant = tenant;
                        productVariantSetting.organization = tenantOrg;
                        productVariantSettings.push(productVariantSetting);
                    }
                }
            }
        }
    }
    await dataSource.manager.save(productVariantSettings);
};
exports.createRandomProductVariantSettings = createRandomProductVariantSettings;
//# sourceMappingURL=product-setting.seed.js.map