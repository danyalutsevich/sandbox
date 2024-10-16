"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OrganizationAwardModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationAwardModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const organization_award_entity_1 = require("./organization-award.entity");
const organization_award_controller_1 = require("./organization-award.controller");
const organization_award_service_1 = require("./organization-award.service");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let OrganizationAwardModule = exports.OrganizationAwardModule = OrganizationAwardModule_1 = class OrganizationAwardModule {
};
exports.OrganizationAwardModule = OrganizationAwardModule = OrganizationAwardModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/organization-awards', module: OrganizationAwardModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([organization_award_entity_1.OrganizationAward]),
            nestjs_1.MikroOrmModule.forFeature([organization_award_entity_1.OrganizationAward]),
            role_permission_module_1.RolePermissionModule
        ],
        controllers: [organization_award_controller_1.OrganizationAwardController],
        providers: [organization_award_service_1.OrganizationAwardService],
        exports: [organization_award_service_1.OrganizationAwardService]
    })
], OrganizationAwardModule);
//# sourceMappingURL=organization-award.module.js.map