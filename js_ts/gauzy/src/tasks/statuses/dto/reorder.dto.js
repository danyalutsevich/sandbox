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
exports.ReorderRequestDTO = exports.ReorderDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const dto_1 = require("../../../core/dto");
/**
 * DTO for individual reorder request item.
 */
class ReorderDTO {
    id;
    order;
}
exports.ReorderDTO = ReorderDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'UUID of the record to reorder' }),
    (0, class_validator_1.IsNotEmpty)() // It should have a value
    ,
    (0, class_validator_1.IsUUID)() // Must be a UUID
    ,
    __metadata("design:type", String)
], ReorderDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'New order for the record' }),
    (0, class_validator_1.IsNotEmpty)() // It should have a value
    ,
    (0, class_validator_1.IsNumber)() // Must be a number
    ,
    __metadata("design:type", Number)
], ReorderDTO.prototype, "order", void 0);
/**
 * DTO for the entire reorder request containing multiple items.
 */
class ReorderRequestDTO extends dto_1.TenantOrganizationBaseDTO {
    reorder;
}
exports.ReorderRequestDTO = ReorderRequestDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [ReorderDTO], description: 'List of reordering instructions' }),
    (0, class_validator_1.IsArray)() // Should be an array
    ,
    (0, class_validator_1.ArrayMinSize)(1) // Requires at least one item in the array
    ,
    (0, class_validator_1.ValidateNested)({ each: true }) // Validate each item in the array
    ,
    (0, class_transformer_1.Type)(() => ReorderDTO) // Transform to ReorderDTO
    ,
    __metadata("design:type", Array)
], ReorderRequestDTO.prototype, "reorder", void 0);
//# sourceMappingURL=reorder.dto.js.map