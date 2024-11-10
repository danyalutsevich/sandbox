"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateRenderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Handlebars = __importStar(require("handlebars"));
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/common/dist/index");
const internal_1 = require("../core/entities/internal");
const utils_1 = require("./utils");
const type_orm_email_template_repository_1 = require("./../email-template/repository/type-orm-email-template.repository");
const mikro_orm_email_template_repository_1 = require("./../email-template/repository/mikro-orm-email-template.repository");
const type_orm_custom_smtp_repository_1 = require("./../custom-smtp/repository/type-orm-custom-smtp.repository");
const mikro_orm_custom_smtp_repository_1 = require("./../custom-smtp/repository/mikro-orm-custom-smtp.repository");
let EmailTemplateRenderService = exports.EmailTemplateRenderService = class EmailTemplateRenderService {
    typeOrmEmailTemplateRepository;
    typeOrmCustomSmtpRepository;
    constructor(typeOrmEmailTemplateRepository, mikroOrmEmailTemplateRepository, typeOrmCustomSmtpRepository, mikroOrmCustomSmtpRepository) {
        this.typeOrmEmailTemplateRepository = typeOrmEmailTemplateRepository;
        this.typeOrmCustomSmtpRepository = typeOrmCustomSmtpRepository;
    }
    /**
     * Renders an email template based on the provided view and locals.
     * @param view The name of the email template to render.
     * @param locals Local variables to be used in the template rendering.
     * @returns The rendered HTML content of the email template.
     */
    render = async (view, locals) => {
        let smtpTransporter;
        let isValidSmtp = false;
        try {
            smtpTransporter = await this.typeOrmCustomSmtpRepository.findOneOrFail({
                where: {
                    organizationId: (0, index_2.isEmpty)(locals.organizationId) ? (0, typeorm_2.IsNull)() : locals.organizationId,
                    tenantId: (0, index_2.isEmpty)(locals.tenantId) ? (0, typeorm_2.IsNull)() : locals.tenantId
                },
                order: {
                    createdAt: 'DESC'
                }
            });
        }
        catch (error) {
            smtpTransporter = await this.typeOrmCustomSmtpRepository.findOne({
                where: {
                    organizationId: (0, typeorm_2.IsNull)(),
                    tenantId: (0, index_2.isEmpty)(locals.tenantId) ? (0, typeorm_2.IsNull)() : locals.tenantId
                },
                order: {
                    createdAt: 'DESC'
                }
            });
        }
        if (smtpTransporter) {
            /** */
            try {
                const smtpConfig = smtpTransporter.getSmtpTransporter();
                const transport = utils_1.SMTPUtils.convertSmtpToTransporter(smtpConfig);
                isValidSmtp = !!await utils_1.SMTPUtils.verifyTransporter(transport);
            }
            catch (error) {
                isValidSmtp = false;
            }
        }
        try {
            view = view.replace('\\', '/');
            let emailTemplate;
            // Find email template customized for the given organization
            const query = new Object({
                name: view,
                languageCode: locals.locale || index_1.LanguagesEnum.ENGLISH
            });
            if (!!isValidSmtp) {
                query['organizationId'] = locals.organizationId;
                query['tenantId'] = locals.tenantId;
                emailTemplate = await this.typeOrmEmailTemplateRepository.findOneBy(query);
            }
            // If no email template found for the organization, use the default template
            if (!emailTemplate) {
                query['organizationId'] = (0, typeorm_2.IsNull)();
                query['tenantId'] = (0, typeorm_2.IsNull)();
                emailTemplate = await this.typeOrmEmailTemplateRepository.findOneBy(query);
            }
            if (!emailTemplate) {
                return '';
            }
            const template = Handlebars.compile(emailTemplate.hbs);
            const html = template(locals);
            return html;
        }
        catch (error) {
            console.log('Error while rendering email template: %s', error);
            throw new common_1.InternalServerErrorException(error);
        }
    };
};
exports.EmailTemplateRenderService = EmailTemplateRenderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(internal_1.EmailTemplate)),
    __param(2, (0, typeorm_1.InjectRepository)(internal_1.CustomSmtp)),
    __metadata("design:paramtypes", [type_orm_email_template_repository_1.TypeOrmEmailTemplateRepository,
        mikro_orm_email_template_repository_1.MikroOrmEmailTemplateRepository,
        type_orm_custom_smtp_repository_1.TypeOrmCustomSmtpRepository,
        mikro_orm_custom_smtp_repository_1.MikroOrmCustomSmtpRepository])
], EmailTemplateRenderService);
//# sourceMappingURL=email-template-render.service.js.map