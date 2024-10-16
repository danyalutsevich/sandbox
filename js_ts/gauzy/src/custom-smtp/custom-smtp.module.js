"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CustomSmtpModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSmtpModule = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const custom_smtp_entity_1 = require("./custom-smtp.entity");
const custom_smtp_controller_1 = require("./custom-smtp.controller");
const custom_smtp_service_1 = require("./custom-smtp.service");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const commands_1 = require("./commands");
let CustomSmtpModule = exports.CustomSmtpModule = CustomSmtpModule_1 = class CustomSmtpModule {
};
exports.CustomSmtpModule = CustomSmtpModule = CustomSmtpModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                { path: '/smtp', module: CustomSmtpModule_1 }
            ]),
            typeorm_1.TypeOrmModule.forFeature([custom_smtp_entity_1.CustomSmtp]),
            nestjs_1.MikroOrmModule.forFeature([custom_smtp_entity_1.CustomSmtp]),
            (0, common_1.forwardRef)(() => role_permission_module_1.RolePermissionModule),
            cqrs_1.CqrsModule
        ],
        controllers: [custom_smtp_controller_1.CustomSmtpController],
        providers: [custom_smtp_service_1.CustomSmtpService, ...commands_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, custom_smtp_service_1.CustomSmtpService]
    })
], CustomSmtpModule);
//# sourceMappingURL=custom-smtp.module.js.map