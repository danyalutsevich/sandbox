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
exports.InvoiceGenerateLinkHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const invoice_service_1 = require("../../invoice.service");
const invoice_generate_link_command_1 = require("../invoice.generate.link.command");
let InvoiceGenerateLinkHandler = exports.InvoiceGenerateLinkHandler = class InvoiceGenerateLinkHandler {
    invoiceService;
    constructor(invoiceService) {
        this.invoiceService = invoiceService;
    }
    async execute(command) {
        try {
            const { invoiceId } = command;
            return await this.invoiceService.generateLink(invoiceId);
        }
        catch (error) {
            console.error('Error while genrating public link for invoice/estimate');
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.InvoiceGenerateLinkHandler = InvoiceGenerateLinkHandler = __decorate([
    (0, cqrs_1.CommandHandler)(invoice_generate_link_command_1.InvoiceGenerateLinkCommand),
    __metadata("design:paramtypes", [invoice_service_1.InvoiceService])
], InvoiceGenerateLinkHandler);
//# sourceMappingURL=invoice.generate.link.handler.js.map