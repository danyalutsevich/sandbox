"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EmailHistoryModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const email_history_entity_1 = require("./email-history.entity");
const email_history_controller_1 = require("./email-history.controller");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const email_history_service_1 = require("./email-history.service");
const handler_1 = require("./commands/handler");
const email_send_module_1 = require("./../email-send/email-send.module");
const type_orm_email_history_repository_1 = require("./repository/type-orm-email-history.repository");
let EmailHistoryModule = exports.EmailHistoryModule = EmailHistoryModule_1 = class EmailHistoryModule {
};
exports.EmailHistoryModule = EmailHistoryModule = EmailHistoryModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/email', module: EmailHistoryModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([email_history_entity_1.EmailHistory]),
            nestjs_1.MikroOrmModule.forFeature([email_history_entity_1.EmailHistory]),
            (0, common_1.forwardRef)(() => role_permission_module_1.RolePermissionModule),
            (0, common_1.forwardRef)(() => email_send_module_1.EmailSendModule),
            cqrs_1.CqrsModule
        ],
        controllers: [email_history_controller_1.EmailHistoryController],
        providers: [email_history_service_1.EmailHistoryService, type_orm_email_history_repository_1.TypeOrmEmailHistoryRepository, ...handler_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, email_history_service_1.EmailHistoryService, type_orm_email_history_repository_1.TypeOrmEmailHistoryRepository]
    })
], EmailHistoryModule);
//# sourceMappingURL=email-history.module.js.map