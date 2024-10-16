"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EstimateEmailModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstimateEmailModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const estimate_email_controller_1 = require("./estimate-email.controller");
const estimate_email_service_1 = require("./estimate-email.service");
const organization_entity_1 = require("../organization/organization.entity");
const invoice_entity_1 = require("../invoice/invoice.entity");
const estimate_email_entity_1 = require("./estimate-email.entity");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const task_module_1 = require("../tasks/task.module");
const user_module_1 = require("../user/user.module");
let EstimateEmailModule = exports.EstimateEmailModule = EstimateEmailModule_1 = class EstimateEmailModule {
};
exports.EstimateEmailModule = EstimateEmailModule = EstimateEmailModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/estimate-email', module: EstimateEmailModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([estimate_email_entity_1.EstimateEmail, invoice_entity_1.Invoice, organization_entity_1.Organization]),
            nestjs_1.MikroOrmModule.forFeature([estimate_email_entity_1.EstimateEmail, invoice_entity_1.Invoice, organization_entity_1.Organization]),
            role_permission_module_1.RolePermissionModule,
            user_module_1.UserModule,
            task_module_1.TaskModule
        ],
        controllers: [estimate_email_controller_1.EstimateEmailController],
        providers: [estimate_email_service_1.EstimateEmailService],
        exports: [estimate_email_service_1.EstimateEmailService]
    })
], EstimateEmailModule);
//# sourceMappingURL=estimate-email.module.js.map