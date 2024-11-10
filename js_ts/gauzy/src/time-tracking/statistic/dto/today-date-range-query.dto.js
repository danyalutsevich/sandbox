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
exports.TodayDateRangeQueryDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const validators_1 = require("./../../../shared/validators");
class TodayDateRangeQueryDTO {
    /**
     * The start of the date range for today's logs.
     */
    todayStart;
    /**
     * The end of the date range for today's logs.
     */
    todayEnd;
}
exports.TodayDateRangeQueryDTO = TodayDateRangeQueryDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    (0, validators_1.IsBeforeDate)(TodayDateRangeQueryDTO, (it) => it.todayEnd, {
        message: "Today start date must be before today end date"
    }),
    __metadata("design:type", Date)
], TodayDateRangeQueryDTO.prototype, "todayStart", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], TodayDateRangeQueryDTO.prototype, "todayEnd", void 0);
//# sourceMappingURL=today-date-range-query.dto.js.map