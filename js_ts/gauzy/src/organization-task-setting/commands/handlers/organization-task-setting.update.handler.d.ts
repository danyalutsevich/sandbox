import { ICommandHandler } from '@nestjs/cqrs';
import { IOrganizationTaskSetting } from '../../../../plugins/contracts/dist/index';
import { OrganizationTaskSettingService } from '../../organization-task-setting.service';
import { OrganizationTaskSettingUpdateCommand } from '../organization-task-setting.update.command';
export declare class OrganizationTaskSettingUpdateHandler implements ICommandHandler<OrganizationTaskSettingUpdateCommand> {
    private readonly _organizationTaskSettingService;
    constructor(_organizationTaskSettingService: OrganizationTaskSettingService);
    /**
     * Executes the update operation for organization task settings.
     *
     * @param command - The command containing the identifier and updated settings.
     * @returns A Promise resolving to the updated organization task settings.
     * @throws Throws an error if the update operation fails.
     */
    execute(command: OrganizationTaskSettingUpdateCommand): Promise<IOrganizationTaskSetting>;
}
