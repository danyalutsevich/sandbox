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
exports.TenantSetting = void 0;
const swagger_1 = require("@nestjs/swagger");
const internal_1 = require("../../core/entities/internal");
const entity_1 = require("../../core/decorators/entity");
const mikro_orm_tenant_setting_repository_1 = require("./repository/mikro-orm-tenant-setting.repository");
let TenantSetting = exports.TenantSetting = class TenantSetting extends internal_1.TenantBaseEntity {
    name;
    value;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: false }),
    __metadata("design:type", String)
], TenantSetting.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], TenantSetting.prototype, "value", void 0);
exports.TenantSetting = TenantSetting = __decorate([
    (0, entity_1.MultiORMEntity)('tenant_setting', { mikroOrmRepository: () => mikro_orm_tenant_setting_repository_1.MikroOrmTenantSettingRepository })
], TenantSetting);
//# sourceMappingURL=tenant-setting.entity.js.map