"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ContactModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const contact_entity_1 = require("./contact.entity");
const contact_controller_1 = require("./contact.controller");
const contact_service_1 = require("./contact.service");
const handlers_1 = require("./commands/handlers");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const repository_1 = require("./repository");
let ContactModule = exports.ContactModule = ContactModule_1 = class ContactModule {
};
exports.ContactModule = ContactModule = ContactModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/contact', module: ContactModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([contact_entity_1.Contact]),
            nestjs_1.MikroOrmModule.forFeature([contact_entity_1.Contact]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [contact_controller_1.ContactController],
        providers: [contact_service_1.ContactService, repository_1.TypeOrmContactRepository, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, contact_service_1.ContactService, repository_1.TypeOrmContactRepository]
    })
], ContactModule);
//# sourceMappingURL=contact.module.js.map