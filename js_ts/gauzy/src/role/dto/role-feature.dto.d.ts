import { IRelationalRole, IRole } from '../../../plugins/contracts';
export declare class RoleFeatureDTO implements IRelationalRole {
    readonly roleId: string;
    readonly role: IRole;
}
