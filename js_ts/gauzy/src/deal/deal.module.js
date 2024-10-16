"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DealModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const deal_entity_1 = require("./deal.entity");
const deal_controller_1 = require("./deal.controller");
const deal_service_1 = require("./deal.service");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const type_orm_deal_repository_1 = require("./repository/type-orm-deal.repository");
let DealModule = exports.DealModule = DealModule_1 = class DealModule {
};
exports.DealModule = DealModule = DealModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                { path: '/deals', module: DealModule_1 }
            ]),
            typeorm_1.TypeOrmModule.forFeature([deal_entity_1.Deal]),
            nestjs_1.MikroOrmModule.forFeature([deal_entity_1.Deal]),
            role_permission_module_1.RolePermissionModule
        ],
        controllers: [deal_controller_1.DealController],
        providers: [deal_service_1.DealService, type_orm_deal_repository_1.TypeOrmDealRepository],
        exports: [deal_service_1.DealService, type_orm_deal_repository_1.TypeOrmDealRepository]
    })
], DealModule);
//# sourceMappingURL=deal.module.js.map