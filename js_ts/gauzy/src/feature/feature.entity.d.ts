import { FeatureEnum, IFeature, IFeatureOrganization } from '../../plugins/contracts/dist/index';
import { BaseEntity } from '../core/entities/internal';
export declare class Feature extends BaseEntity implements IFeature {
    name: string;
    code: FeatureEnum;
    isPaid?: boolean;
    description: string;
    image: string;
    link: string;
    status: string;
    icon: string;
    /** Additional virtual columns */
    isEnabled?: boolean;
    imageUrl?: string;
    /**
     * Feature
     */
    parent: IFeature;
    parentId?: string;
    /**
     * FeatureOrganization
     */
    featureOrganizations?: IFeatureOrganization[];
    /**
     * Feature
     */
    children: IFeature[];
}
