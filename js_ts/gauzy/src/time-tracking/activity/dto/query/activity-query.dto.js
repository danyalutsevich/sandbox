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
exports.ActivityQueryDTO = void 0;
const index_1 = require("../../../../../plugins/contracts/dist/index");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dto_1 = require("../../../../shared/dto");
/**
 * Get activities request DTO validation
 */
class ActivityQueryDTO extends (0, swagger_1.IntersectionType)(dto_1.FiltersQueryDTO, dto_1.SelectorsQueryDTO) {
    groupBy;
    types;
    titles;
}
exports.ActivityQueryDTO = ActivityQueryDTO;
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ type: () => Array, enum: index_1.ReportGroupFilterEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(index_1.ReportGroupFilterEnum),
    __metadata("design:type", String)
], ActivityQueryDTO.prototype, "groupBy", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ type: () => Array, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ActivityQueryDTO.prototype, "types", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ type: () => Array, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ActivityQueryDTO.prototype, "titles", void 0);
//# sourceMappingURL=activity-query.dto.js.map