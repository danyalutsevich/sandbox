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
exports.FiltersQueryDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const contracts_1 = require("../../../plugins/contracts");
const validators_1 = require("./../../shared/validators");
/**
 * Get filters common request DTO validation
 */
class FiltersQueryDTO {
    source;
    logType;
    activityLevel;
}
exports.FiltersQueryDTO = FiltersQueryDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: contracts_1.TimeLogSourceEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(contracts_1.TimeLogSourceEnum, { each: true }),
    __metadata("design:type", Array)
], FiltersQueryDTO.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: contracts_1.TimeLogType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(contracts_1.TimeLogType, { each: true }),
    __metadata("design:type", Array)
], FiltersQueryDTO.prototype, "logType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => 'object' }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsBetweenActivty)(FiltersQueryDTO, (it) => it.activityLevel),
    __metadata("design:type", Object)
], FiltersQueryDTO.prototype, "activityLevel", void 0);
//# sourceMappingURL=filters-query.dto.js.map