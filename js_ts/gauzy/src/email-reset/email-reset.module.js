"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailResetModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const handlers_1 = require("./commands/handlers");
const handlers_2 = require("./queries/handlers");
const email_reset_entity_1 = require("./email-reset.entity");
const email_reset_service_1 = require("./email-reset.service");
const email_reset_controller_1 = require("./email-reset.controller");
const user_module_1 = require("../user/user.module");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const email_send_module_1 = require("./../email-send/email-send.module");
const employee_module_1 = require("./../employee/employee.module");
const auth_module_1 = require("./../auth/auth.module");
let EmailResetModule = exports.EmailResetModule = class EmailResetModule {
};
exports.EmailResetModule = EmailResetModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([email_reset_entity_1.EmailReset]),
            nestjs_1.MikroOrmModule.forFeature([email_reset_entity_1.EmailReset]),
            (0, common_1.forwardRef)(() => role_permission_module_1.RolePermissionModule),
            cqrs_1.CqrsModule,
            user_module_1.UserModule,
            email_send_module_1.EmailSendModule,
            employee_module_1.EmployeeModule,
            auth_module_1.AuthModule
        ],
        controllers: [email_reset_controller_1.EmailResetController],
        providers: [email_reset_service_1.EmailResetService, ...handlers_1.CommandHandlers, ...handlers_2.QueryHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, email_reset_service_1.EmailResetService],
    })
], EmailResetModule);
//# sourceMappingURL=email-reset.module.js.map