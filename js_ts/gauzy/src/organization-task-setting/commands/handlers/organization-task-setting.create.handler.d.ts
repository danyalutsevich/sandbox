import { ICommandHandler } from '@nestjs/cqrs';
import { IOrganizationTaskSetting } from '../../../../plugins/contracts/dist/index';
import { OrganizationTaskSettingService } from '../../organization-task-setting.service';
import { OrganizationTaskSettingCreateCommand } from '../organization-task-setting.create.command';
export declare class OrganizationTaskSettingCreateHandler implements ICommandHandler<OrganizationTaskSettingCreateCommand> {
    private readonly _organizationTaskSettingService;
    constructor(_organizationTaskSettingService: OrganizationTaskSettingService);
    /**
     * The execution of a command to create organization task settings.
     * This method tries to create a new organization task setting using the provided command and inputs.
     *
     * @param command An instance of OrganizationTaskSettingCreateCommand containing the necessary information to create an organization task setting.
     * @returns A promise that resolves to an instance of IOrganizationTaskSetting, representing the newly created organization task setting.
     */
    execute(command: OrganizationTaskSettingCreateCommand): Promise<IOrganizationTaskSetting>;
}
