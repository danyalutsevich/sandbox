"use strict";
// Code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta
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
exports.escapeQueryWithParameters = exports.PaginationParams = exports.OptionParams = exports.OptionsRelations = exports.OptionsSelect = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const common_1 = require("../../../plugins/common");
const dto_1 = require("./../../core/dto");
const pagination_helper_1 = require("./pagination.helper");
/**
 * Specifies what columns should be retrieved.
 */
class OptionsSelect {
    select;
}
exports.OptionsSelect = OptionsSelect;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: 'object' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (0, pagination_helper_1.parseObject)(value, common_1.parseToBoolean)),
    __metadata("design:type", Object)
], OptionsSelect.prototype, "select", void 0);
/**
 * Indicates what relations of entity should be loaded (simplified left join form).
*/
class OptionsRelations extends OptionsSelect {
    relations;
}
exports.OptionsRelations = OptionsRelations;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: 'object' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], OptionsRelations.prototype, "relations", void 0);
class OptionParams extends OptionsRelations {
    /**
     * Order, in which entities should be ordered.
     */
    order;
    /**
     * Simple condition that should be applied to match entities.
     */
    where;
    /**
    * Indicates if soft-deleted rows should be included in entity result.
    */
    withDeleted;
}
exports.OptionParams = OptionParams;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: 'object' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], OptionParams.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'object' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => dto_1.TenantOrganizationBaseDTO),
    (0, class_transformer_1.Transform)(({ value }) => value ? escapeQueryWithParameters(value) : {}),
    __metadata("design:type", Object)
], OptionParams.prototype, "where", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: 'boolean' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value ? (0, common_1.parseToBoolean)(value) : false),
    __metadata("design:type", Boolean)
], OptionParams.prototype, "withDeleted", void 0);
/**
 * Describes generic pagination params
 */
class PaginationParams extends OptionParams {
    /**
     * Limit (paginated) - max number of entities should be taken.
     */
    take;
    /**
     * Offset (paginated) where from entities should be taken.
     */
    skip;
}
exports.PaginationParams = PaginationParams;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => 'number', minimum: 0, maximum: 100 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    (0, class_transformer_1.Transform)((params) => parseInt(params.value, 10)),
    __metadata("design:type", Number)
], PaginationParams.prototype, "take", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => 'number', minimum: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Transform)((params) => parseInt(params.value, 10)),
    __metadata("design:type", Number)
], PaginationParams.prototype, "skip", void 0);
/**
 * Function to escape query parameters and convert to DTO class.
 * @param nativeParameters - The original query parameters.
 * @returns {TenantOrganizationBaseDTO} - The escaped and converted query parameters as a DTO instance.
 */
function escapeQueryWithParameters(nativeParameters) {
    // Convert native parameters based on the database connection type
    const builtParameters = (0, pagination_helper_1.convertNativeParameters)(nativeParameters);
    // Convert to DTO class using class-transformer's plainToClass
    return (0, class_transformer_1.plainToClass)(dto_1.TenantOrganizationBaseDTO, builtParameters, { enableImplicitConversion: true });
}
exports.escapeQueryWithParameters = escapeQueryWithParameters;
//# sourceMappingURL=pagination-params.js.map