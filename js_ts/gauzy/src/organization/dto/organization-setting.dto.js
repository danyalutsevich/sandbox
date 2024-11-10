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
exports.OrganizationSettingDTO = void 0;
const contracts_1 = require("../../../plugins/contracts");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
/**
 * Organization Setting DTO validation
 */
class OrganizationSettingDTO {
    defaultValueDateType;
    startWeekOn;
    regionCode;
    /**
     * Default Organization Invite Expiry Period
     */
    inviteExpiryPeriod = contracts_1.DEFAULT_INVITE_EXPIRY_PERIOD;
}
exports.OrganizationSettingDTO = OrganizationSettingDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: contracts_1.DefaultValueDateTypeEnum,
        example: contracts_1.DefaultValueDateTypeEnum.TODAY,
        required: true
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(contracts_1.DefaultValueDateTypeEnum),
    __metadata("design:type", String)
], OrganizationSettingDTO.prototype, "defaultValueDateType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: contracts_1.WeekDaysEnum,
        example: contracts_1.WeekDaysEnum.MONDAY
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(contracts_1.WeekDaysEnum),
    __metadata("design:type", String)
], OrganizationSettingDTO.prototype, "startWeekOn", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrganizationSettingDTO.prototype, "regionCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: () => Number,
        example: contracts_1.DEFAULT_INVITE_EXPIRY_PERIOD
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)((params) => parseInt(params.value, 10)),
    __metadata("design:type", Number)
], OrganizationSettingDTO.prototype, "inviteExpiryPeriod", void 0);
//# sourceMappingURL=organization-setting.dto.js.map