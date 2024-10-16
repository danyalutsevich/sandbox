"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var InvoiceModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const moment_1 = __importDefault(require("moment"));
const invoice_controller_1 = require("./invoice.controller");
const invoice_service_1 = require("./invoice.service");
const invoice_entity_1 = require("./invoice.entity");
const commands_1 = require("./commands");
const email_send_module_1 = require("../email-send/email-send.module");
const estimate_email_module_1 = require("../estimate-email/estimate-email.module");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const organization_module_1 = require("./../organization/organization.module");
const pdfmaker_service_1 = require("./pdfmaker.service");
let InvoiceModule = exports.InvoiceModule = InvoiceModule_1 = class InvoiceModule {
};
exports.InvoiceModule = InvoiceModule = InvoiceModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/invoices', module: InvoiceModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([invoice_entity_1.Invoice]),
            nestjs_1.MikroOrmModule.forFeature([invoice_entity_1.Invoice]),
            email_send_module_1.EmailSendModule,
            estimate_email_module_1.EstimateEmailModule,
            role_permission_module_1.RolePermissionModule,
            organization_module_1.OrganizationModule,
            cqrs_1.CqrsModule
        ],
        controllers: [invoice_controller_1.InvoiceController],
        providers: [
            invoice_service_1.InvoiceService,
            pdfmaker_service_1.PdfmakerService,
            ...commands_1.CommandHandlers,
            {
                provide: 'MomentWrapper',
                useValue: moment_1.default
            }
        ],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, invoice_service_1.InvoiceService, pdfmaker_service_1.PdfmakerService]
    })
], InvoiceModule);
//# sourceMappingURL=invoice.module.js.map