import { ICommand } from '@nestjs/cqrs';
import { IIntegrationSetting } from '../../../plugins/contracts';
export declare class IntegrationSettingCreateCommand implements ICommand {
    readonly input: IIntegrationSetting;
    static readonly type = "[Integration Setting] Create Integration Setting";
    constructor(input: IIntegrationSetting);
}
