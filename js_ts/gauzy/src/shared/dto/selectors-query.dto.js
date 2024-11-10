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
exports.SelectorsQueryDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const date_range_query_dto_1 = require("./date-range-query.dto");
/**
 * Get selectors common request DTO validation.
 * Extends DateRangeQueryDTO to include date range filters.
 */
class SelectorsQueryDTO extends date_range_query_dto_1.DateRangeQueryDTO {
    /**
     * An array of employee IDs for filtering time logs.
     */
    employeeIds;
    /**
     * An array of project IDs for filtering time logs.
     */
    projectIds;
    /**
     * An array of task IDs for filtering time logs.
     */
    taskIds;
    /**
     * An array of team IDs for filtering time logs.
     */
    teamIds;
}
exports.SelectorsQueryDTO = SelectorsQueryDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Array, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SelectorsQueryDTO.prototype, "employeeIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Array, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SelectorsQueryDTO.prototype, "projectIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Array, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SelectorsQueryDTO.prototype, "taskIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Array, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SelectorsQueryDTO.prototype, "teamIds", void 0);
//# sourceMappingURL=selectors-query.dto.js.map