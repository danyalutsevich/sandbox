import { ICommand } from '@nestjs/cqrs';
import { IOrganizationTeamJoinRequestCreateInput, LanguagesEnum } from '../../../plugins/contracts';
import { IAppIntegrationConfig } from '../../../plugins/common/dist/index';
export declare class OrganizationTeamJoinRequestCreateCommand implements ICommand {
    readonly input: IOrganizationTeamJoinRequestCreateInput & Partial<IAppIntegrationConfig>;
    readonly languageCode: LanguagesEnum;
    static readonly type = "[Organization Team Join Request] Create";
    constructor(input: IOrganizationTeamJoinRequestCreateInput & Partial<IAppIntegrationConfig>, languageCode: LanguagesEnum);
}
