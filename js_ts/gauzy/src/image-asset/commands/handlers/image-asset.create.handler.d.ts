import { ICommandHandler } from '@nestjs/cqrs';
import { IImageAsset } from '../../../../plugins/contracts/dist/index';
import { ImageAssetCreateCommand } from '../image-asset.create.command';
import { ImageAssetService } from '../../image-asset.service';
export declare class ImageAssetCreateHandler implements ICommandHandler<ImageAssetCreateCommand> {
    private readonly _imageAssetService;
    constructor(_imageAssetService: ImageAssetService);
    execute(command: ImageAssetCreateCommand): Promise<IImageAsset>;
}
