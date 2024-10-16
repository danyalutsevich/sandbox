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
exports.CreateEmployeeDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mapped_types_1 = require("@nestjs/mapped-types");
const employment_dto_1 = require("./employment.dto");
const user_input_dto_1 = require("./user-input-dto");
const dto_1 = require("./../../tags/dto");
/**
 * Employee Create DTO
 *
 */
class CreateEmployeeDTO extends (0, mapped_types_1.IntersectionType)(employment_dto_1.EmploymentDTO, dto_1.RelationalTagDTO) {
    /**
     * Create user to the employee
     */
    user;
    /**
     * Sync user to the employee
     */
    userId;
    password;
    members;
    originalUrl;
}
exports.CreateEmployeeDTO = CreateEmployeeDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => user_input_dto_1.UserInputDTO }),
    (0, class_validator_1.ValidateIf)((it) => !it.userId),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => user_input_dto_1.UserInputDTO),
    __metadata("design:type", user_input_dto_1.UserInputDTO)
], CreateEmployeeDTO.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.ValidateIf)((it) => !it.user),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateEmployeeDTO.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, required: true }),
    (0, class_validator_1.ValidateIf)((it) => !it.userId),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEmployeeDTO.prototype, "password", void 0);
//# sourceMappingURL=create-employee.dto.js.map