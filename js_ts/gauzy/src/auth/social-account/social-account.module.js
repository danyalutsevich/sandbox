"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SocialAccountModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialAccountModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const typeorm_1 = require("@nestjs/typeorm");
const social_account_service_1 = require("./social-account.service");
const role_permission_1 = require("../../role-permission");
const social_account_entity_1 = require("./social-account.entity");
const user_1 = require("../../user");
let SocialAccountModule = exports.SocialAccountModule = SocialAccountModule_1 = class SocialAccountModule {
};
exports.SocialAccountModule = SocialAccountModule = SocialAccountModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/social-account', module: SocialAccountModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([social_account_entity_1.SocialAccount]),
            nestjs_1.MikroOrmModule.forFeature([social_account_entity_1.SocialAccount]),
            user_1.UserModule,
            role_permission_1.RolePermissionModule
        ],
        providers: [social_account_service_1.SocialAccountService],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, social_account_service_1.SocialAccountService]
    })
], SocialAccountModule);
//# sourceMappingURL=social-account.module.js.map