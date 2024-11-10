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
exports.ManualTimeLogDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const validators_1 = require("./../../../shared/validators");
const dto_1 = require("./../../../core/dto");
/**
 * Data transfer object for creating or updating ManualTimeLog entities.
 */
class ManualTimeLogDTO extends dto_1.TenantOrganizationBaseDTO {
    /**
     * The start date and time of the manual time log.
     */
    startedAt;
    /**
     * The end date and time of the manual time log.
     */
    stoppedAt;
    /**
     * The ID of the employee associated with the manual time log.
     */
    employeeId;
}
exports.ManualTimeLogDTO = ManualTimeLogDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date }),
    (0, class_validator_1.IsNotEmpty)({ message: "Started date should not be empty" }),
    (0, validators_1.IsBeforeDate)(ManualTimeLogDTO, (it) => it.stoppedAt, {
        message: "Started date must be before stopped date"
    }),
    __metadata("design:type", Date)
], ManualTimeLogDTO.prototype, "startedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date }),
    (0, class_validator_1.IsNotEmpty)({ message: "Stopped date should not be empty" }),
    __metadata("design:type", Date)
], ManualTimeLogDTO.prototype, "stoppedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", Object)
], ManualTimeLogDTO.prototype, "employeeId", void 0);
//# sourceMappingURL=manual-time-log.dto.js.map