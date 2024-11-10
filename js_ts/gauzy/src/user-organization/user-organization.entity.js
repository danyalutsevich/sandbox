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
exports.UserOrganization = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_user_organization_repository_1 = require("./repository/mikro-orm-user-organization.repository");
let UserOrganization = exports.UserOrganization = class UserOrganization extends internal_1.TenantOrganizationBaseEntity {
    isDefault;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * User
     */
    user;
    userId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean, default: true }),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], UserOrganization.prototype, "isDefault", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.User, (it) => it.organizations, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], UserOrganization.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.user),
    (0, class_validator_1.IsUUID)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", Object)
], UserOrganization.prototype, "userId", void 0);
exports.UserOrganization = UserOrganization = __decorate([
    (0, entity_1.MultiORMEntity)('user_organization', { mikroOrmRepository: () => mikro_orm_user_organization_repository_1.MikroOrmUserOrganizationRepository })
], UserOrganization);
//# sourceMappingURL=user-organization.entity.js.map