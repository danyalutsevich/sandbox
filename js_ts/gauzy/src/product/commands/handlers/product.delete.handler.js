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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDeleteHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const product_delete_command_1 = require("../product.delete.command");
const product_service_1 = require("../../product.service");
const product_variant_service_1 = require("../../../product-variant/product-variant.service");
const product_setting_service_1 = require("../../../product-setting/product-setting.service");
const product_variant_price_service_1 = require("../../../product-variant-price/product-variant-price.service");
const product_option_service_1 = require("product-option/product-option.service");
const product_option_group_service_1 = require("product-option/product-option-group.service");
let ProductDeleteHandler = exports.ProductDeleteHandler = class ProductDeleteHandler {
    productService;
    productOptionService;
    productOptionsGroupService;
    productVariantService;
    productVariantSettingsService;
    productVariantPricesService;
    constructor(productService, productOptionService, productOptionsGroupService, productVariantService, productVariantSettingsService, productVariantPricesService) {
        this.productService = productService;
        this.productOptionService = productOptionService;
        this.productOptionsGroupService = productOptionsGroupService;
        this.productVariantService = productVariantService;
        this.productVariantSettingsService = productVariantSettingsService;
        this.productVariantPricesService = productVariantPricesService;
    }
    async execute(command) {
        const { productId } = command;
        const product = await this.productService.findOneByOptions({
            where: { id: productId },
            relations: ['variants', 'optionGroups']
        });
        const settingsToDelete = [];
        const pricesToDelete = [];
        product.variants.forEach((variant) => {
            settingsToDelete.push(variant.setting);
        });
        product.variants.forEach((variant) => {
            pricesToDelete.push(variant.price);
        });
        const optionGroups = product.optionGroups;
        for await (const optionGroup of optionGroups) {
            optionGroup.options.forEach(async (option) => {
                await this.productOptionService.deleteOptionTranslationsBulk(option.translations);
            });
            await this.productOptionService.deleteBulk(optionGroup.options);
        }
        for await (const group of optionGroups) {
            await this.productOptionsGroupService.deleteGroupTranslationsBulk(group.translations);
        }
        await this.productOptionsGroupService.deleteBulk(optionGroups);
        const deleteRes = [
            await this.productVariantService.deleteMany(product.variants),
            await this.productVariantSettingsService.deleteMany(settingsToDelete),
            await this.productVariantPricesService.deleteMany(pricesToDelete),
            await this.productService.delete(product.id)
        ];
        return {
            raw: deleteRes,
            affected: deleteRes
                .map((res) => {
                if (Array.isArray(res)) {
                    return res.length;
                }
                else {
                    return res.affected ? res.affected : 0;
                }
            })
                .reduce((acc, value) => acc + value)
        };
    }
};
exports.ProductDeleteHandler = ProductDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(product_delete_command_1.ProductDeleteCommand),
    __metadata("design:paramtypes", [product_service_1.ProductService, typeof (_a = typeof product_option_service_1.ProductOptionService !== "undefined" && product_option_service_1.ProductOptionService) === "function" ? _a : Object, typeof (_b = typeof product_option_group_service_1.ProductOptionGroupService !== "undefined" && product_option_group_service_1.ProductOptionGroupService) === "function" ? _b : Object, product_variant_service_1.ProductVariantService,
        product_setting_service_1.ProductVariantSettingService,
        product_variant_price_service_1.ProductVariantPriceService])
], ProductDeleteHandler);
//# sourceMappingURL=product.delete.handler.js.map