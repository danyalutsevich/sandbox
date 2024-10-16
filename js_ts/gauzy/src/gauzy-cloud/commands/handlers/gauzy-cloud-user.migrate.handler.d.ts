import { ICommandHandler } from '@nestjs/cqrs';
import { GauzyCloudService } from '../../gauzy-cloud.service';
import { GauzyCloudUserMigrateCommand } from './../gauzy-cloud-user.migrate.command';
export declare class GauzyCloudUserMigrateHandler implements ICommandHandler<GauzyCloudUserMigrateCommand> {
    private readonly gauzyCloudService;
    constructor(gauzyCloudService: GauzyCloudService);
    execute(command: GauzyCloudUserMigrateCommand): Promise<any>;
}
