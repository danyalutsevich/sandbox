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
exports.InvoiceItemBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const invoice_item_bulk_create_command_1 = require("../invoice-item.bulk.create.command");
const invoice_item_service_1 = require("../../invoice-item.service");
let InvoiceItemBulkCreateHandler = exports.InvoiceItemBulkCreateHandler = class InvoiceItemBulkCreateHandler {
    invoiceItemService;
    constructor(invoiceItemService) {
        this.invoiceItemService = invoiceItemService;
    }
    async execute(command) {
        const { invoiceId, input } = command;
        return await this.invoiceItemService.createBulk(invoiceId, input);
    }
};
exports.InvoiceItemBulkCreateHandler = InvoiceItemBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(invoice_item_bulk_create_command_1.InvoiceItemBulkCreateCommand),
    __metadata("design:paramtypes", [invoice_item_service_1.InvoiceItemService])
], InvoiceItemBulkCreateHandler);
//# sourceMappingURL=invoice-item.bulk.create.handler.js.map