import { IImageAsset, ITenant } from '../../../plugins/contracts';
export declare class TenantDTO implements ITenant {
    readonly name: string;
    readonly logo: string;
    readonly imageId: IImageAsset['id'];
}
