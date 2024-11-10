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
exports.CreateTenantSettingDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const index_1 = require("../../../../plugins/contracts/dist/index");
const aws_s3_provider_config_dto_1 = require("./aws-s3-provider-config.dto");
const wasabi_s3_provider_config_dto_1 = require("./wasabi-s3-provider-config.dto");
const cloudinary_provider_config_dto_1 = require("./cloudinary-provider-config.dto");
const digitalocean_s3_provider_config_dto_1 = require("./digitalocean-s3.provider-config.dto");
/**
 * Tenant Setting Save Request DTO validation
 */
class CreateTenantSettingDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.IntersectionType)(wasabi_s3_provider_config_dto_1.WasabiS3ProviderConfigDTO, digitalocean_s3_provider_config_dto_1.DigitalOceanS3ProviderConfigDTO), (0, swagger_1.IntersectionType)(aws_s3_provider_config_dto_1.AwsS3ProviderConfigDTO, cloudinary_provider_config_dto_1.CloudinaryProviderConfigDTO)) {
    /**
     * FileStorage Provider Configuration
     */
    fileStorageProvider;
}
exports.CreateTenantSettingDTO = CreateTenantSettingDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: index_1.FileStorageProviderEnum }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(index_1.FileStorageProviderEnum),
    (0, class_transformer_1.Transform)((params) => params.value.trim().toUpperCase()),
    __metadata("design:type", String)
], CreateTenantSettingDTO.prototype, "fileStorageProvider", void 0);
//# sourceMappingURL=create-tenant-setting.dto.js.map