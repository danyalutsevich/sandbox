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
exports.ProductVariantDeleteHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const product_variant_delete_command_1 = require("../product-variant.delete.command");
const product_variant_service_1 = require("../../product-variant.service");
const product_setting_service_1 = require("../../../product-setting/product-setting.service");
const product_variant_price_service_1 = require("../../../product-variant-price/product-variant-price.service");
let ProductVariantDeleteHandler = exports.ProductVariantDeleteHandler = class ProductVariantDeleteHandler {
    productVariantService;
    productVariantSettingsService;
    productVariantPricesService;
    constructor(productVariantService, productVariantSettingsService, productVariantPricesService) {
        this.productVariantService = productVariantService;
        this.productVariantSettingsService = productVariantSettingsService;
        this.productVariantPricesService = productVariantPricesService;
    }
    async execute(command) {
        const { productVariantId } = command;
        const productVariant = await this.productVariantService.findOneByIdString(productVariantId);
        const deleteRes = [
            await this.productVariantService.delete(productVariant.id),
            await this.productVariantPricesService.delete(productVariant.price.id),
            await this.productVariantSettingsService.delete(productVariant.setting.id)
        ];
        return {
            raw: deleteRes.map((res) => res.affected),
            affected: deleteRes
                .map((res) => (res.affected ? res.affected : 0))
                .reduce((acc, value) => acc + value)
        };
    }
};
exports.ProductVariantDeleteHandler = ProductVariantDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(product_variant_delete_command_1.ProductVariantDeleteCommand),
    __metadata("design:paramtypes", [product_variant_service_1.ProductVariantService,
        product_setting_service_1.ProductVariantSettingService,
        product_variant_price_service_1.ProductVariantPriceService])
], ProductVariantDeleteHandler);
//# sourceMappingURL=product-variant.delete.handler.js.map