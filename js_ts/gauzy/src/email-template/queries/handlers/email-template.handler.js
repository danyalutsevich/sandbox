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
exports.EmailTemplateQueryHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const email_template_service_1 = require("./../../email-template.service");
const email_template_query_1 = require("../email-template.query");
let EmailTemplateQueryHandler = exports.EmailTemplateQueryHandler = class EmailTemplateQueryHandler {
    emailTemplateService;
    constructor(emailTemplateService) {
        this.emailTemplateService = emailTemplateService;
    }
    async execute(query) {
        const { options } = query;
        return await this.emailTemplateService.findAll(options);
    }
};
exports.EmailTemplateQueryHandler = EmailTemplateQueryHandler = __decorate([
    (0, cqrs_1.QueryHandler)(email_template_query_1.EmailTemplateQuery),
    __metadata("design:paramtypes", [email_template_service_1.EmailTemplateService])
], EmailTemplateQueryHandler);
//# sourceMappingURL=email-template.handler.js.map