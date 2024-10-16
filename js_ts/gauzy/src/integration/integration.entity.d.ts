import { IIntegration, IIntegrationType, ITag } from '../../plugins/contracts/dist/index';
import { BaseEntity } from '../core/entities/internal';
export declare class Integration extends BaseEntity implements IIntegration {
    name: string;
    provider: string;
    redirectUrl: string;
    imgSrc: string;
    isComingSoon: boolean;
    isPaid: boolean;
    version: string;
    docUrl: string;
    isFreeTrial: boolean;
    freeTrialPeriod: number;
    order: number;
    /** Additional virtual columns */
    fullImgUrl?: string;
    /**
     *
     */
    integrationTypes?: IIntegrationType[];
    /**
     *
     */
    tags?: ITag[];
}
