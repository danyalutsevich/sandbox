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
exports.Role = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const index_1 = require("../../plugins/contracts/dist/index");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_role_repository_1 = require("./repository/mikro-orm-role.repository");
let Role = exports.Role = class Role extends internal_1.TenantBaseEntity {
    name;
    isSystem;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    /**
     * Role Permissions
     */
    rolePermissions;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.RolesEnum }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], Role.prototype, "isSystem", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.RolePermission, (it) => it.role, {
        cascade: true
    }),
    __metadata("design:type", Array)
], Role.prototype, "rolePermissions", void 0);
exports.Role = Role = __decorate([
    (0, entity_1.MultiORMEntity)('role', { mikroOrmRepository: () => mikro_orm_role_repository_1.MikroOrmRoleRepository })
], Role);
//# sourceMappingURL=role.entity.js.map