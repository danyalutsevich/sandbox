import { CommandBus } from '@nestjs/cqrs';
import { UploadedFile } from '../../../plugins/contracts';
import { ImportService } from './import.service';
export declare class ImportController {
    private readonly _importService;
    private readonly _commandBus;
    constructor(_importService: ImportService, _commandBus: CommandBus);
    /**
     *
     * @param param0
     * @param file
     * @returns
     */
    parse({ importType }: {
        importType: any;
    }, file: UploadedFile): Promise<any>;
}
