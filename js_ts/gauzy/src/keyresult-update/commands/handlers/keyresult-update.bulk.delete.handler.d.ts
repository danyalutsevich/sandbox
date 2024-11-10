import { ICommandHandler } from '@nestjs/cqrs';
import { KeyResultUpdateBulkDeleteCommand } from '..';
import { KeyResultUpdateService } from '../../keyresult-update.service';
export declare class KeyResultUpdateBulKDeleteHandler implements ICommandHandler<KeyResultUpdateBulkDeleteCommand> {
    private readonly keyResultUpdateService;
    constructor(keyResultUpdateService: KeyResultUpdateService);
    execute(command: KeyResultUpdateBulkDeleteCommand): Promise<any>;
}
