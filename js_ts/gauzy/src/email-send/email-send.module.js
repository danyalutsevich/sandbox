"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailSendModule = void 0;
const common_1 = require("@nestjs/common");
const email_send_service_1 = require("./email-send.service");
const custom_smtp_module_1 = require("./../custom-smtp/custom-smtp.module");
const email_template_module_1 = require("./../email-template/email-template.module");
const email_template_render_service_1 = require("./email-template-render.service");
const email_service_1 = require("./email.service");
const email_history_module_1 = require("./../email-history/email-history.module");
const organization_module_1 = require("./../organization/organization.module");
let EmailSendModule = exports.EmailSendModule = class EmailSendModule {
};
exports.EmailSendModule = EmailSendModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => custom_smtp_module_1.CustomSmtpModule),
            (0, common_1.forwardRef)(() => email_template_module_1.EmailTemplateModule),
            (0, common_1.forwardRef)(() => organization_module_1.OrganizationModule),
            (0, common_1.forwardRef)(() => email_history_module_1.EmailHistoryModule),
        ],
        providers: [email_service_1.EmailService, email_send_service_1.EmailSendService, email_template_render_service_1.EmailTemplateRenderService],
        exports: [email_service_1.EmailService], // Export the service to be accessible by other modules
    })
], EmailSendModule);
//# sourceMappingURL=email-send.module.js.map