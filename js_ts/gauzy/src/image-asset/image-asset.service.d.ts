import { DeepPartial } from 'typeorm';
import { IImageAsset } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { MikroOrmImageAssetRepository } from './repository/mikro-orm-image-asset.repository';
import { TypeOrmImageAssetRepository } from './repository/type-orm-image-asset.repository';
import { ImageAsset } from './image-asset.entity';
export declare class ImageAssetService extends TenantAwareCrudService<ImageAsset> {
    constructor(typeOrmImageAssetRepository: TypeOrmImageAssetRepository, mikroOrmImageAssetRepository: MikroOrmImageAssetRepository);
    /**
     * Create image asset
     *
     * @param entity
     * @returns
     */
    create(entity: DeepPartial<ImageAsset>): Promise<IImageAsset>;
    deleteAsset(imageId: string): Promise<ImageAsset>;
}
