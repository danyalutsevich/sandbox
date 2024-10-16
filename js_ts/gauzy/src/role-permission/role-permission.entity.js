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
exports.RolePermission = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/contracts/dist/index");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_role_permission_repository_1 = require("./repository/mikro-orm-role-permission.repository");
let RolePermission = exports.RolePermission = class RolePermission extends internal_1.TenantBaseEntity {
    permission;
    enabled;
    description;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    role;
    roleId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.PermissionsEnum }),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], RolePermission.prototype, "permission", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, default: false }),
    (0, entity_1.MultiORMColumn)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], RolePermission.prototype, "enabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], RolePermission.prototype, "description", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Role, (it) => it.rolePermissions, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", internal_1.Role)
], RolePermission.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.role),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], RolePermission.prototype, "roleId", void 0);
exports.RolePermission = RolePermission = __decorate([
    (0, entity_1.MultiORMEntity)('role_permission', { mikroOrmRepository: () => mikro_orm_role_permission_repository_1.MikroOrmRolePermissionRepository })
], RolePermission);
//# sourceMappingURL=role-permission.entity.js.map