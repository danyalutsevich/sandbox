import Email from 'email-templates';
import { IBasePerTenantAndOrganizationEntityModel } from '../../plugins/contracts/dist/index';
import { CustomSmtpService } from "./../custom-smtp/custom-smtp.service";
import { EmailTemplateRenderService } from "./email-template-render.service";
export declare class EmailSendService {
    private readonly customSmtpService;
    private readonly emailTemplateRenderService;
    constructor(customSmtpService: CustomSmtpService, emailTemplateRenderService: EmailTemplateRenderService);
    /**
     *
     * @returns
     */
    getInstance(): Promise<Email<any>>;
    /**
     *
     * @param param0
     */
    getEmailInstance({ organizationId, tenantId }: IBasePerTenantAndOrganizationEntityModel): Promise<Email<any>>;
    /**
     *
     * @param smtpConfig
     * @returns
     */
    private getEmailConfig;
}
