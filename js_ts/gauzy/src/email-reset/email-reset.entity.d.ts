import { IEmailReset, IUser } from '../../plugins/contracts/dist/index';
import { TenantBaseEntity } from '../core/entities/internal';
export declare class EmailReset extends TenantBaseEntity implements IEmailReset {
    email: string;
    oldEmail: string;
    code: string;
    token: string;
    expiredAt: Date;
    /** Additional virtual columns */
    isExpired: boolean;
    /**
     * User
     */
    user?: IUser;
    userId?: IUser['id'];
}
