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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = __importStar(require("nodemailer"));
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/config/dist/index");
const index_3 = require("../../plugins/common/dist/index");
const context_1 = require("../core/context");
const email_send_service_1 = require("./../email-send/email-send.service");
const internal_1 = require("./../core/entities/internal");
const type_orm_email_history_repository_1 = require("./../email-history/repository/type-orm-email-history.repository");
const mikro_orm_email_history_repository_1 = require("./../email-history/repository/mikro-orm-email-history.repository");
const type_orm_email_template_repository_1 = require("./../email-template/repository/type-orm-email-template.repository");
const mikro_orm_email_template_repository_1 = require("./../email-template/repository/mikro-orm-email-template.repository");
const repository_1 = require("./../organization/repository");
const mikro_orm_organization_repository_1 = require("./../organization/repository/mikro-orm-organization.repository");
const DISALLOW_EMAIL_SERVER_DOMAIN = ['@example.com'];
let EmailService = exports.EmailService = class EmailService {
    typeOrmEmailHistoryRepository;
    mikroOrmEmailHistoryRepository;
    typeOrmEmailTemplateRepository;
    mikroOrmEmailTemplateRepository;
    typeOrmOrganizationRepository;
    mikroOrmOrganizationRepository;
    emailSendService;
    constructor(typeOrmEmailHistoryRepository, mikroOrmEmailHistoryRepository, typeOrmEmailTemplateRepository, mikroOrmEmailTemplateRepository, typeOrmOrganizationRepository, mikroOrmOrganizationRepository, emailSendService) {
        this.typeOrmEmailHistoryRepository = typeOrmEmailHistoryRepository;
        this.mikroOrmEmailHistoryRepository = mikroOrmEmailHistoryRepository;
        this.typeOrmEmailTemplateRepository = typeOrmEmailTemplateRepository;
        this.mikroOrmEmailTemplateRepository = mikroOrmEmailTemplateRepository;
        this.typeOrmOrganizationRepository = typeOrmOrganizationRepository;
        this.mikroOrmOrganizationRepository = mikroOrmOrganizationRepository;
        this.emailSendService = emailSendService;
    }
    /**
     *
     * @param languageCode
     * @param email
     * @param contactName
     * @param invoiceNumber
     * @param amount
     * @param currency
     * @param organization
     * @param originUrl
     */
    async sendPaymentReceipt(languageCode, email, contactName, invoiceNumber, amount, currency, organization, originUrl) {
        const tenantId = context_1.RequestContext.currentTenantId();
        const { id: organizationId, name: organizationName } = organization;
        const clientBaseUrl = originUrl || index_2.environment.clientBaseUrl;
        const sendOptions = {
            template: index_1.EmailTemplateEnum.PAYMENT_RECEIPT,
            message: {
                to: email
            },
            locals: {
                locale: languageCode,
                host: clientBaseUrl,
                contactName,
                invoiceNumber,
                amount,
                currency,
                organizationId,
                tenantId,
                organizationName
            }
        };
        const body = {
            templateName: sendOptions.template,
            email: sendOptions.message.to,
            languageCode,
            organization,
            message: ''
        };
        const isEmailBlocked = !!DISALLOW_EMAIL_SERVER_DOMAIN.find((server) => body.email.includes(server));
        if (!isEmailBlocked) {
            try {
                const instance = await this.emailSendService.getEmailInstance({ organizationId, tenantId });
                const sendResult = await instance.send(sendOptions);
                body.message = sendResult.originalMessage;
            }
            catch (error) {
                console.log(`Error while sending payment receipt ${invoiceNumber}: %s`, error?.message);
                throw new common_1.BadRequestException(`Error while sending payment receipt ${invoiceNumber}: ${error?.message}`);
            }
            finally {
                await this.createEmailRecord(body);
            }
        }
    }
    /**
     *
     * @param languageCode
     * @param email
     * @param base64
     * @param invoiceNumber
     * @param invoiceId
     * @param isEstimate
     * @param token
     * @param originUrl
     * @param organization
     */
    async emailInvoice(languageCode, email, base64, invoiceNumber, invoiceId, isEstimate, token, origin, organization) {
        const tenantId = context_1.RequestContext.currentTenantId();
        const { id: organizationId } = organization;
        const baseUrl = origin || index_2.environment.clientBaseUrl;
        const sendOptions = {
            template: isEstimate ? index_1.EmailTemplateEnum.EMAIL_ESTIMATE : index_1.EmailTemplateEnum.EMAIL_INVOICE,
            message: {
                to: `${email}`,
                attachments: [
                    {
                        filename: `${isEstimate ? 'Estimate' : 'Invoice'}-${invoiceNumber}.pdf`,
                        content: base64,
                        encoding: 'base64'
                    }
                ]
            },
            locals: {
                tenantId,
                organizationId,
                locale: languageCode,
                host: baseUrl,
                acceptUrl: `${baseUrl}#/auth/estimate/?token=${token}&id=${invoiceId}&action=accept&email=${email}`,
                rejectUrl: `${baseUrl}#/auth/estimate/?token=${token}&id=${invoiceId}&action=reject&email=${email}`
            }
        };
        const body = {
            templateName: sendOptions.template,
            email: sendOptions.message.to,
            languageCode,
            organization,
            message: ''
        };
        const isEmailBlocked = !!DISALLOW_EMAIL_SERVER_DOMAIN.find((server) => body.email.includes(server));
        if (!isEmailBlocked) {
            try {
                const instance = await this.emailSendService.getEmailInstance({ organizationId, tenantId });
                const send = await instance.send(sendOptions);
                body['message'] = send.originalMessage;
            }
            catch (error) {
                console.log(`Error while sending email invoice ${invoiceNumber}: %s`, error?.message);
                throw new common_1.BadRequestException(`Error while sending email invoice ${invoiceNumber}: ${error?.message}`);
            }
            finally {
                await this.createEmailRecord(body);
            }
        }
    }
    /**
     *
     * @param organizationContact
     * @param inviterUser
     * @param organization
     * @param invite
     * @param languageCode
     * @param originUrl
     */
    async inviteOrganizationContact(organizationContact, inviterUser, organization, invite, languageCode, originUrl) {
        const tenantId = context_1.RequestContext.currentTenantId();
        const { id: organizationId } = organization;
        const baseUrl = originUrl || index_2.environment.clientBaseUrl;
        const sendOptions = {
            template: index_1.EmailTemplateEnum.INVITE_ORGANIZATION_CLIENT,
            message: {
                to: `${organizationContact.primaryEmail}`
            },
            locals: {
                locale: languageCode,
                name: organizationContact.name,
                host: baseUrl,
                id: organizationContact.id,
                inviterName: inviterUser ? inviterUser.name || '' : '',
                organizationName: organization.name,
                organizationId,
                tenantId,
                generatedUrl: `${baseUrl}#/auth/accept-client-invite?email=${organizationContact.primaryEmail}&token=${invite.token}`
            }
        };
        const body = {
            templateName: sendOptions.template,
            email: sendOptions.message.to,
            languageCode,
            message: '',
            organization
        };
        const isEmailBlocked = !!DISALLOW_EMAIL_SERVER_DOMAIN.find((server) => body.email.includes(server));
        if (!isEmailBlocked) {
            try {
                const instance = await this.emailSendService.getEmailInstance({ organizationId, tenantId });
                const send = await instance.send(sendOptions);
                body['message'] = send.originalMessage;
            }
            catch (error) {
                console.log(`Error while sending invite organization contact: %s`, error?.message);
                throw new common_1.BadRequestException(`Error while sending invite organization contact: ${error?.message}`);
            }
            finally {
                await this.createEmailRecord(body);
            }
        }
    }
    /**
     *
     * @param inviteUserModel
     */
    async inviteUser(inviteUserModel) {
        const { email, role, organization, registerUrl, originUrl, languageCode, invitedBy } = inviteUserModel;
        const tenantId = context_1.RequestContext.currentTenantId();
        const { id: organizationId } = organization;
        const sendOptions = {
            template: index_1.EmailTemplateEnum.INVITE_USER,
            message: {
                to: `${email}`
            },
            locals: {
                locale: languageCode,
                role: role,
                organizationName: organization.name,
                organizationId,
                tenantId,
                generatedUrl: registerUrl,
                host: originUrl || index_2.environment.clientBaseUrl
            }
        };
        const body = {
            templateName: sendOptions.template,
            email: sendOptions.message.to,
            languageCode,
            message: '',
            organization,
            user: invitedBy
        };
        const match = !!DISALLOW_EMAIL_SERVER_DOMAIN.find((server) => body.email.includes(server));
        if (!match) {
            try {
                const instance = await this.emailSendService.getEmailInstance({ organizationId, tenantId });
                const send = await instance.send(sendOptions);
                body['message'] = send.originalMessage;
            }
            catch (error) {
                console.log(`Error while sending invite user: %s`, error);
            }
            finally {
                await this.createEmailRecord(body);
            }
        }
    }
    /**
     * Invite team members
     *
     * @param invite
     */
    async inviteTeamMember(invite) {
        const { email, organization, languageCode, invitedBy, teams, inviteCode, inviteLink, originUrl } = invite;
        const { id: organizationId } = organization;
        const tenantId = context_1.RequestContext.currentTenantId();
        const sendOptions = {
            template: index_1.EmailTemplateEnum.INVITE_GAUZY_TEAMS,
            message: {
                to: `${email}`
            },
            locals: {
                email,
                organizationId,
                tenantId,
                inviteCode,
                teams,
                inviteLink,
                locale: languageCode,
                host: originUrl || index_2.environment.clientBaseUrl
            }
        };
        const body = {
            templateName: sendOptions.template,
            email: sendOptions.message.to,
            languageCode,
            message: '',
            organization,
            user: invitedBy
        };
        const match = !!DISALLOW_EMAIL_SERVER_DOMAIN.find((server) => body.email.includes(server));
        if (!match) {
            try {
                const instance = await this.emailSendService.getEmailInstance({ organizationId, tenantId });
                const send = await instance.send(sendOptions);
                body['message'] = send.originalMessage;
            }
            catch (error) {
                console.log(`Error while invite team: %s`, error);
            }
            finally {
                await this.createEmailRecord(body);
            }
        }
    }
    /**
     *
     * @param inviteEmployeeModel
     */
    async inviteEmployee(inviteEmployeeModel) {
        const { email, registerUrl, organization, originUrl, languageCode, invitedBy } = inviteEmployeeModel;
        const tenantId = context_1.RequestContext.currentTenantId();
        const { id: organizationId } = organization;
        const sendOptions = {
            template: index_1.EmailTemplateEnum.INVITE_EMPLOYEE,
            message: {
                to: `${email}`
            },
            locals: {
                locale: languageCode,
                organizationName: organization.name,
                organizationId,
                tenantId,
                generatedUrl: registerUrl,
                host: originUrl || index_2.environment.clientBaseUrl
            }
        };
        const body = {
            templateName: sendOptions.template,
            email: sendOptions.message.to,
            languageCode,
            message: '',
            organization,
            user: invitedBy
        };
        const match = !!DISALLOW_EMAIL_SERVER_DOMAIN.find((server) => body.email.includes(server));
        if (!match) {
            try {
                const instance = await this.emailSendService.getEmailInstance({ organizationId, tenantId });
                const send = await instance.send(sendOptions);
                body['message'] = send.originalMessage;
            }
            catch (error) {
                console.error(error);
            }
            finally {
                await this.createEmailRecord(body);
            }
        }
    }
    /***
     *
     */
    async sendAcceptInvitationEmail(joinEmployeeModel, originUrl) {
        const { email, employee, organization, languageCode } = joinEmployeeModel;
        const { id: organizationId, tenantId } = organization;
        const sendOptions = {
            template: index_1.EmailTemplateEnum.EMPLOYEE_JOIN,
            message: {
                to: `${email}`
            },
            locals: {
                host: originUrl || index_2.environment.clientBaseUrl,
                locale: languageCode,
                organizationName: organization.name,
                employeeName: employee.user.firstName
            }
        };
        const body = {
            templateName: sendOptions.template,
            email: sendOptions.message.to,
            languageCode,
            message: '',
            organization
        };
        const match = !!DISALLOW_EMAIL_SERVER_DOMAIN.find((server) => body.email.includes(server));
        if (!match) {
            try {
                const instance = await this.emailSendService.getEmailInstance({ organizationId, tenantId });
                const send = await instance.send(sendOptions);
                body['message'] = send.originalMessage;
            }
            catch (error) {
                console.error(error);
            }
            finally {
                await this.createEmailRecord(body);
            }
        }
    }
    /**
     *
     * @param user
     * @param languageCode
     * @param organizationId
     * @param originUrl
     * @param integration
     */
    async welcomeUser(user, languageCode, organizationId, originUrl, integration) {
        let organization;
        if (organizationId) {
            organization = await this.typeOrmOrganizationRepository.findOneBy({
                id: organizationId
            });
        }
        const tenantId = organization ? organization.tenantId : context_1.RequestContext.currentTenantId();
        // Override the default config by merging in the provided values.
        const appIntegration = (0, index_3.deepMerge)(index_2.environment.appIntegrationConfig, integration);
        const sendOptions = {
            template: index_1.EmailTemplateEnum.WELCOME_USER,
            message: {
                to: `${user.email}`
            },
            locals: {
                locale: languageCode,
                email: user.email,
                host: originUrl || index_2.environment.clientBaseUrl,
                organizationId: organizationId || (0, typeorm_1.IsNull)(),
                tenantId,
                ...appIntegration
            }
        };
        try {
            const body = {
                templateName: sendOptions.template,
                email: sendOptions.message.to,
                languageCode,
                organization,
                message: ''
            };
            const match = !!DISALLOW_EMAIL_SERVER_DOMAIN.find((server) => body.email.includes(server));
            if (!match) {
                try {
                    const instance = await this.emailSendService.getEmailInstance({ organizationId, tenantId });
                    const send = await instance.send(sendOptions);
                    body['message'] = send.originalMessage;
                }
                catch (error) {
                    console.log('Error while get email instance during welcome user', error);
                }
                finally {
                    await this.createEmailRecord(body);
                }
            }
        }
        catch (error) {
            console.log('Error while sending welcome user', error);
        }
    }
    /**
     * Send confirmation email link
     *
     * @param user
     * @param verificationLink
     */
    async emailVerification(user, verificationLink, verificationCode, integration) {
        const { email, firstName, lastName, preferredLanguage } = user;
        const name = [firstName, lastName].filter(Boolean).join(' ') || email;
        /**
         * Email template email options
         */
        const sendOptions = {
            template: index_1.EmailTemplateEnum.EMAIL_VERIFICATION,
            message: {
                to: `${email}`
            },
            locals: {
                name,
                email,
                verificationLink,
                verificationCode,
                ...integration,
                locale: preferredLanguage,
                host: index_2.environment.clientBaseUrl
            }
        };
        const body = {
            templateName: sendOptions.template,
            email: sendOptions.message.to,
            languageCode: sendOptions.locals.locale,
            message: ''
        };
        const match = !!DISALLOW_EMAIL_SERVER_DOMAIN.find((server) => body.email.includes(server));
        if (!match) {
            try {
                const instance = await this.emailSendService.getInstance();
                const send = await instance.send(sendOptions);
                body['message'] = send.originalMessage;
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    /**
     *
     * @param user
     * @param url
     * @param languageCode
     * @param organizationId
     * @param originUrl
     */
    async requestPassword(user, resetLink, languageCode, originUrl) {
        const integration = Object.assign({}, index_2.environment.appIntegrationConfig);
        const sendOptions = {
            template: index_1.EmailTemplateEnum.PASSWORD_RESET,
            message: {
                to: `${user.email}`
            },
            locals: {
                ...integration,
                userName: user.name,
                tenantName: user.tenant.name,
                locale: languageCode,
                generatedUrl: resetLink,
                host: originUrl || index_2.environment.clientBaseUrl
            }
        };
        const body = {
            templateName: sendOptions.template,
            email: sendOptions.message.to,
            languageCode,
            message: ''
        };
        const match = !!DISALLOW_EMAIL_SERVER_DOMAIN.find((server) => body.email.includes(server));
        if (!match) {
            try {
                const instance = await this.emailSendService.getInstance();
                const send = await instance.send(sendOptions);
                body['message'] = send.originalMessage;
            }
            catch (error) {
                console.error(error);
            }
            finally {
                await this.createEmailRecord(body);
            }
        }
    }
    /**
     *
     * @param email
     * @param tenantUsersMap
     * @param languageCode
     * @param originUrl
     */
    async multiTenantResetPassword(email, tenants, languageCode, originUrl) {
        const integration = Object.assign({}, index_2.environment.appIntegrationConfig);
        /** */
        const items = [];
        /** */
        for await (const { resetLink, tenant, user } of tenants) {
            /** */
            const tenantId = tenant ? tenant.id : context_1.RequestContext.currentTenantId();
            /** */
            items.push({
                tenantName: tenant ? tenant.name : user.name,
                userName: user.name,
                resetLink,
                tenantId
            });
        }
        const sendOptions = {
            template: index_1.EmailTemplateEnum.MULTI_TENANT_PASSWORD_RESET,
            message: {
                to: `${email}`
            },
            locals: {
                ...integration,
                locale: languageCode,
                host: originUrl || index_2.environment.clientBaseUrl,
                items
            }
        };
        const body = {
            templateName: sendOptions.template,
            email: sendOptions.message.to,
            languageCode,
            message: ''
        };
        const match = !!DISALLOW_EMAIL_SERVER_DOMAIN.find((server) => body.email.includes(server));
        if (!match) {
            try {
                // TODO : Which Organization to prefer while sending email
                const instance = await this.emailSendService.getInstance();
                const send = await instance.send(sendOptions);
                body['message'] = send.originalMessage;
            }
            catch (error) {
                console.error(error);
            }
            finally {
                await this.createEmailRecord(body);
            }
        }
    }
    /**
     *
     * @param email
     * @param languageCode
     * @param organizationId
     * @param originUrl
     */
    async sendAppointmentMail(email, languageCode, organizationId, originUrl) {
        let organization;
        if (organizationId) {
            organization = await this.typeOrmOrganizationRepository.findOneBy({
                id: organizationId
            });
        }
        const tenantId = organization ? organization.tenantId : context_1.RequestContext.currentTenantId();
        const sendOptions = {
            template: 'email-appointment',
            message: {
                to: email
            },
            locals: {
                locale: languageCode,
                email: email,
                host: originUrl || index_2.environment.clientBaseUrl,
                organizationId: organizationId || (0, typeorm_1.IsNull)(),
                tenantId: tenantId || (0, typeorm_1.IsNull)()
            }
        };
        const body = {
            templateName: sendOptions.template,
            email: sendOptions.message.to,
            languageCode,
            organization,
            message: ''
        };
        const match = !!DISALLOW_EMAIL_SERVER_DOMAIN.find((server) => body.email.includes(server));
        if (!match) {
            try {
                const instance = await this.emailSendService.getEmailInstance({ organizationId, tenantId });
                const send = await instance.send(sendOptions);
                body['message'] = send.originalMessage;
            }
            catch (error) {
                console.error(error);
            }
            finally {
                await this.createEmailRecord(body);
            }
        }
    }
    /**
     *
     * @param email
     * @param timesheet
     */
    async setTimesheetAction(email, timesheet) {
        const languageCode = context_1.RequestContext.getLanguageCode();
        const organizationId = timesheet.employee.organizationId;
        const organization = await this.typeOrmOrganizationRepository.findOneBy({
            id: timesheet.employee.organizationId
        });
        const tenantId = organization ? organization.tenantId : context_1.RequestContext.currentTenantId();
        const sendOptions = {
            template: index_1.EmailTemplateEnum.TIME_SHEET_ACTION,
            message: {
                to: email
            },
            locals: {
                locale: languageCode,
                email: email,
                host: index_2.environment.clientBaseUrl,
                timesheet: timesheet,
                timesheet_action: timesheet.status,
                organizationId,
                tenantId
            }
        };
        const body = {
            templateName: sendOptions.template,
            email: email,
            languageCode,
            message: '',
            organization,
            user: timesheet.employee.user
        };
        const match = !!DISALLOW_EMAIL_SERVER_DOMAIN.find((server) => body.email.includes(server));
        if (!match) {
            try {
                const instance = await this.emailSendService.getEmailInstance({ organizationId, tenantId });
                const send = await instance.send(sendOptions);
                body['message'] = send.originalMessage;
            }
            catch (error) {
                console.error(error);
            }
            finally {
                await this.createEmailRecord(body);
            }
        }
    }
    /**
     *
     * @param email
     * @param timesheet
     */
    async timesheetSubmit(email, timesheet) {
        const languageCode = context_1.RequestContext.getLanguageCode();
        const organizationId = timesheet.employee.organizationId;
        const organization = await this.typeOrmOrganizationRepository.findOneBy({
            id: timesheet.employee.organizationId
        });
        const tenantId = organization ? organization.tenantId : context_1.RequestContext.currentTenantId();
        const sendOptions = {
            template: index_1.EmailTemplateEnum.TIME_SHEET_SUBMIT,
            message: {
                to: email
            },
            locals: {
                locale: languageCode,
                email: email,
                host: index_2.environment.clientBaseUrl,
                timesheet: timesheet,
                timesheet_action: timesheet.status,
                organizationId,
                tenantId
            }
        };
        const body = {
            templateName: sendOptions.template,
            email: email,
            languageCode,
            message: '',
            organization,
            user: timesheet.employee.user
        };
        const match = !!DISALLOW_EMAIL_SERVER_DOMAIN.find((server) => body.email.includes(server));
        if (!match) {
            try {
                const instance = await this.emailSendService.getEmailInstance({ organizationId, tenantId });
                const send = await instance.send(sendOptions);
                body['message'] = send.originalMessage;
            }
            catch (error) {
                console.error(error);
            }
            finally {
                await this.createEmailRecord(body);
            }
        }
    }
    /**
     * Sends a magic login code to the user's email for password-less authentication.
     *
     * @param email - User's email address.
     * @param magicCode - Generated magic code for login.
     * @param magicLink - Link for password-less authentication.
     * @param locale - Language/locale for email content.
     * @param integration - App integration configuration.
     * @param expireMinutes - Number of minutes until the magic code expires.
     * @returns {Promise<void>} - A promise indicating the completion of the operation.
     */
    async sendMagicLoginCode({ email, magicCode, magicLink, locale, integration }) {
        /** */
        const sendOptions = {
            template: index_1.EmailTemplateEnum.PASSWORD_LESS_AUTHENTICATION,
            message: {
                to: `${email}`
            },
            locals: {
                locale,
                email,
                magicCode,
                magicLink,
                ...integration
            }
        };
        /** */
        const body = {
            templateName: sendOptions.template,
            email: sendOptions.message.to,
            languageCode: locale,
            message: ''
        };
        const match = !!DISALLOW_EMAIL_SERVER_DOMAIN.find((server) => body.email.includes(server));
        // Check if the email domain is disallowed
        if (!match) {
            try {
                // Get the email sending service instance
                const instance = await this.emailSendService.getInstance();
                if (instance) {
                    // Send the email
                    const send = await instance.send(sendOptions);
                    // Update the body with the original message
                    body['message'] = send.originalMessage;
                }
                else {
                    console.error('Error while getting email instance for password-less authentication');
                }
            }
            catch (error) {
                // Handle errors during email sending
                console.log('Error while sending password-less authentication code: %s', error);
            }
        }
    }
    /**
     * Email Reset
     *
     * @param user
     * @param languageCode
     */
    async emailReset(user, languageCode, verificationCode, organization) {
        const integration = Object.assign({}, index_2.environment.appIntegrationConfig);
        const sendOptions = {
            template: index_1.EmailTemplateEnum.EMAIL_RESET,
            message: {
                to: `${user.email}`
            },
            locals: {
                ...integration,
                locale: languageCode,
                email: user.email,
                host: index_2.environment.clientBaseUrl,
                verificationCode,
                name: user.name
            }
        };
        const body = {
            templateName: sendOptions.template,
            email: sendOptions.message.to,
            languageCode,
            message: '',
            user: user,
            organization
        };
        const match = !!DISALLOW_EMAIL_SERVER_DOMAIN.find((server) => body.email.includes(server));
        if (!match) {
            try {
                const { id: organizationId, tenantId } = organization;
                const instance = await this.emailSendService.getEmailInstance({ organizationId, tenantId });
                const send = await instance.send(sendOptions);
                body['message'] = send.originalMessage;
            }
            catch (error) {
                console.log('Error while sending password less authentication code: %s', error);
            }
            finally {
                await this.createEmailRecord(body);
            }
        }
    }
    /**
     * Organization team join request email
     *
     * @param email
     * @param code
     * @param languageCode
     * @param organization
     */
    async organizationTeamJoinRequest(organizationTeam, organizationTeamJoinRequest, languageCode, organization, integration) {
        /**
         * Override the default config by merging in the provided values.
         *
         */
        (0, index_3.deepMerge)(integration, index_2.environment.appIntegrationConfig);
        const sendOptions = {
            template: index_1.EmailTemplateEnum.ORGANIZATION_TEAM_JOIN_REQUEST,
            message: {
                to: `${organizationTeamJoinRequest.email}`
            },
            locals: {
                locale: languageCode,
                host: index_2.environment.clientBaseUrl,
                ...organizationTeam,
                ...organizationTeamJoinRequest,
                ...integration
            }
        };
        const body = {
            templateName: sendOptions.template,
            email: sendOptions.message.to,
            languageCode,
            message: '',
            organization
        };
        const match = !!DISALLOW_EMAIL_SERVER_DOMAIN.find((server) => body.email.includes(server));
        if (!match) {
            try {
                const instance = await this.emailSendService.getInstance();
                const send = await instance.send(sendOptions);
                body['message'] = send.originalMessage;
            }
            catch (error) {
                console.error(error);
            }
            finally {
                await this.createEmailRecord(body);
            }
        }
    }
    async resendEmail(input, languageCode) {
        const { id } = input;
        const emailHistory = await this.typeOrmEmailHistoryRepository.findOne({
            where: {
                id
            },
            relations: {
                emailTemplate: true,
                organization: true
            }
        });
        if (!emailHistory) {
            throw Error('Email History does not exist');
        }
        // Organization
        const organization = emailHistory.organization;
        const email = emailHistory.email;
        const sendOptions = {
            template: emailHistory.emailTemplate.name,
            message: {
                to: `${email}`,
                subject: emailHistory.name,
                html: emailHistory.content
            }
        };
        const isEmailBlocked = !!DISALLOW_EMAIL_SERVER_DOMAIN.find((server) => sendOptions.message.to.includes(server));
        if (!isEmailBlocked) {
            try {
                const instance = await this.emailSendService.getEmailInstance({
                    organizationId: organization.id,
                    tenantId: emailHistory.tenantId
                });
                await instance.send(sendOptions);
                emailHistory.status = index_1.EmailStatusEnum.SENT;
                return await this.typeOrmEmailHistoryRepository.save(emailHistory);
            }
            catch (error) {
                console.log(`Error while re-sending mail: %s`, error?.message);
                emailHistory.status = index_1.EmailStatusEnum.FAILED;
                await this.typeOrmEmailHistoryRepository.save(emailHistory);
                throw new common_1.BadRequestException(`Error while re-sending mail: ${error?.message}`);
            }
        }
    }
    async createEmailRecord(createEmailOptions) {
        const emailEntity = new internal_1.EmailHistory();
        const { templateName: template, email, languageCode, message, organization, user } = createEmailOptions;
        const tenantId = organization ? organization.tenantId : context_1.RequestContext.currentTenantId();
        const emailTemplate = await this.typeOrmEmailTemplateRepository.findOneBy({
            name: template + '/html',
            languageCode
        });
        emailEntity.name = message.subject;
        emailEntity.email = email;
        emailEntity.content = message.html;
        emailEntity.emailTemplate = emailTemplate;
        emailEntity.tenantId = tenantId;
        emailEntity.organizationId = organization ? organization.id : null;
        if (user) {
            emailEntity.user = user;
        }
        return await this.typeOrmEmailHistoryRepository.save(emailEntity);
    }
    // tested e-mail send functionality
    async nodemailerSendEmail(user, url) {
        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
        // Gmail example:
        // const transporter = nodemailer.createTransport({
        // 	service: 'gmail',
        // 	auth: {
        // 		user: 'user@gmail.com',
        // 		pass: 'password'
        // 	}
        // });
        const info = await transporter.sendMail({
            from: 'Gauzy',
            to: user.email,
            subject: 'Forgotten Password',
            text: 'Forgot Password',
            html: 'Hello! <br><br> We received a password change request.<br><br>If you requested to reset your password<br><br>' +
                '<a href=' +
                url +
                '>Click here</a>'
        });
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
};
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [type_orm_email_history_repository_1.TypeOrmEmailHistoryRepository,
        mikro_orm_email_history_repository_1.MikroOrmEmailHistoryRepository,
        type_orm_email_template_repository_1.TypeOrmEmailTemplateRepository,
        mikro_orm_email_template_repository_1.MikroOrmEmailTemplateRepository,
        repository_1.TypeOrmOrganizationRepository,
        mikro_orm_organization_repository_1.MikroOrmOrganizationRepository,
        email_send_service_1.EmailSendService])
], EmailService);
//# sourceMappingURL=email.service.js.map