import { ICustomSmtp, ICustomSmtpFindInput, IVerifySMTPTransport } from '../../plugins/contracts/dist/index';
import { ISMTPConfig } from '../../plugins/common/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { CustomSmtp } from './custom-smtp.entity';
import { TypeOrmCustomSmtpRepository } from './repository/type-orm-custom-smtp.repository';
import { MikroOrmCustomSmtpRepository } from './repository/mikro-orm-custom-smtp.repository';
export declare class CustomSmtpService extends TenantAwareCrudService<CustomSmtp> {
    constructor(typeOrmCustomSmtpRepository: TypeOrmCustomSmtpRepository, mikroOrmCustomSmtpRepository: MikroOrmCustomSmtpRepository);
    /**
     * GET SMTP settings for tenant/organization
     *
     * @param query
     * @returns
     */
    getSmtpSetting(query: ICustomSmtpFindInput): Promise<ICustomSmtp | ISMTPConfig>;
    /**
     * Verifies SMTP configuration
     *
     * @param configuration
     * @returns
     */
    verifyTransporter(transport: IVerifySMTPTransport): Promise<boolean>;
}
