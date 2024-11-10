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
exports.AccountingTemplateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const accounting_template_service_1 = require("../../accounting-template.service");
const accounting_template_query_1 = require("../accounting-template.query");
let AccountingTemplateHandler = exports.AccountingTemplateHandler = class AccountingTemplateHandler {
    accountingTemplateService;
    constructor(accountingTemplateService) {
        this.accountingTemplateService = accountingTemplateService;
    }
    async execute(query) {
        const { options } = query;
        return await this.accountingTemplateService.findAll(options);
    }
};
exports.AccountingTemplateHandler = AccountingTemplateHandler = __decorate([
    (0, cqrs_1.QueryHandler)(accounting_template_query_1.AccountingTemplateQuery),
    __metadata("design:paramtypes", [accounting_template_service_1.AccountingTemplateService])
], AccountingTemplateHandler);
//# sourceMappingURL=accounting-template.handler.js.map