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
exports.OrganizationTeamStatisticDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const index_1 = require("../../../plugins/common/dist/index");
const dto_1 = require("./../../shared/dto");
/**
 * DTO for handling requests related to organization team statistics.
 * Combines date range and relations query features.
 */
class OrganizationTeamStatisticDTO extends (0, swagger_1.IntersectionType)(dto_1.DateRangeQueryDTO, dto_1.RelationsQueryDTO) {
    /**
     * Indicates whether the last worked task row should be included in the entity result.
     * Default value is set to false.
     */
    withLastWorkedTask;
}
exports.OrganizationTeamStatisticDTO = OrganizationTeamStatisticDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Boolean, default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value ? (0, index_1.parseToBoolean)(value) : false)),
    __metadata("design:type", Boolean)
], OrganizationTeamStatisticDTO.prototype, "withLastWorkedTask", void 0);
//# sourceMappingURL=organization-team-statistic.dto.js.map