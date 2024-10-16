"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicInvoiceModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const handlers_1 = require("./queries/handlers");
const handlers_2 = require("./commands/handlers");
const internal_1 = require("./../../core/entities/internal");
const public_invoice_controller_1 = require("./public-invoice.controller");
const public_invoice_service_1 = require("./public-invoice.service");
const nestjs_1 = require("@mikro-orm/nestjs");
let PublicInvoiceModule = exports.PublicInvoiceModule = class PublicInvoiceModule {
};
exports.PublicInvoiceModule = PublicInvoiceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cqrs_1.CqrsModule,
            typeorm_1.TypeOrmModule.forFeature([internal_1.Invoice]),
            nestjs_1.MikroOrmModule.forFeature([internal_1.Invoice]),
        ],
        controllers: [
            public_invoice_controller_1.PublicInvoiceController
        ],
        providers: [
            public_invoice_service_1.PublicInvoiceService,
            ...handlers_1.QueryHandlers,
            ...handlers_2.CommandHandlers
        ],
        exports: []
    })
], PublicInvoiceModule);
//# sourceMappingURL=public-invoice.module.js.map