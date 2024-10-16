"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AccountingTemplateModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingTemplateModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const accounting_template_entity_1 = require("./accounting-template.entity");
const accounting_template_controller_1 = require("./accounting-template.controller");
const accounting_template_service_1 = require("./accounting-template.service");
const handlers_1 = require("./queries/handlers");
let AccountingTemplateModule = exports.AccountingTemplateModule = AccountingTemplateModule_1 = class AccountingTemplateModule {
};
exports.AccountingTemplateModule = AccountingTemplateModule = AccountingTemplateModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/accounting-template', module: AccountingTemplateModule_1 }]),
            (0, common_1.forwardRef)(() => typeorm_1.TypeOrmModule.forFeature([accounting_template_entity_1.AccountingTemplate])),
            (0, common_1.forwardRef)(() => nestjs_1.MikroOrmModule.forFeature([accounting_template_entity_1.AccountingTemplate])),
            (0, common_1.forwardRef)(() => role_permission_module_1.RolePermissionModule),
            cqrs_1.CqrsModule
        ],
        controllers: [accounting_template_controller_1.AccountingTemplateController],
        providers: [accounting_template_service_1.AccountingTemplateService, ...handlers_1.QueryHandlers],
        exports: [accounting_template_service_1.AccountingTemplateService]
    })
], AccountingTemplateModule);
//# sourceMappingURL=accounting-template.module.js.map