import { IFeature, IFeatureOrganization } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class FeatureOrganization extends TenantOrganizationBaseEntity implements IFeatureOrganization {
    isEnabled: boolean;
    /**
     * Feature
     */
    feature: IFeature;
    featureId: IFeature['id'];
}
