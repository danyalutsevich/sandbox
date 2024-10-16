import { IDeal, IUser, IPipelineStage, IOrganizationContact } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class Deal extends TenantOrganizationBaseEntity implements IDeal {
    title: string;
    probability?: number;
    /**
     * User
     */
    createdBy: IUser;
    createdByUserId: string;
    /**
     * PipelineStage
     */
    stage: IPipelineStage;
    stageId: string;
    /**
     * OrganizationContact
     */
    client: IOrganizationContact;
    clientId: string;
}
