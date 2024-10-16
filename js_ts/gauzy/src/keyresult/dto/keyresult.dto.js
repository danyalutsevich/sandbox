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
exports.KeyresultDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class KeyresultDTO {
    name;
    description;
    type;
    targetValue;
    initialValue;
    unit;
    update;
    progress;
    deadline;
    hardDeadline;
    softDeadline;
    status;
    weight;
    ownerId;
    owner;
    lead;
    leadId;
    project;
    projectId;
    task;
    kpi;
    kpiId;
    goal;
    goalId;
    updates;
}
exports.KeyresultDTO = KeyresultDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KeyresultDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KeyresultDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KeyresultDTO.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], KeyresultDTO.prototype, "targetValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], KeyresultDTO.prototype, "initialValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KeyresultDTO.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], KeyresultDTO.prototype, "update", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], KeyresultDTO.prototype, "progress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KeyresultDTO.prototype, "deadline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], KeyresultDTO.prototype, "hardDeadline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], KeyresultDTO.prototype, "softDeadline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KeyresultDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KeyresultDTO.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KeyresultDTO.prototype, "ownerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Object, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], KeyresultDTO.prototype, "owner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Object, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], KeyresultDTO.prototype, "lead", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KeyresultDTO.prototype, "leadId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Object, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], KeyresultDTO.prototype, "project", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KeyresultDTO.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Object, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], KeyresultDTO.prototype, "task", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Object, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], KeyresultDTO.prototype, "kpi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KeyresultDTO.prototype, "kpiId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Object, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], KeyresultDTO.prototype, "goal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KeyresultDTO.prototype, "goalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Object, isArray: true, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], KeyresultDTO.prototype, "updates", void 0);
//# sourceMappingURL=keyresult.dto.js.map