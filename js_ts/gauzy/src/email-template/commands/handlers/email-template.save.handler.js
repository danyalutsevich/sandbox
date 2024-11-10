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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateSaveHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const email_template_save_command_1 = require("../email-template.save.command");
const email_template_service_1 = require("../../email-template.service");
const email_template_entity_1 = require("../../email-template.entity");
const mjml_1 = __importDefault(require("mjml"));
const common_1 = require("@nestjs/common");
const context_1 = require("./../../../core/context");
let EmailTemplateSaveHandler = exports.EmailTemplateSaveHandler = class EmailTemplateSaveHandler {
    emailTemplateService;
    constructor(emailTemplateService) {
        this.emailTemplateService = emailTemplateService;
    }
    async execute(command) {
        const tenantId = context_1.RequestContext.currentTenantId();
        const { input: { languageCode, name, organizationId, mjml, subject } } = command;
        try {
            await this._saveTemplate(languageCode, name, organizationId, tenantId, mjml, 'html');
        }
        catch (error) {
            // TODO add translation
            throw new common_1.BadRequestException('Invalid html template');
        }
        return this._saveTemplate(languageCode, name, organizationId, tenantId, subject, 'subject');
    }
    async _saveTemplate(languageCode, name, organizationId, tenantId, content, type) {
        const { success: found, record } = await this.emailTemplateService.findOneOrFailByWhereOptions({
            languageCode,
            name: `${name}/${type}`,
            organizationId,
            tenantId
        });
        let entity;
        if (found) {
            switch (type) {
                case 'subject':
                    entity = {
                        ...record,
                        hbs: content
                    };
                    break;
                case 'html':
                    entity = {
                        ...record,
                        mjml: content,
                        hbs: (0, mjml_1.default)(content).html
                    };
                    break;
            }
            if (`title` in entity) {
                delete entity['title'];
            }
            await this.emailTemplateService.update(record.id, entity);
        }
        else {
            entity = new email_template_entity_1.EmailTemplate();
            entity.organizationId = organizationId;
            entity.tenantId = tenantId;
            entity.languageCode = languageCode;
            entity.name = `${name}/${type}`;
            switch (type) {
                case 'subject':
                    entity.hbs = content;
                    break;
                case 'html':
                    entity.mjml = content;
                    entity.hbs = (0, mjml_1.default)(content).html;
                    break;
            }
            await this.emailTemplateService.create(entity);
        }
        return entity;
    }
};
exports.EmailTemplateSaveHandler = EmailTemplateSaveHandler = __decorate([
    (0, cqrs_1.CommandHandler)(email_template_save_command_1.EmailTemplateSaveCommand),
    __metadata("design:paramtypes", [email_template_service_1.EmailTemplateService])
], EmailTemplateSaveHandler);
//# sourceMappingURL=email-template.save.handler.js.map