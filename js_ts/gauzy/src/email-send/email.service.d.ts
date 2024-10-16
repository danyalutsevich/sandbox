import { IInviteEmployeeModel, IInviteUserModel, IOrganization, IOrganizationContact, LanguagesEnum, IJoinEmployeeModel, ITimesheet, IEmailHistory, IUser, IInvite, IInviteTeamMemberModel, IOrganizationTeam, IOrganizationTeamJoinRequest, IResendEmailInput, ITenant } from '../../plugins/contracts/dist/index';
import { IAppIntegrationConfig } from '../../plugins/common/dist/index';
import { EmailSendService } from './../email-send/email-send.service';
import { EmailHistory } from './../core/entities/internal';
import { TypeOrmEmailHistoryRepository } from './../email-history/repository/type-orm-email-history.repository';
import { MikroOrmEmailHistoryRepository } from './../email-history/repository/mikro-orm-email-history.repository';
import { TypeOrmEmailTemplateRepository } from './../email-template/repository/type-orm-email-template.repository';
import { MikroOrmEmailTemplateRepository } from './../email-template/repository/mikro-orm-email-template.repository';
import { TypeOrmOrganizationRepository } from './../organization/repository';
import { MikroOrmOrganizationRepository } from './../organization/repository/mikro-orm-organization.repository';
export declare class EmailService {
    readonly typeOrmEmailHistoryRepository: TypeOrmEmailHistoryRepository;
    readonly mikroOrmEmailHistoryRepository: MikroOrmEmailHistoryRepository;
    readonly typeOrmEmailTemplateRepository: TypeOrmEmailTemplateRepository;
    readonly mikroOrmEmailTemplateRepository: MikroOrmEmailTemplateRepository;
    readonly typeOrmOrganizationRepository: TypeOrmOrganizationRepository;
    readonly mikroOrmOrganizationRepository: MikroOrmOrganizationRepository;
    readonly emailSendService: EmailSendService;
    constructor(typeOrmEmailHistoryRepository: TypeOrmEmailHistoryRepository, mikroOrmEmailHistoryRepository: MikroOrmEmailHistoryRepository, typeOrmEmailTemplateRepository: TypeOrmEmailTemplateRepository, mikroOrmEmailTemplateRepository: MikroOrmEmailTemplateRepository, typeOrmOrganizationRepository: TypeOrmOrganizationRepository, mikroOrmOrganizationRepository: MikroOrmOrganizationRepository, emailSendService: EmailSendService);
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
    sendPaymentReceipt(languageCode: LanguagesEnum, email: string, contactName: string, invoiceNumber: number, amount: number, currency: string, organization: IOrganization, originUrl: string): Promise<void>;
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
    emailInvoice(languageCode: LanguagesEnum, email: string, base64: string, invoiceNumber: number, invoiceId: string, isEstimate: boolean, token: any, origin: string, organization: IOrganization): Promise<void>;
    /**
     *
     * @param organizationContact
     * @param inviterUser
     * @param organization
     * @param invite
     * @param languageCode
     * @param originUrl
     */
    inviteOrganizationContact(organizationContact: IOrganizationContact, inviterUser: IUser, organization: IOrganization, invite: IInvite, languageCode: LanguagesEnum, originUrl?: string): Promise<void>;
    /**
     *
     * @param inviteUserModel
     */
    inviteUser(inviteUserModel: IInviteUserModel): Promise<void>;
    /**
     * Invite team members
     *
     * @param invite
     */
    inviteTeamMember(invite: IInviteTeamMemberModel): Promise<void>;
    /**
     *
     * @param inviteEmployeeModel
     */
    inviteEmployee(inviteEmployeeModel: IInviteEmployeeModel): Promise<void>;
    /***
     *
     */
    sendAcceptInvitationEmail(joinEmployeeModel: IJoinEmployeeModel, originUrl?: string): Promise<void>;
    /**
     *
     * @param user
     * @param languageCode
     * @param organizationId
     * @param originUrl
     * @param integration
     */
    welcomeUser(user: IUser, languageCode: LanguagesEnum, organizationId?: string, originUrl?: string, integration?: IAppIntegrationConfig): Promise<void>;
    /**
     * Send confirmation email link
     *
     * @param user
     * @param verificationLink
     */
    emailVerification(user: IUser, verificationLink: string, verificationCode: string, integration: IAppIntegrationConfig): Promise<void>;
    /**
     *
     * @param user
     * @param url
     * @param languageCode
     * @param organizationId
     * @param originUrl
     */
    requestPassword(user: IUser, resetLink: string, languageCode: LanguagesEnum, originUrl?: string): Promise<void>;
    /**
     *
     * @param email
     * @param tenantUsersMap
     * @param languageCode
     * @param originUrl
     */
    multiTenantResetPassword(email: string, tenants: {
        resetLink: string;
        tenant: ITenant;
        user: IUser;
    }[], languageCode: LanguagesEnum, originUrl: string): Promise<void>;
    /**
     *
     * @param email
     * @param languageCode
     * @param organizationId
     * @param originUrl
     */
    sendAppointmentMail(email: string, languageCode: LanguagesEnum, organizationId?: string, originUrl?: string): Promise<void>;
    /**
     *
     * @param email
     * @param timesheet
     */
    setTimesheetAction(email: string, timesheet: ITimesheet): Promise<void>;
    /**
     *
     * @param email
     * @param timesheet
     */
    timesheetSubmit(email: string, timesheet: ITimesheet): Promise<void>;
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
    sendMagicLoginCode({ email, magicCode, magicLink, locale, integration }: {
        email: IUser['email'];
        magicCode: IUser['code'];
        magicLink: IAppIntegrationConfig['appMagicSignUrl'];
        locale: LanguagesEnum;
        integration: IAppIntegrationConfig;
    }): Promise<void>;
    /**
     * Email Reset
     *
     * @param user
     * @param languageCode
     */
    emailReset(user: IUser, languageCode: LanguagesEnum, verificationCode: string, organization: IOrganization): Promise<void>;
    /**
     * Organization team join request email
     *
     * @param email
     * @param code
     * @param languageCode
     * @param organization
     */
    organizationTeamJoinRequest(organizationTeam: IOrganizationTeam, organizationTeamJoinRequest: IOrganizationTeamJoinRequest, languageCode: LanguagesEnum, organization: IOrganization, integration?: IAppIntegrationConfig): Promise<void>;
    resendEmail(input: IResendEmailInput, languageCode: LanguagesEnum): Promise<IEmailHistory & EmailHistory>;
    private createEmailRecord;
    private nodemailerSendEmail;
}
