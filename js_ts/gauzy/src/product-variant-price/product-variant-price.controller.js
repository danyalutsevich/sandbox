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
exports.ProductVariantPriceController = void 0;
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("./../core/crud");
const common_1 = require("@nestjs/common");
const product_variant_price_service_1 = require("./product-variant-price.service");
const guards_1 = require("./../shared/guards");
let ProductVariantPriceController = exports.ProductVariantPriceController = class ProductVariantPriceController extends crud_1.CrudController {
    productVariantPriceService;
    constructor(productVariantPriceService) {
        super(productVariantPriceService);
        this.productVariantPriceService = productVariantPriceService;
    }
};
exports.ProductVariantPriceController = ProductVariantPriceController = __decorate([
    (0, swagger_1.ApiTags)('ProductVariantPrice'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [product_variant_price_service_1.ProductVariantPriceService])
], ProductVariantPriceController);
//# sourceMappingURL=product-variant-price.controller.js.map