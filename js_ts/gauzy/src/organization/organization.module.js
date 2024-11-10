"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OrganizationModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationModule = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const user_organization_module_1 = require("../user-organization/user-organization.module");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const contact_module_1 = require("../contact/contact.module");
const user_module_1 = require("./../user/user.module");
const handlers_1 = require("./commands/handlers");
const organization_controller_1 = require("./organization.controller");
const organization_entity_1 = require("./organization.entity");
const organization_service_1 = require("./organization.service");
const repository_1 = require("./repository");
let OrganizationModule = exports.OrganizationModule = OrganizationModule_1 = class OrganizationModule {
};
exports.OrganizationModule = OrganizationModule = OrganizationModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                { path: '/organization', module: OrganizationModule_1 }
            ]),
            typeorm_1.TypeOrmModule.forFeature([organization_entity_1.Organization]),
            nestjs_1.MikroOrmModule.forFeature([organization_entity_1.Organization]),
            (0, common_1.forwardRef)(() => role_permission_module_1.RolePermissionModule),
            (0, common_1.forwardRef)(() => user_organization_module_1.UserOrganizationModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            contact_module_1.ContactModule,
            cqrs_1.CqrsModule
        ],
        controllers: [organization_controller_1.OrganizationController],
        providers: [organization_service_1.OrganizationService, repository_1.TypeOrmOrganizationRepository, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, organization_service_1.OrganizationService, repository_1.TypeOrmOrganizationRepository]
    })
], OrganizationModule);
//# sourceMappingURL=organization.module.js.map