import { IScreenshot, UploadedFile } from '../../../plugins/contracts';
import { Screenshot } from './screenshot.entity';
import { ScreenshotService } from './screenshot.service';
import { DeleteQueryDTO } from './../../shared/dto';
export declare class ScreenshotController {
    private readonly _screenshotService;
    constructor(_screenshotService: ScreenshotService);
    /**
     *
     * @param entity
     * @param file
     * @returns
     */
    create(input: Screenshot, file: UploadedFile): Promise<Screenshot>;
    /**
     *
     * @param screenshotId
     * @param options
     * @returns
     */
    delete(screenshotId: IScreenshot['id'], options: DeleteQueryDTO<Screenshot>): Promise<IScreenshot>;
}
