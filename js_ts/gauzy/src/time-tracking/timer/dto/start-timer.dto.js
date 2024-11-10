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
exports.StartTimerDTO = void 0;
const index_1 = require("../../../../plugins/contracts/dist/index");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dto_1 = require("./../../../core/dto");
class StartTimerDTO extends dto_1.TenantOrganizationBaseDTO {
    logType;
    source;
    isBillable;
    description;
    projectId;
    taskId;
    organizationContactId;
    organizationTeamId;
    /**
     * Version of the sources (Desktop/Web/Browser/Mobile) timer
     */
    version;
}
exports.StartTimerDTO = StartTimerDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.TimeLogType }),
    (0, class_validator_1.IsEnum)(index_1.TimeLogType),
    __metadata("design:type", String)
], StartTimerDTO.prototype, "logType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.TimeLogSourceEnum }),
    (0, class_validator_1.IsEnum)(index_1.TimeLogSourceEnum),
    __metadata("design:type", String)
], StartTimerDTO.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], StartTimerDTO.prototype, "isBillable", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StartTimerDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", Object)
], StartTimerDTO.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", Object)
], StartTimerDTO.prototype, "taskId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", Object)
], StartTimerDTO.prototype, "organizationContactId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", Object)
], StartTimerDTO.prototype, "organizationTeamId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, example: '1.0.1' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StartTimerDTO.prototype, "version", void 0);
//# sourceMappingURL=start-timer.dto.js.map