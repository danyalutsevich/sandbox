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
exports.UpdateProfileDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const mapped_types_1 = require("@nestjs/mapped-types");
const network_dto_1 = require("./network.dto");
const employment_dto_1 = require("./employment.dto");
const hiring_dto_1 = require("./hiring.dto");
const rates_dto_1 = require("./rates.dto");
const dto_1 = require("./../../tags/dto");
const employee_entity_1 = require("./../employee.entity");
/**
 * EMPLOYEE can updates these fields only
 * Public Fields DTO
 */
class UpdateProfileDTO extends (0, mapped_types_1.IntersectionType)(network_dto_1.SocialNetworksDTO, employment_dto_1.EmploymentDTO, hiring_dto_1.HiringDTO, rates_dto_1.RatesDTO, dto_1.RelationalTagDTO, (0, swagger_1.PickType)(employee_entity_1.Employee, ['upworkId', 'linkedInId'])) {
    profile_link;
    contact;
    isAway;
}
exports.UpdateProfileDTO = UpdateProfileDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDTO.prototype, "profile_link", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Object }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateProfileDTO.prototype, "contact", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProfileDTO.prototype, "isAway", void 0);
//# sourceMappingURL=update-profile.dto.js.map