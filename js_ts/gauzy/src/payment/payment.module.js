"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PaymentModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const payment_entity_1 = require("./payment.entity");
const payment_controller_1 = require("./payment.controller");
const payment_service_1 = require("./payment.service");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const payment_map_service_1 = require("./payment.map.service");
const email_send_module_1 = require("./../email-send/email-send.module");
const type_orm_payment_repository_1 = require("./repository/type-orm-payment.repository");
let PaymentModule = exports.PaymentModule = PaymentModule_1 = class PaymentModule {
};
exports.PaymentModule = PaymentModule = PaymentModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/payments', module: PaymentModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([payment_entity_1.Payment]),
            nestjs_1.MikroOrmModule.forFeature([payment_entity_1.Payment]),
            role_permission_module_1.RolePermissionModule,
            email_send_module_1.EmailSendModule
        ],
        controllers: [payment_controller_1.PaymentController],
        providers: [payment_service_1.PaymentService, payment_map_service_1.PaymentMapService, type_orm_payment_repository_1.TypeOrmPaymentRepository],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, payment_service_1.PaymentService, payment_map_service_1.PaymentMapService, type_orm_payment_repository_1.TypeOrmPaymentRepository]
    })
], PaymentModule);
//# sourceMappingURL=payment.module.js.map