"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var InvoiceEstimateHistoryModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceEstimateHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const invoice_estimate_history_controller_1 = require("./invoice-estimate-history.controller");
const invoice_estimate_history_service_1 = require("./invoice-estimate-history.service");
const invoice_estimate_history_entity_1 = require("./invoice-estimate-history.entity");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const task_module_1 = require("../tasks/task.module");
let InvoiceEstimateHistoryModule = exports.InvoiceEstimateHistoryModule = InvoiceEstimateHistoryModule_1 = class InvoiceEstimateHistoryModule {
};
exports.InvoiceEstimateHistoryModule = InvoiceEstimateHistoryModule = InvoiceEstimateHistoryModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/invoice-estimate-history',
                    module: InvoiceEstimateHistoryModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([invoice_estimate_history_entity_1.InvoiceEstimateHistory]),
            nestjs_1.MikroOrmModule.forFeature([invoice_estimate_history_entity_1.InvoiceEstimateHistory]),
            role_permission_module_1.RolePermissionModule,
            task_module_1.TaskModule
        ],
        controllers: [invoice_estimate_history_controller_1.InvoiceEstimateHistoryController],
        providers: [invoice_estimate_history_service_1.InvoiceEstimateHistoryService],
        exports: [invoice_estimate_history_service_1.InvoiceEstimateHistoryService]
    })
], InvoiceEstimateHistoryModule);
//# sourceMappingURL=invoice-estimate-history.module.js.map