import { ICommandHandler } from '@nestjs/cqrs';
import { ITaskVersion } from '../../../../../plugins/contracts/dist/index';
import { OrganizationVersionBulkCreateCommand } from '../organization-version-bulk-create.command';
import { TaskVersionService } from '../../version.service';
import { TaskVersion } from '../../version.entity';
export declare class OrganizationVersionBulkCreateHandler implements ICommandHandler<OrganizationVersionBulkCreateCommand> {
    private readonly taskVersionService;
    constructor(taskVersionService: TaskVersionService);
    execute(command: OrganizationVersionBulkCreateCommand): Promise<ITaskVersion[] | TaskVersion[]>;
}
