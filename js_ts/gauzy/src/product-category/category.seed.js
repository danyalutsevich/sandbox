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
exports.createRandomProductCategories = exports.createCategories = void 0;
const product_category_entity_1 = require("./product-category.entity");
const faker_1 = require("@faker-js/faker");
const categories = __importStar(require("./product-category.seed.json"));
const product_category_translation_entity_1 = require("./product-category-translation.entity");
const createCategories = async (dataSource, tenant, organizations) => {
    const seedProductCategories = [];
    for await (const organization of organizations) {
        for await (const seedProductCategory of categories) {
            const { category } = seedProductCategory;
            const image = faker_1.faker.image.urlLoremFlickr({ category });
            const newCategory = new product_category_entity_1.ProductCategory();
            newCategory.imageUrl = image;
            newCategory.organization = organization;
            newCategory.tenant = tenant;
            newCategory.translations = [];
            seedProductCategory.translations.forEach((translation) => {
                const newTranslation = new product_category_translation_entity_1.ProductCategoryTranslation();
                newTranslation.organization = organization;
                newTranslation.tenant = tenant;
                Object.assign(newTranslation, translation);
                newCategory.translations.push(newTranslation);
            });
            seedProductCategories.push(newCategory);
        }
    }
    return await insertProductCategories(dataSource, seedProductCategories);
};
exports.createCategories = createCategories;
const insertProductCategories = async (dataSource, categories) => {
    return await dataSource.manager.save(categories);
};
const createRandomProductCategories = async (dataSource, tenants, tenantOrganizationsMap) => {
    const seedProductCategories = [];
    for await (const tenant of tenants) {
        const organizations = tenantOrganizationsMap.get(tenant);
        for await (const organization of organizations) {
            for (const seedProductCategory of categories) {
                const { category } = seedProductCategory;
                const image = faker_1.faker.image.urlLoremFlickr({ category });
                const newCategory = new product_category_entity_1.ProductCategory();
                newCategory.imageUrl = image;
                newCategory.organization = organization;
                newCategory.tenant = tenant;
                newCategory.translations = [];
                seedProductCategory.translations.forEach((translation) => {
                    const newTranslation = new product_category_translation_entity_1.ProductCategoryTranslation();
                    newTranslation.organization = organization;
                    newTranslation.tenant = tenant;
                    Object.assign(newTranslation, translation);
                    newCategory.translations.push(newTranslation);
                });
                seedProductCategories.push(newCategory);
            }
        }
    }
    await insertProductCategories(dataSource, seedProductCategories);
    return seedProductCategories;
};
exports.createRandomProductCategories = createRandomProductCategories;
//# sourceMappingURL=category.seed.js.map