import { ICommandHandler } from '@nestjs/cqrs';
import { ITaskVersion } from '../../../../../plugins/contracts/dist/index';
import { TenantVersionBulkCreateCommand } from '../tenant-version-bulk-create.command';
import { TaskVersionService } from '../../version.service';
import { TaskVersion } from '../../version.entity';
export declare class TenantVersionBulkCreateHandler implements ICommandHandler<TenantVersionBulkCreateCommand> {
    private readonly taskVersionService;
    constructor(taskVersionService: TaskVersionService);
    execute(command: TenantVersionBulkCreateCommand): Promise<ITaskVersion[] & TaskVersion[]>;
}
