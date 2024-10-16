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
exports.GoalTimeFrameDTO = void 0;
const contracts_1 = require("../../../plugins/contracts");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class GoalTimeFrameDTO {
    name;
    status;
    startDate;
    endDate;
}
exports.GoalTimeFrameDTO = GoalTimeFrameDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GoalTimeFrameDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: contracts_1.TimeFrameStatusEnum, readOnly: true }),
    (0, class_validator_1.IsEnum)(contracts_1.TimeFrameStatusEnum),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GoalTimeFrameDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date, readOnly: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], GoalTimeFrameDTO.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date, readOnly: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], GoalTimeFrameDTO.prototype, "endDate", void 0);
//# sourceMappingURL=goal-time-frame.dto.js.map