import { IPasswordReset } from '../../plugins/contracts/dist/index';
import { TenantBaseEntity } from './../core/entities/tenant-base.entity';
export declare class PasswordReset extends TenantBaseEntity implements IPasswordReset {
    /** */
    email: string;
    /** */
    token: string;
    /** Additional virtual columns */
    expired?: boolean;
    /**
    * Called after entity is loaded.
    */
    afterLoadEntity?(): void;
}
