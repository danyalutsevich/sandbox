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
exports.CloudinaryProviderConfigDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const index_1 = require("../../../../plugins/contracts/dist/index");
const decorators_1 = require("../../../core/decorators");
const trim_decorator_1 = require("../../../shared/decorators/trim.decorator");
/**
 * Cloudinary FileStorage Provider Configuration DTO validation
 */
class CloudinaryProviderConfigDTO {
    cloudinary_cloud_name;
    cloudinary_api_key;
    cloudinary_api_secret;
    cloudinary_api_secure;
}
exports.CloudinaryProviderConfigDTO = CloudinaryProviderConfigDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.ValidateIf)((it) => it.fileStorageProvider === index_1.FileStorageProviderEnum.CLOUDINARY),
    (0, class_validator_1.IsNotEmpty)(),
    (0, trim_decorator_1.Trimmed)(),
    __metadata("design:type", String)
], CloudinaryProviderConfigDTO.prototype, "cloudinary_cloud_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.ValidateIf)((it) => it.fileStorageProvider === index_1.FileStorageProviderEnum.CLOUDINARY),
    (0, class_validator_1.IsNotEmpty)(),
    (0, decorators_1.IsSecret)(),
    (0, trim_decorator_1.Trimmed)(),
    __metadata("design:type", String)
], CloudinaryProviderConfigDTO.prototype, "cloudinary_api_key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.ValidateIf)((it) => it.fileStorageProvider === index_1.FileStorageProviderEnum.CLOUDINARY),
    (0, class_validator_1.IsNotEmpty)(),
    (0, decorators_1.IsSecret)(),
    (0, trim_decorator_1.Trimmed)(),
    __metadata("design:type", String)
], CloudinaryProviderConfigDTO.prototype, "cloudinary_api_secret", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.ValidateIf)((it) => it.fileStorageProvider === index_1.FileStorageProviderEnum.CLOUDINARY),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CloudinaryProviderConfigDTO.prototype, "cloudinary_api_secure", void 0);
//# sourceMappingURL=cloudinary-provider-config.dto.js.map