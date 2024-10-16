import { CommandBus } from '@nestjs/cqrs';
import { IOrganizationTaskSetting } from '../../plugins/contracts/dist/index';
import { CreateOrganizationTaskSettingDTO, UpdateOrganizationTaskSettingDTO } from './dto';
import { OrganizationTaskSettingService } from './organization-task-setting.service';
import { TenantOrganizationBaseDTO } from 'core/dto';
export declare class OrganizationTaskSettingController {
    private readonly commandBus;
    private readonly organizationTaskSettingService;
    constructor(commandBus: CommandBus, organizationTaskSettingService: OrganizationTaskSettingService);
    /**
     * GET organization Task Setting by organizationId
     *
     * @param organizationId
     * @returns
     */
    findByOrganizationId(query: TenantOrganizationBaseDTO): Promise<IOrganizationTaskSetting>;
    /**
     * CREATE organization task setting
     *
     * @param body
     * @returns
     */
    create(body: CreateOrganizationTaskSettingDTO): Promise<IOrganizationTaskSetting>;
    /**
     * Update an existing organization task setting record.
     *
     * @param id - The unique identifier of the organization task setting to be updated.
     * @param body - The data containing the updates for the organization task setting.
     * @returns A Promise resolving to the updated organization task setting.
     *
     * @throws Throws an HTTP status 404 error if the record is not found.
     * @throws Throws an HTTP status 400 error for invalid input. The response body may contain clues as to what went wrong.
     */
    update(id: IOrganizationTaskSetting['id'], body: UpdateOrganizationTaskSettingDTO): Promise<IOrganizationTaskSetting>;
}
