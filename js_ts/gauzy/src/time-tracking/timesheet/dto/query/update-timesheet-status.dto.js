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
exports.UpdateTimesheetStatusDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const index_1 = require("../../../../../plugins/contracts/dist/index");
const dto_1 = require("./../../../../core/dto");
/**
 * Update timesheets status request DTO validation
 */
class UpdateTimesheetStatusDTO extends dto_1.TenantOrganizationBaseDTO {
    ids = [];
    status;
}
exports.UpdateTimesheetStatusDTO = UpdateTimesheetStatusDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Array }),
    (0, class_validator_1.ArrayNotEmpty)(),
    __metadata("design:type", Array)
], UpdateTimesheetStatusDTO.prototype, "ids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: index_1.TimesheetStatus }),
    (0, class_validator_1.IsEnum)(index_1.TimesheetStatus),
    __metadata("design:type", String)
], UpdateTimesheetStatusDTO.prototype, "status", void 0);
//# sourceMappingURL=update-timesheet-status.dto.js.map