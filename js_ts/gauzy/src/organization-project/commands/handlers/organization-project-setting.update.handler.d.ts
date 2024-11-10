import { ICommandHandler } from '@nestjs/cqrs';
import { IOrganizationProjectSetting } from '../../../../plugins/contracts/dist/index';
import { OrganizationProjectService } from '../../organization-project.service';
import { OrganizationProjectSettingUpdateCommand } from '../organization-project-setting.update.command';
export declare class OrganizationProjectSettingUpdateHandler implements ICommandHandler<OrganizationProjectSettingUpdateCommand> {
    private readonly _organizationProjectService;
    private readonly logger;
    constructor(_organizationProjectService: OrganizationProjectService);
    /**
     * Execute an organization project setting update command.
     *
     * @param command - An `OrganizationProjectSettingUpdateCommand` object containing the update details.
     * @returns A promise that resolves to an `IOrganizationProjectSetting` or an `UpdateResult` object representing the result of the update operation.
     */
    execute(command: OrganizationProjectSettingUpdateCommand): Promise<IOrganizationProjectSetting>;
}
