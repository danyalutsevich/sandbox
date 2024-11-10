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
exports.SocialNetworksDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dto_1 = require("../../core/dto");
const trim_decorator_1 = require("../../shared/decorators/trim.decorator");
class SocialNetworksDTO extends dto_1.TenantOrganizationBaseDTO {
    linkedInUrl;
    facebookUrl;
    instagramUrl;
    twitterUrl;
    githubUrl;
    gitlabUrl;
    upworkUrl;
    stackoverflowUrl;
}
exports.SocialNetworksDTO = SocialNetworksDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, trim_decorator_1.Trimmed)(),
    (0, class_validator_1.IsUrl)({}, {
        message: "LinkedIn must be an URL address"
    }),
    __metadata("design:type", String)
], SocialNetworksDTO.prototype, "linkedInUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, trim_decorator_1.Trimmed)(),
    (0, class_validator_1.IsUrl)({}, {
        message: "Facebook must be an URL address"
    }),
    __metadata("design:type", String)
], SocialNetworksDTO.prototype, "facebookUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, trim_decorator_1.Trimmed)(),
    (0, class_validator_1.IsUrl)({}, {
        message: "Instagram must be an URL address"
    }),
    __metadata("design:type", String)
], SocialNetworksDTO.prototype, "instagramUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, trim_decorator_1.Trimmed)(),
    (0, class_validator_1.IsUrl)({}, {
        message: "Twitter must be an URL address"
    }),
    __metadata("design:type", String)
], SocialNetworksDTO.prototype, "twitterUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, trim_decorator_1.Trimmed)(),
    (0, class_validator_1.IsUrl)({}, {
        message: "Github must be an URL address"
    }),
    __metadata("design:type", String)
], SocialNetworksDTO.prototype, "githubUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, trim_decorator_1.Trimmed)(),
    (0, class_validator_1.IsUrl)({}, {
        message: "Gitlab must be an URL address"
    }),
    __metadata("design:type", String)
], SocialNetworksDTO.prototype, "gitlabUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, trim_decorator_1.Trimmed)(),
    (0, class_validator_1.IsUrl)({}, {
        message: "Upwork must be an URL address"
    }),
    __metadata("design:type", String)
], SocialNetworksDTO.prototype, "upworkUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, trim_decorator_1.Trimmed)(),
    (0, class_validator_1.IsUrl)({}, {
        message: "Stackoverflow must be an URL address"
    }),
    __metadata("design:type", String)
], SocialNetworksDTO.prototype, "stackoverflowUrl", void 0);
//# sourceMappingURL=network.dto.js.map