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
exports.FindEmailTemplateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("typeorm");
const index_1 = require("../../../../plugins/contracts/dist/index");
const context_1 = require("./../../../core/context");
const email_template_entity_1 = require("./../../email-template.entity");
const email_template_service_1 = require("../../email-template.service");
const email_template_reader_service_1 = require("./../../email-template-reader.service");
const email_template_find_query_1 = require("../email-template.find.query");
let FindEmailTemplateHandler = exports.FindEmailTemplateHandler = class FindEmailTemplateHandler {
    emailTemplateService;
    emailTemplateReaderService;
    constructor(emailTemplateService, emailTemplateReaderService) {
        this.emailTemplateService = emailTemplateService;
        this.emailTemplateReaderService = emailTemplateReaderService;
    }
    async execute(command) {
        const { input, themeLanguage } = command;
        const { name, organizationId, languageCode = themeLanguage } = input;
        const tenantId = context_1.RequestContext.currentTenantId();
        const emailTemplate = {
            subject: '',
            template: ''
        };
        [emailTemplate.subject, emailTemplate.template] = await Promise.all([
            await this._fetchTemplate(languageCode, name, organizationId, tenantId, 'subject'),
            await this._fetchTemplate(languageCode, name, organizationId, tenantId, 'html')
        ]);
        return emailTemplate;
    }
    async _fetchTemplate(languageCode, name, organizationId, tenantId, type) {
        let subject = '';
        let template = '';
        try {
            // Find customized email template for given organization
            const { hbs, mjml } = await this.emailTemplateService.findOneByWhereOptions({
                languageCode,
                name: `${name}/${type}`,
                organizationId,
                tenantId
            });
            subject = hbs;
            template = mjml;
        }
        catch (error) {
            // If no email template present for given organization, use default email template
            const { success, record } = await this.emailTemplateService.findOneOrFailByWhereOptions({
                languageCode,
                name: `${name}/${type}`,
                organizationId: (0, typeorm_1.IsNull)(),
                tenantId: (0, typeorm_1.IsNull)()
            });
            if (success) {
                subject = record.hbs;
                template = record.mjml;
            }
            else {
                try {
                    const { hbs, mjml } = await this.emailTemplateService.findOneByWhereOptions({
                        languageCode: index_1.LanguagesEnum.ENGLISH,
                        name: `${name}/${type}`,
                        organizationId,
                        tenantId
                    });
                    subject = hbs;
                    template = mjml;
                }
                catch (error) {
                    try {
                        const { hbs, mjml } = await this.emailTemplateService.findOneByWhereOptions({
                            languageCode: index_1.LanguagesEnum.ENGLISH,
                            name: `${name}/${type}`,
                            organizationId: (0, typeorm_1.IsNull)(),
                            tenantId: (0, typeorm_1.IsNull)()
                        });
                        subject = hbs;
                        template = mjml;
                    }
                    catch (error) {
                        /**
                         * Fetch missing templates for production environment
                         * Save it to the database for global tenant
                         */
                        const templates = this.emailTemplateReaderService.readEmailTemplate(name);
                        const emailTemplates = templates.filter((template) => template.name === `${name}/${type}`).map((template) => new email_template_entity_1.EmailTemplate({ ...template }));
                        for await (const emailTemplate of emailTemplates) {
                            await this.emailTemplateService.saveTemplate(emailTemplate.languageCode, name, type, null, null, emailTemplate);
                        }
                        const { hbs, mjml } = await this.emailTemplateService.findOneByWhereOptions({
                            languageCode,
                            name: `${name}/${type}`,
                            organizationId: (0, typeorm_1.IsNull)(),
                            tenantId: (0, typeorm_1.IsNull)()
                        });
                        subject = hbs;
                        template = mjml;
                    }
                }
            }
        }
        switch (type) {
            case 'subject':
                return subject;
            case 'html':
                return template;
        }
    }
};
exports.FindEmailTemplateHandler = FindEmailTemplateHandler = __decorate([
    (0, cqrs_1.QueryHandler)(email_template_find_query_1.FindEmailTemplateQuery),
    __metadata("design:paramtypes", [email_template_service_1.EmailTemplateService,
        email_template_reader_service_1.EmailTemplateReaderService])
], FindEmailTemplateHandler);
//# sourceMappingURL=email-template.find.handler.js.map