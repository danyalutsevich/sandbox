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
exports.CreateOrganizationDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const contracts_1 = require("../../../plugins/contracts");
const class_validator_1 = require("class-validator");
const organization_entity_1 = require("./../organization.entity");
const dto_1 = require("./../../tags/dto");
const organization_bonuses_dto_1 = require("./organization-bonuses.dto");
const organization_setting_dto_1 = require("./organization-setting.dto");
/**
 * Organization Create DTO validation
 *
 */
class CreateOrganizationDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.IntersectionType)(organization_bonuses_dto_1.OrganizationBonusesDTO, (0, swagger_1.PickType)(organization_entity_1.Organization, [
    'imageId',
    'upworkOrganizationId',
    'upworkOrganizationName'
])), (0, swagger_1.IntersectionType)(organization_setting_dto_1.OrganizationSettingDTO, dto_1.RelationalTagDTO)) {
    name;
    currency;
}
exports.CreateOrganizationDTO = CreateOrganizationDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrganizationDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: contracts_1.CurrenciesEnum,
        example: contracts_1.CurrenciesEnum.USD,
        required: true
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(contracts_1.CurrenciesEnum),
    __metadata("design:type", String)
], CreateOrganizationDTO.prototype, "currency", void 0);
//# sourceMappingURL=create-organization.dto.js.map