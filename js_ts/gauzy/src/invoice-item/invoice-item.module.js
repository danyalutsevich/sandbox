"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var InvoiceItemModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceItemModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const invoice_item_entity_1 = require("./invoice-item.entity");
const invoice_item_controller_1 = require("./invoice-item.controller");
const invoice_item_service_1 = require("./invoice-item.service");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const handlers_1 = require("./commands/handlers");
const task_module_1 = require("../tasks/task.module");
let InvoiceItemModule = exports.InvoiceItemModule = InvoiceItemModule_1 = class InvoiceItemModule {
};
exports.InvoiceItemModule = InvoiceItemModule = InvoiceItemModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/invoice-item', module: InvoiceItemModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([invoice_item_entity_1.InvoiceItem]),
            nestjs_1.MikroOrmModule.forFeature([invoice_item_entity_1.InvoiceItem]),
            role_permission_module_1.RolePermissionModule,
            task_module_1.TaskModule,
            cqrs_1.CqrsModule
        ],
        controllers: [invoice_item_controller_1.InvoiceItemController],
        providers: [invoice_item_service_1.InvoiceItemService, ...handlers_1.CommandHandlers],
        exports: [invoice_item_service_1.InvoiceItemService]
    })
], InvoiceItemModule);
//# sourceMappingURL=invoice-item.module.js.map