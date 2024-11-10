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
exports.CreateDailyPlanDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const index_1 = require("../../../../plugins/contracts/dist/index");
const dto_1 = require("../../../core/dto");
const dto_2 = require("../../../employee/dto");
/**
 * Create Daily Plan DTO validation
 */
class CreateDailyPlanDTO extends (0, swagger_1.IntersectionType)(dto_1.TenantOrganizationBaseDTO, dto_2.EmployeeFeatureDTO) {
    date;
    workTimePlanned;
    status;
    taskId;
}
exports.CreateDailyPlanDTO = CreateDailyPlanDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateDailyPlanDTO.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDailyPlanDTO.prototype, "workTimePlanned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.DailyPlanStatusEnum }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(index_1.DailyPlanStatusEnum, { message: 'status `$value` must be a valid enum value' }),
    __metadata("design:type", String)
], CreateDailyPlanDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", Object)
], CreateDailyPlanDTO.prototype, "taskId", void 0);
//# sourceMappingURL=create-daily-plan.dto.js.map