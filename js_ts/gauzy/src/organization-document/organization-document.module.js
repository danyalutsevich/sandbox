"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OrganizationDocumentModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationDocumentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const organization_document_entity_1 = require("./organization-document.entity");
const organization_document_service_1 = require("./organization-document.service");
const organization_document_controller_1 = require("./organization-document.controller");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let OrganizationDocumentModule = exports.OrganizationDocumentModule = OrganizationDocumentModule_1 = class OrganizationDocumentModule {
};
exports.OrganizationDocumentModule = OrganizationDocumentModule = OrganizationDocumentModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/organization-documents',
                    module: OrganizationDocumentModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([organization_document_entity_1.OrganizationDocument]),
            nestjs_1.MikroOrmModule.forFeature([organization_document_entity_1.OrganizationDocument]),
            role_permission_module_1.RolePermissionModule
        ],
        providers: [organization_document_service_1.OrganizationDocumentService],
        controllers: [organization_document_controller_1.OrganizationDocumentController],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule]
    })
], OrganizationDocumentModule);
//# sourceMappingURL=organization-document.module.js.map