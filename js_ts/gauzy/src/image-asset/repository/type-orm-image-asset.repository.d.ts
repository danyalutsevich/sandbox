import { Repository } from 'typeorm';
import { ImageAsset } from '../image-asset.entity';
export declare class TypeOrmImageAssetRepository extends Repository<ImageAsset> {
    readonly repository: Repository<ImageAsset>;
    constructor(repository: Repository<ImageAsset>);
}
