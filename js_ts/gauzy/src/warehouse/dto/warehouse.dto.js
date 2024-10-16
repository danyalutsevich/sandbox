"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseDTO = void 0;
const contracts = __importStar(require("../../../plugins/contracts"));
const mapped_types_1 = require("@nestjs/mapped-types");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dto_1 = require("./../../contact/dto");
const dto_2 = require("./../../tags/dto");
const dto_3 = require("./../../core/dto");
/**
 * Warehouse request DTO validation
 */
class WarehouseDTO extends (0, mapped_types_1.IntersectionType)(dto_3.TenantOrganizationBaseDTO, dto_2.RelationalTagDTO, dto_1.RelationalContactDTO) {
    name;
    code;
    email;
    description;
    active;
    logo;
    logoId;
}
exports.WarehouseDTO = WarehouseDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WarehouseDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WarehouseDTO.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], WarehouseDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WarehouseDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], WarehouseDTO.prototype, "active", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Object, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], WarehouseDTO.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], WarehouseDTO.prototype, "logoId", void 0);
//# sourceMappingURL=warehouse.dto.js.map