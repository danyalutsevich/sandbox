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
exports.FindMeQueryDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const index_1 = require("../../../plugins/common/dist/index");
const dto_1 = require("./../../shared/dto");
/**
 * DTO for "find me" queries to retrieve logged-in user details, extending from RelationsQueryDTO.
 */
class FindMeQueryDTO extends dto_1.RelationsQueryDTO {
    /**
    * Optional flag to include employee details in the response.
    * It is marked as optional in the API documentation.
    * If provided, its value is transformed to a boolean; defaults to false if not provided.
    */
    includeEmployee;
    /**
    * Optional flag to include organization details inside the employee response.
    * It is marked as optional in the API documentation.
    * If provided, its value is transformed to a boolean; defaults to false if not provided.
    */
    includeOrganization;
}
exports.FindMeQueryDTO = FindMeQueryDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value ? (0, index_1.parseToBoolean)(value) : false),
    __metadata("design:type", Boolean)
], FindMeQueryDTO.prototype, "includeEmployee", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value ? (0, index_1.parseToBoolean)(value) : false),
    __metadata("design:type", Boolean)
], FindMeQueryDTO.prototype, "includeOrganization", void 0);
//# sourceMappingURL=find-me-query.dto.js.map