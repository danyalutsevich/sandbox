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
exports.GoalGeneralSettingDTO = void 0;
const contracts_1 = require("../../../plugins/contracts");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class GoalGeneralSettingDTO {
    maxObjectives;
    maxKeyResults;
    employeeCanCreateObjective;
    canOwnObjectives;
    canOwnKeyResult;
    krTypeKPI;
    krTypeTask;
}
exports.GoalGeneralSettingDTO = GoalGeneralSettingDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, readOnly: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GoalGeneralSettingDTO.prototype, "maxObjectives", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GoalGeneralSettingDTO.prototype, "maxKeyResults", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], GoalGeneralSettingDTO.prototype, "employeeCanCreateObjective", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: contracts_1.GoalOwnershipEnum, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(contracts_1.GoalOwnershipEnum),
    __metadata("design:type", String)
], GoalGeneralSettingDTO.prototype, "canOwnObjectives", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: contracts_1.GoalOwnershipEnum, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(contracts_1.GoalOwnershipEnum),
    __metadata("design:type", String)
], GoalGeneralSettingDTO.prototype, "canOwnKeyResult", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], GoalGeneralSettingDTO.prototype, "krTypeKPI", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], GoalGeneralSettingDTO.prototype, "krTypeTask", void 0);
//# sourceMappingURL=goal-general-setting.dto.js.map