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
exports.RoleFeatureDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const validators_1 = require("./../../shared/validators");
class RoleFeatureDTO {
    roleId;
    role;
}
exports.RoleFeatureDTO = RoleFeatureDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.ValidateIf)((it) => !it.role),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.IsRoleShouldExist)({
        message: 'RoleId {$value} should be exist for this tenant.'
    }),
    __metadata("design:type", String)
], RoleFeatureDTO.prototype, "roleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.ValidateIf)((it) => !it.roleId),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.IsRoleShouldExist)({
        message: 'Role should be exist for this tenant.'
    }),
    __metadata("design:type", Object)
], RoleFeatureDTO.prototype, "role", void 0);
//# sourceMappingURL=role-feature.dto.js.map