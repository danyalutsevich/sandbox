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
exports.ProductDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ProductDTO {
    name;
    description;
    enabled;
    code;
    imageUrl;
    featuredImage;
    variants;
    productTypeId;
    productCategoryId;
    productType;
    productCategory;
    tags;
}
exports.ProductDTO = ProductDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ProductDTO.prototype, "enabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDTO.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDTO.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Object }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ProductDTO.prototype, "featuredImage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ProductDTO.prototype, "variants", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDTO.prototype, "productTypeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDTO.prototype, "productCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Object }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ProductDTO.prototype, "productType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Object }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ProductDTO.prototype, "productCategory", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Object, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ProductDTO.prototype, "tags", void 0);
//# sourceMappingURL=product.dto.js.map