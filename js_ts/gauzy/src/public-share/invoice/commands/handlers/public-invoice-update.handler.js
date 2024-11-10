"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicInvoiceUpdateHandler = void 0;
;
const cqrs_1 = require("@nestjs/cqrs");
const public_invoice_update_command_1 = require("../public-invoice-update.command");
const public_invoice_service_1 = require("./../../public-invoice.service");
let PublicInvoiceUpdateHandler = exports.PublicInvoiceUpdateHandler = class PublicInvoiceUpdateHandler {
    publicInvoiceService;
    constructor(publicInvoiceService) {
        this.publicInvoiceService = publicInvoiceService;
    }
    async execute(command) {
        const { params, entity } = command;
        return await this.publicInvoiceService.updateInvoice(params, entity);
    }
};
exports.PublicInvoiceUpdateHandler = PublicInvoiceUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(public_invoice_update_command_1.PublicInvoiceUpdateCommand),
    __metadata("design:paramtypes", [public_invoice_service_1.PublicInvoiceService])
], PublicInvoiceUpdateHandler);
//# sourceMappingURL=public-invoice-update.handler.js.map