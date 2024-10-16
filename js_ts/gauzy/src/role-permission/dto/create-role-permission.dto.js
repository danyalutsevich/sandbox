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
exports.CreateRolePermissionDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const contracts_1 = require("../../../plugins/contracts");
const validators_1 = require("./../../shared/validators");
const dto_1 = require("./../../core/dto");
/**
 * Create Role Permission DTO validation
 */
class CreateRolePermissionDTO extends dto_1.TenantBaseDTO {
    permission;
    enabled;
    roleId;
    role;
}
exports.CreateRolePermissionDTO = CreateRolePermissionDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: contracts_1.PermissionsEnum }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(contracts_1.PermissionsEnum, {
        message: 'permission `$value` must be a valid enum value'
    }),
    __metadata("design:type", String)
], CreateRolePermissionDTO.prototype, "permission", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRolePermissionDTO.prototype, "enabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.ValidateIf)((it) => !it.role),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.IsRoleShouldExist)({
        message: 'RoleId {$value} should be exist for this tenant.'
    }),
    __metadata("design:type", String)
], CreateRolePermissionDTO.prototype, "roleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.ValidateIf)((it) => !it.roleId),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.IsRoleShouldExist)({
        message: 'Role should be exist for this tenant.'
    }),
    __metadata("design:type", Object)
], CreateRolePermissionDTO.prototype, "role", void 0);
//# sourceMappingURL=create-role-permission.dto.js.map