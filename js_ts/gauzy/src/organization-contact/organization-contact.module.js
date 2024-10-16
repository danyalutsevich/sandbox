"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OrganizationContactModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationContactModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const organization_contact_entity_1 = require("./organization-contact.entity");
const organization_contact_controller_1 = require("./organization-contact.controller");
const organization_contact_service_1 = require("./organization-contact.service");
const handlers_1 = require("./commands/handlers");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const organization_module_1 = require("./../organization/organization.module");
const organization_project_module_1 = require("./../organization-project/organization-project.module");
const contact_module_1 = require("../contact/contact.module");
const repository_1 = require("./repository");
let OrganizationContactModule = exports.OrganizationContactModule = OrganizationContactModule_1 = class OrganizationContactModule {
};
exports.OrganizationContactModule = OrganizationContactModule = OrganizationContactModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/organization-contact',
                    module: OrganizationContactModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([organization_contact_entity_1.OrganizationContact]),
            nestjs_1.MikroOrmModule.forFeature([organization_contact_entity_1.OrganizationContact]),
            role_permission_module_1.RolePermissionModule,
            organization_module_1.OrganizationModule,
            organization_project_module_1.OrganizationProjectModule,
            contact_module_1.ContactModule,
            cqrs_1.CqrsModule
        ],
        controllers: [organization_contact_controller_1.OrganizationContactController],
        providers: [organization_contact_service_1.OrganizationContactService, repository_1.TypeOrmOrganizationContactRepository, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, organization_contact_service_1.OrganizationContactService, repository_1.TypeOrmOrganizationContactRepository]
    })
], OrganizationContactModule);
//# sourceMappingURL=organization-contact.module.js.map