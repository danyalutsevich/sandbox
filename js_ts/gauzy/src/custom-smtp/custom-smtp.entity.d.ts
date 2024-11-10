import { ICustomSmtp } from '../../plugins/contracts/dist/index';
import { ISMTPConfig } from '../../plugins/common/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class CustomSmtp extends TenantOrganizationBaseEntity implements ICustomSmtp {
    fromAddress?: string;
    host: string;
    port: number;
    secure: boolean;
    username: string;
    password: string;
    isValidate?: boolean;
    /**
     * Additional fields to expose secret fields
     */
    secretKey?: string;
    secretPassword?: string;
    /**
     * Get SMTP transporter configuration
     *
     * @returns
     */
    getSmtpTransporter?(): ISMTPConfig;
}
