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
exports.createRandomProductVariant = void 0;
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/contracts/dist/index");
const faker_1 = require("@faker-js/faker");
const _ = __importStar(require("underscore"));
const product_variant_entity_1 = require("./product-variant.entity");
const internal_1 = require("./../core/entities/internal");
const createRandomProductVariant = async (dataSource, tenants, tenantOrganizationsMap, numberOfVariantPerProduct) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, Product Variant will not be created');
        return;
    }
    for await (const tenant of tenants) {
        const { id: tenantId } = tenant;
        const organizations = tenantOrganizationsMap.get(tenant);
        for await (const organization of organizations) {
            const { id: organizationId } = organization;
            const productCategories = await dataSource.manager.findBy(internal_1.ProductCategory, {
                organizationId,
                tenantId
            });
            for await (const productCategory of productCategories) {
                const products = await dataSource.manager.findBy(internal_1.Product, {
                    productCategoryId: productCategory.id
                });
                const productVariants = [];
                for await (const product of products) {
                    const productOptionGroups = await dataSource.manager.findBy(internal_1.ProductOptionGroup, {
                        productId: product.id
                    });
                    const productOptionGroupsIds = _.pluck(productOptionGroups, 'id');
                    const productOptions = await dataSource.manager.find(internal_1.ProductOption, {
                        where: {
                            group: (0, typeorm_1.In)(productOptionGroupsIds),
                        }
                    });
                    for (let i = 0; i < numberOfVariantPerProduct; i++) {
                        const productVariant = new product_variant_entity_1.ProductVariant();
                        productVariant.notes = faker_1.faker.person.jobDescriptor();
                        productVariant.productId = product.id;
                        productVariant.quantity = faker_1.faker.number.int(20);
                        productVariant.billingInvoicingPolicy = faker_1.faker.helpers.arrayElement(Object.keys(index_1.BillingInvoicingPolicyEnum));
                        productVariant.enabled = faker_1.faker.datatype.boolean();
                        productVariant.options = productOptions;
                        productVariant.setting = new internal_1.ProductVariantSetting();
                        productVariant.price = new internal_1.ProductVariantPrice();
                        productVariant.product = product;
                        productVariant.tenant = tenant;
                        productVariant.organization = organization;
                        productVariants.push(productVariant);
                    }
                }
                await dataSource.manager.save(productVariants);
            }
        }
    }
};
exports.createRandomProductVariant = createRandomProductVariant;
//# sourceMappingURL=product-variant.seed.js.map