import { ICommand } from '@nestjs/cqrs';
import { IIntegrationMapSyncEntity, IOrganizationProjectCreateInput, IOrganizationProjectUpdateInput } from '../../../plugins/contracts';
export declare class IntegrationMapSyncProjectCommand implements ICommand {
    readonly input: IIntegrationMapSyncEntity<IOrganizationProjectCreateInput | IOrganizationProjectUpdateInput>;
    static readonly type = "[Integration Map] Sync Project";
    constructor(input: IIntegrationMapSyncEntity<IOrganizationProjectCreateInput | IOrganizationProjectUpdateInput>);
}
