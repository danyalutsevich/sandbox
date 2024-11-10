import { IFeatureOrganizationUpdateInput, IOrganization } from '../../../plugins/contracts';
import { TenantBaseDTO } from "./../../core/dto";
export declare class CreateFeatureToggleDTO extends TenantBaseDTO implements IFeatureOrganizationUpdateInput {
    readonly featureId: string;
    readonly isEnabled: boolean;
    readonly organization: IOrganization;
    readonly organizationId: IOrganization['id'];
}
