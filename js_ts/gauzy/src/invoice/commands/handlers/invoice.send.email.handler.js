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
exports.InvoiceSendEmailHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const invoice_service_1 = require("../../invoice.service");
const invoice_send_email_command_1 = require("../invoice.send.email.command");
let InvoiceSendEmailHandler = exports.InvoiceSendEmailHandler = class InvoiceSendEmailHandler {
    invoiceService;
    constructor(invoiceService) {
        this.invoiceService = invoiceService;
    }
    async execute(command) {
        const { languageCode, email, params, origin } = command;
        const { invoiceNumber, invoiceId, isEstimate, organizationId } = params;
        return await this.invoiceService.sendEmail(languageCode, email, invoiceNumber, invoiceId, isEstimate, origin, organizationId);
    }
};
exports.InvoiceSendEmailHandler = InvoiceSendEmailHandler = __decorate([
    (0, cqrs_1.CommandHandler)(invoice_send_email_command_1.InvoiceSendEmailCommand),
    __metadata("design:paramtypes", [invoice_service_1.InvoiceService])
], InvoiceSendEmailHandler);
//# sourceMappingURL=invoice.send.email.handler.js.map