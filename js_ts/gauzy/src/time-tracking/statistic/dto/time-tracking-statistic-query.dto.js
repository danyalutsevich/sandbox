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
exports.TimeTrackingStatisticQueryDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const index_1 = require("../../../../plugins/common/dist/index");
const dto_1 = require("../../../shared/dto");
const today_date_range_query_dto_1 = require("./today-date-range-query.dto");
/**
 * Get statistic counts request DTO validation
 */
class TimeTrackingStatisticQueryDTO extends (0, swagger_1.IntersectionType)(dto_1.FiltersQueryDTO, (0, swagger_1.IntersectionType)(dto_1.SelectorsQueryDTO, today_date_range_query_dto_1.TodayDateRangeQueryDTO)) {
    defaultRange = false;
    unitOfTime = 'week';
    /**
     * Limit - max number of entities should be taken.
     */
    take;
}
exports.TimeTrackingStatisticQueryDTO = TimeTrackingStatisticQueryDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value ? (0, index_1.parseToBoolean)(value) : false),
    __metadata("design:type", Boolean)
], TimeTrackingStatisticQueryDTO.prototype, "defaultRange", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, example: 'week' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TimeTrackingStatisticQueryDTO.prototype, "unitOfTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)),
    __metadata("design:type", Number)
], TimeTrackingStatisticQueryDTO.prototype, "take", void 0);
//# sourceMappingURL=time-tracking-statistic-query.dto.js.map