import { ICommand } from '@nestjs/cqrs';
import { IIntegrationMapSyncEntity, IOrganizationCreateInput, IOrganizationUpdateInput } from '../../../plugins/contracts';
export declare class IntegrationMapSyncOrganizationCommand implements ICommand {
    readonly input: IIntegrationMapSyncEntity<IOrganizationCreateInput | IOrganizationUpdateInput>;
    static readonly type = "[Integration Map] Sync Organization";
    constructor(input: IIntegrationMapSyncEntity<IOrganizationCreateInput | IOrganizationUpdateInput>);
}
