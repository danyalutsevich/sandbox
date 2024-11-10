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
exports.CreateCandidateDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const dto_1 = require("./../../tags/dto");
const dto_2 = require("./../../employee/dto");
/**
 * Candidate Create DTO
 *
 */
class CreateCandidateDTO extends (0, swagger_1.IntersectionType)(dto_2.EmploymentDTO, dto_1.RelationalTagDTO) {
    user;
    password;
    documents;
}
exports.CreateCandidateDTO = CreateCandidateDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => dto_2.UserInputDTO, required: true }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => dto_2.UserInputDTO),
    __metadata("design:type", dto_2.UserInputDTO)
], CreateCandidateDTO.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, required: true }),
    (0, class_validator_1.IsNotEmpty)({ message: "Password should not be empty" }),
    (0, class_validator_1.MinLength)(4, {
        message: 'Password should be at least 4 characters long.'
    }),
    __metadata("design:type", String)
], CreateCandidateDTO.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Object }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateCandidateDTO.prototype, "documents", void 0);
//# sourceMappingURL=create-candidate.dto.js.map