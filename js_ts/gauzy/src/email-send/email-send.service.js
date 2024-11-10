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
exports.EmailSendService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const email_templates_1 = __importDefault(require("email-templates"));
const index_1 = require("../../plugins/common/dist/index");
const context_1 = require("./../core/context");
const custom_smtp_service_1 = require("./../custom-smtp/custom-smtp.service");
const utils_1 = require("./utils");
const email_template_render_service_1 = require("./email-template-render.service");
let EmailSendService = exports.EmailSendService = class EmailSendService {
    customSmtpService;
    emailTemplateRenderService;
    constructor(customSmtpService, emailTemplateRenderService) {
        this.customSmtpService = customSmtpService;
        this.emailTemplateRenderService = emailTemplateRenderService;
    }
    /**
     *
     * @returns
     */
    async getInstance() {
        try {
            const smtpConfig = utils_1.SMTPUtils.defaultSMTPTransporter();
            const transport = utils_1.SMTPUtils.convertSmtpToTransporter(smtpConfig);
            // console.log('Default SMTP configuration: %s', transport);
            /** Verifies SMTP configuration */
            if (!!await utils_1.SMTPUtils.verifyTransporter(transport)) {
                return this.getEmailConfig(smtpConfig);
            }
        }
        catch (error) {
            console.log('Error while retrieving default global smtp configuration: %s', error?.message);
            throw new common_1.InternalServerErrorException(error);
        }
    }
    /**
     *
     * @param param0
     */
    async getEmailInstance({ organizationId, tenantId = context_1.RequestContext.currentTenantId() }) {
        let smtpTransporter;
        try {
            smtpTransporter = await this.customSmtpService.findOneByOptions({
                where: {
                    organizationId: (0, index_1.isEmpty)(organizationId) ? (0, typeorm_1.IsNull)() : organizationId,
                    tenantId: (0, index_1.isEmpty)(tenantId) ? (0, typeorm_1.IsNull)() : tenantId
                },
                order: {
                    createdAt: 'DESC'
                }
            });
            // console.log('Custom SMTP configuration for organization: %s', smtpTransporter);
            const smtpConfig = smtpTransporter.getSmtpTransporter();
            const transport = utils_1.SMTPUtils.convertSmtpToTransporter(smtpConfig);
            /** Verifies SMTP configuration */
            if (!!await utils_1.SMTPUtils.verifyTransporter(transport)) {
                return this.getEmailConfig(smtpConfig);
            }
            else {
                console.log('SMTP configuration is not set for this tenant / organization: [%s, %s]', organizationId, tenantId);
                throw new common_1.BadRequestException('SMTP configuration is not set for this tenant / organization');
            }
        }
        catch (error) {
            try {
                if (error instanceof common_1.NotFoundException) {
                    smtpTransporter = await this.customSmtpService.findOneByOptions({
                        where: {
                            organizationId: (0, typeorm_1.IsNull)(),
                            tenantId: (0, index_1.isEmpty)(tenantId) ? (0, typeorm_1.IsNull)() : tenantId
                        },
                        order: {
                            createdAt: 'DESC'
                        }
                    });
                    // console.log('Custom SMTP configuration for tenant: %s', smtpTransporter);
                    const smtpConfig = smtpTransporter.getSmtpTransporter();
                    const transport = utils_1.SMTPUtils.convertSmtpToTransporter(smtpConfig);
                    // /** Verifies SMTP configuration */
                    if (!!await utils_1.SMTPUtils.verifyTransporter(transport)) {
                        return this.getEmailConfig(smtpConfig);
                    }
                    else {
                        console.log('SMTP configuration is not set for this tenant: %s', organizationId);
                        throw new common_1.BadRequestException('SMTP configuration is not set for this tenant');
                    }
                }
            }
            catch (error) {
                const smtpConfig = utils_1.SMTPUtils.defaultSMTPTransporter();
                const transport = utils_1.SMTPUtils.convertSmtpToTransporter(smtpConfig);
                // console.log('Default SMTP configuration: %s', transport);
                /** Verifies SMTP configuration */
                if (!!await utils_1.SMTPUtils.verifyTransporter(transport)) {
                    return this.getEmailConfig(smtpConfig);
                }
                else {
                    console.log('Error while retrieving tenant/organization smtp configuration: %s', error?.message);
                    throw new common_1.InternalServerErrorException('Error while retrieving tenant/organization smtp configuration');
                }
            }
        }
    }
    /**
     *
     * @param smtpConfig
     * @returns
     */
    getEmailConfig(smtpConfig) {
        const config = {
            message: {
                from: smtpConfig.fromAddress || 'noreply@gauzy.co'
            },
            // if you want to send emails in development or test environments, set options.send to true.
            send: true,
            transport: smtpConfig,
            i18n: {},
            views: {
                options: {
                    extension: 'hbs'
                }
            },
            render: this.emailTemplateRenderService.render
        };
        /**
         * TODO: uncomment this after we figure out issues with dev / prod in the environment.*.ts
         */
        // if (!environment.production && !environment.demo) {
        //     config.preview = {
        //         open: {
        //             app: 'firefox',
        //             wait: false
        //         }
        //     };
        // }
        return new email_templates_1.default(config);
    }
};
exports.EmailSendService = EmailSendService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [custom_smtp_service_1.CustomSmtpService,
        email_template_render_service_1.EmailTemplateRenderService])
], EmailSendService);
//# sourceMappingURL=email-send.service.js.map