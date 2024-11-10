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
exports.createRandomProductType = exports.createDefaultProductType = void 0;
const product_type_entity_1 = require("./product-type.entity");
const seed = __importStar(require("./product-type.seed.json"));
const product_type_translation_entity_1 = require("./product-type-translation.entity");
const createDefaultProductType = async (dataSource, tenant, organizations) => {
    const seedProductTypes = [];
    for (const organization of organizations) {
        const productTypes = await generateProductType(tenant, organization);
        seedProductTypes.push(...productTypes);
    }
    return await insertProductTypes(dataSource, seedProductTypes);
};
exports.createDefaultProductType = createDefaultProductType;
const insertProductTypes = async (dataSource, productTypes) => {
    return await dataSource.manager.save(productTypes);
};
const createRandomProductType = async (dataSource, tenants, tenantOrganizationsMap) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, Random Product Type will not be created');
        return;
    }
    const seedProductTypes = [];
    for await (const tenant of tenants) {
        const organizations = tenantOrganizationsMap.get(tenant);
        for await (const organization of organizations) {
            const productTypes = await generateProductType(tenant, organization);
            seedProductTypes.push(...productTypes);
        }
    }
    return await insertProductTypes(dataSource, seedProductTypes);
};
exports.createRandomProductType = createRandomProductType;
const generateProductType = async (tenant, organization) => {
    const productTypes = [];
    for (const seedProductType of seed) {
        const productType = new product_type_entity_1.ProductType();
        productType.icon = seedProductType.icon;
        productType.organization = organization;
        productType.tenant = tenant;
        productType.translations = [];
        seedProductType.translations.forEach((translation) => {
            const newTranslation = new product_type_translation_entity_1.ProductTypeTranslation();
            newTranslation.organization = organization;
            newTranslation.tenant = tenant;
            Object.assign(newTranslation, translation);
            productType.translations.push(newTranslation);
        });
        productTypes.push(productType);
    }
    return productTypes;
};
//# sourceMappingURL=type.seed.js.map