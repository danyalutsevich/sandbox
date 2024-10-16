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
exports.CreateManualTimeLogDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const index_1 = require("../../../../plugins/contracts/dist/index");
const manual_time_log_dto_1 = require("./manual-time-log.dto");
/**
 * DTO for creating manual time logs.
 * Extends ManualTimeLogDTO and implements IManualTimeInput.
 */
class CreateManualTimeLogDTO extends manual_time_log_dto_1.ManualTimeLogDTO {
    /**
    * Type of the time log (e.g., MANUAL).
    */
    logType;
    /**
     * Source of the time log (e.g., WEB_TIMER).
     */
    source;
}
exports.CreateManualTimeLogDTO = CreateManualTimeLogDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.TimeLogType }),
    (0, class_validator_1.IsEnum)(index_1.TimeLogType),
    (0, class_transformer_1.Transform)(() => index_1.TimeLogType.MANUAL),
    __metadata("design:type", String)
], CreateManualTimeLogDTO.prototype, "logType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.TimeLogSourceEnum }),
    (0, class_validator_1.IsEnum)(index_1.TimeLogSourceEnum),
    (0, class_transformer_1.Transform)(() => index_1.TimeLogSourceEnum.WEB_TIMER),
    __metadata("design:type", String)
], CreateManualTimeLogDTO.prototype, "source", void 0);
//# sourceMappingURL=create-time-log.dto.js.map