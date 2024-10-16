"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MerchantModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const merchant_entity_1 = require("./merchant.entity");
const merchant_controller_1 = require("./merchant.controller");
const merchant_service_1 = require("./merchant.service");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let MerchantModule = exports.MerchantModule = MerchantModule_1 = class MerchantModule {
};
exports.MerchantModule = MerchantModule = MerchantModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/merchants', module: MerchantModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([merchant_entity_1.Merchant]),
            nestjs_1.MikroOrmModule.forFeature([merchant_entity_1.Merchant]),
            role_permission_module_1.RolePermissionModule
        ],
        controllers: [merchant_controller_1.MerchantController],
        providers: [merchant_service_1.MerchantService],
        exports: [merchant_service_1.MerchantService]
    })
], MerchantModule);
//# sourceMappingURL=merchant.module.js.map