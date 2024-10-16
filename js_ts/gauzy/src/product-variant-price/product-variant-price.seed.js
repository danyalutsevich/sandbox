"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomProductVariantPrice = void 0;
const product_variant_price_entity_1 = require("./product-variant-price.entity");
const faker_1 = require("@faker-js/faker");
const product_category_entity_1 = require("../product-category/product-category.entity");
const product_entity_1 = require("../product/product.entity");
const product_variant_entity_1 = require("../product-variant/product-variant.entity");
const index_1 = require("../../plugins/config/dist/index");
const createRandomProductVariantPrice = async (dataSource, tenants, tenantOrganizationsMap) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, Product Variant will not be created');
        return;
    }
    const productVariantPrices = [];
    for (const tenant of tenants) {
        const { id: tenantId } = tenant;
        const tenantOrgs = tenantOrganizationsMap.get(tenant);
        for (const tenantOrg of tenantOrgs) {
            const { id: organizationId } = tenantOrg;
            const productCategories = await dataSource.manager.find(product_category_entity_1.ProductCategory, {
                where: {
                    organizationId,
                    tenantId
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
                        where: {
                            productId: product.id
                        }
                    });
                    for (const productVariant of productVariants) {
                        const productVariantPrice = new product_variant_price_entity_1.ProductVariantPrice();
                        productVariantPrice.productVariant = productVariant;
                        productVariantPrice.unitCost = faker_1.faker.number.int(10000);
                        productVariantPrice.unitCostCurrency =
                            tenantOrg.currency || index_1.environment.defaultCurrency;
                        productVariantPrice.retailPrice = faker_1.faker.number.int(productVariantPrice.unitCost);
                        productVariantPrice.retailPriceCurrency =
                            tenantOrg.currency || index_1.environment.defaultCurrency;
                        productVariantPrice.tenant = tenant;
                        productVariant.organization = tenantOrg;
                        productVariantPrices.push(productVariantPrice);
                    }
                }
            }
        }
    }
    await dataSource.manager.save(productVariantPrices);
};
exports.createRandomProductVariantPrice = createRandomProductVariantPrice;
//# sourceMappingURL=product-variant-price.seed.js.map