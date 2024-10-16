import { IEmailHistory, IEmailTemplate, IUser, EmailStatusEnum } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class EmailHistory extends TenantOrganizationBaseEntity implements IEmailHistory {
    name: string;
    content: string;
    email: string;
    /**
     * User
     */
    user?: IUser;
    userId?: IUser['id'];
    /**
     * Email Template
     */
    emailTemplate: IEmailTemplate;
    emailTemplateId: IEmailTemplate['id'];
    status?: EmailStatusEnum;
}
