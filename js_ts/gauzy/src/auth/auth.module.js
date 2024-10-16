"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const axios_1 = require("@nestjs/axios");
const nestjs_1 = require("@mikro-orm/nestjs");
const index_1 = require("../../plugins/auth/dist/index");
const event_bus_module_1 = require("../event-bus/event-bus.module");
const internal_1 = require("./../core/entities/internal");
const email_send_module_1 = require("./../email-send/email-send.module");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const handlers_1 = require("./commands/handlers");
const strategies_1 = require("./strategies");
const user_organization_services_1 = require("../user-organization/user-organization.services");
const user_module_1 = require("./../user/user.module");
const employee_module_1 = require("./../employee/employee.module");
const role_module_1 = require("./../role/role.module");
const password_reset_module_1 = require("./../password-reset/password-reset.module");
const email_confirmation_service_1 = require("./email-confirmation.service");
const email_verification_controller_1 = require("./email-verification.controller");
const feature_module_1 = require("./../feature/feature.module");
const social_account_service_1 = require("./social-account/social-account.service");
const social_account_module_1 = require("./social-account/social-account.module");
const providers = [auth_service_1.AuthService, email_confirmation_service_1.EmailConfirmationService, social_account_service_1.SocialAccountService, user_organization_services_1.UserOrganizationService];
const strategies = [strategies_1.JwtStrategy, strategies_1.JwtRefreshTokenStrategy];
let AuthModule = exports.AuthModule = AuthModule_1 = class AuthModule {
};
exports.AuthModule = AuthModule = AuthModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/auth',
                    module: AuthModule_1,
                    children: [{ path: '/', module: index_1.SocialAuthModule }]
                }
            ]),
            index_1.SocialAuthModule.registerAsync({
                imports: [
                    typeorm_1.TypeOrmModule.forFeature([internal_1.OrganizationTeam]),
                    nestjs_1.MikroOrmModule.forFeature([internal_1.OrganizationTeam]),
                    axios_1.HttpModule,
                    AuthModule_1,
                    email_send_module_1.EmailSendModule,
                    user_module_1.UserModule,
                    employee_module_1.EmployeeModule,
                    role_module_1.RoleModule,
                    password_reset_module_1.PasswordResetModule,
                    cqrs_1.CqrsModule,
                    social_account_module_1.SocialAccountModule,
                    event_bus_module_1.EventBusModule
                ],
                useClass: auth_service_1.AuthService
            }),
            typeorm_1.TypeOrmModule.forFeature([internal_1.UserOrganization, internal_1.Organization, internal_1.OrganizationTeam]),
            nestjs_1.MikroOrmModule.forFeature([internal_1.UserOrganization, internal_1.Organization, internal_1.OrganizationTeam]),
            email_send_module_1.EmailSendModule,
            user_module_1.UserModule,
            employee_module_1.EmployeeModule,
            role_module_1.RoleModule,
            password_reset_module_1.PasswordResetModule,
            feature_module_1.FeatureModule,
            cqrs_1.CqrsModule,
            event_bus_module_1.EventBusModule
        ],
        controllers: [auth_controller_1.AuthController, email_verification_controller_1.EmailVerificationController],
        providers: [...providers, ...handlers_1.CommandHandlers, ...strategies],
        exports: [...providers]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map