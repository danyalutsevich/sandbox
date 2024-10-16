import { ICommandHandler } from '@nestjs/cqrs';
import { GauzyCloudService } from '../../gauzy-cloud.service';
import { GauzyCloudOrganizationMigrateCommand } from './../gauzy-cloud-organization.migrate.command';
export declare class GauzyCloudOrganizationMigrateHandler implements ICommandHandler<GauzyCloudOrganizationMigrateCommand> {
    private readonly gauzyCloudService;
    constructor(gauzyCloudService: GauzyCloudService);
    execute(command: GauzyCloudOrganizationMigrateCommand): Promise<any>;
}
