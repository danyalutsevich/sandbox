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
exports.InvoiceUpdateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const invoice_service_1 = require("../../invoice.service");
const invoice_update_command_1 = require("../invoice.update.command");
let InvoiceUpdateHandler = exports.InvoiceUpdateHandler = class InvoiceUpdateHandler {
    invoiceService;
    constructor(invoiceService) {
        this.invoiceService = invoiceService;
    }
    async execute(command) {
        const { input } = command;
        const { id } = input;
        return await this.invoiceService.create({
            ...input,
            id
        });
    }
};
exports.InvoiceUpdateHandler = InvoiceUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(invoice_update_command_1.InvoiceUpdateCommand),
    __metadata("design:paramtypes", [invoice_service_1.InvoiceService])
], InvoiceUpdateHandler);
//# sourceMappingURL=invoice.update.handler.js.map