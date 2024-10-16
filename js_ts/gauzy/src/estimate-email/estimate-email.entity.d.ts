import { IEstimateEmail } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class EstimateEmail extends TenantOrganizationBaseEntity implements IEstimateEmail {
    token?: string;
    email?: string;
    expireDate?: Date;
    convertAcceptedEstimates?: boolean;
}
