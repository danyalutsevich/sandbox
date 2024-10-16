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
exports.ExpenseReportQueryDTO = void 0;
const contracts_1 = require("../../../../plugins/contracts");
const mapped_types_1 = require("@nestjs/mapped-types");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dto_1 = require("./../../../shared/dto");
/**
 * Get expense report request DTO validation
 */
class ExpenseReportQueryDTO extends (0, mapped_types_1.IntersectionType)(dto_1.RelationsQueryDTO, dto_1.SelectorsQueryDTO) {
    groupBy;
    categoryId;
}
exports.ExpenseReportQueryDTO = ExpenseReportQueryDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Array, enum: contracts_1.ReportGroupFilterEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(contracts_1.ReportGroupFilterEnum),
    __metadata("design:type", String)
], ExpenseReportQueryDTO.prototype, "groupBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ExpenseReportQueryDTO.prototype, "categoryId", void 0);
//# sourceMappingURL=expense-report-query.dto.js.map