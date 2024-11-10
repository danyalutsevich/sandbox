import { IIntegrationSetting } from '../../plugins/contracts/dist/index';
import { IntegrationSettingService } from './integration-setting.service';
import { UpdateIntegrationSettingDTO } from './dto/update-integration-setting.dto';
export declare class IntegrationSettingController {
    private readonly integrationSettingService;
    constructor(integrationSettingService: IntegrationSettingService);
    /**
     * Update integration setting.
     *
     * @param id - The ID of the integration setting to update.
     * @param input - The updated integration setting data.
     * @returns A Promise that resolves to the updated integration setting.
     */
    update(id: IIntegrationSetting['id'], input: UpdateIntegrationSettingDTO): Promise<IIntegrationSetting>;
}
