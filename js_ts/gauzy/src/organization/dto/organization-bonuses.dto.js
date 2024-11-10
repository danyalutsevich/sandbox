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
exports.OrganizationBonusesDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const contracts_1 = require("../../../plugins/contracts");
/**
 * Organization Bonuses DTO validation
 */
class OrganizationBonusesDTO {
    bonusPercentage;
    bonusType;
}
exports.OrganizationBonusesDTO = OrganizationBonusesDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: () => Number,
        example: contracts_1.DEFAULT_PROFIT_BASED_BONUS
    }),
    (0, class_validator_1.ValidateIf)((it) => it.bonusType),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], OrganizationBonusesDTO.prototype, "bonusPercentage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: contracts_1.BonusTypeEnum,
        example: contracts_1.BonusTypeEnum.PROFIT_BASED_BONUS
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(contracts_1.BonusTypeEnum),
    __metadata("design:type", String)
], OrganizationBonusesDTO.prototype, "bonusType", void 0);
//# sourceMappingURL=organization-bonuses.dto.js.map