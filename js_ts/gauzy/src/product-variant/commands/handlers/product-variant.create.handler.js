"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const product_variant_entity_1 = require("../../product-variant.entity");
const product_variant_create_command_1 = require("../product-variant.create.command");
const product_variant_service_1 = require("../../product-variant.service");
const product_variant_price_service_1 = require("../../../product-variant-price/product-variant-price.service");
const product_setting_service_1 = require("../../../product-setting/product-setting.service");
const product_service_1 = require("../../../product/product.service");
let ProductVariantCreateHandler = exports.ProductVariantCreateHandler = class ProductVariantCreateHandler {
    productService;
    productVariantService;
    productVariantPriceService;
    productVariantSettingsService;
    constructor(productService, productVariantService, productVariantPriceService, productVariantSettingsService) {
        this.productService = productService;
        this.productVariantService = productVariantService;
        this.productVariantPriceService = productVariantPriceService;
        this.productVariantSettingsService = productVariantSettingsService;
    }
    async execute(command) {
        const variantCreateInput = command.productInput;
        const product = await this.productService.findById(variantCreateInput.product.id, {
            relations: ['optionGroups']
        });
        let productOptions = [];
        product.optionGroups.forEach((optionGroup) => {
            productOptions = productOptions.concat(optionGroup.options);
        });
        const optionCombinations = variantCreateInput.optionCombinations;
        const { organizationId, tenantId } = variantCreateInput.product;
        const arrVariants = [];
        for await (const optionCombination of optionCombinations) {
            const newProductVariant = new product_variant_entity_1.ProductVariant();
            let variantOptions = [];
            await productOptions.forEach((dbOption, i) => {
                return optionCombination.options.forEach((option) => {
                    if (!!dbOption.translations.find((translation) => translation.name == option)) {
                        variantOptions.push(dbOption);
                    }
                });
            });
            newProductVariant.options = variantOptions;
            newProductVariant.internalReference = variantOptions
                .map((option) => option.name)
                .join('-');
            newProductVariant.organizationId = organizationId;
            newProductVariant.tenantId = tenantId;
            newProductVariant.setting = await this.productVariantSettingsService.createDefaultVariantSettings();
            newProductVariant.price = await this.productVariantPriceService.createDefaultProductVariantPrice();
            newProductVariant.product = await this.productService.findOneByIdString(variantCreateInput.product.id);
            arrVariants.push(await this.productVariantService.createVariant(newProductVariant));
        }
        return arrVariants;
    }
};
exports.ProductVariantCreateHandler = ProductVariantCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(product_variant_create_command_1.ProductVariantCreateCommand),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        product_variant_service_1.ProductVariantService,
        product_variant_price_service_1.ProductVariantPriceService,
        product_setting_service_1.ProductVariantSettingService])
], ProductVariantCreateHandler);
//# sourceMappingURL=product-variant.create.handler.js.map