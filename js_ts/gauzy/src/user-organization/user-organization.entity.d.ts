import { IUser, IUserOrganization } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class UserOrganization extends TenantOrganizationBaseEntity implements IUserOrganization {
    isDefault: boolean;
    /**
     * User
     */
    user?: IUser;
    userId: IUser['id'];
}
