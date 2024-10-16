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
exports.CreateProductDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const product_dto_1 = require("./product.dto");
class CreateProductDTO extends product_dto_1.ProductDTO {
    type;
    category;
    optionGroupUpdateInputs;
    optionGroupCreateInputs;
    optionGroupDeleteInputs;
    optionDeleteInputs;
    translations;
    language;
}
exports.CreateProductDTO = CreateProductDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Object }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    __metadata("design:type", Object)
], CreateProductDTO.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Object }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    __metadata("design:type", Object)
], CreateProductDTO.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Object, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateProductDTO.prototype, "optionGroupUpdateInputs", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Object }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateProductDTO.prototype, "optionGroupCreateInputs", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Object }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateProductDTO.prototype, "optionGroupDeleteInputs", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Object }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateProductDTO.prototype, "optionDeleteInputs", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Object }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateProductDTO.prototype, "translations", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDTO.prototype, "language", void 0);
//# sourceMappingURL=create-product.dto.js.map