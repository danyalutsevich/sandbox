import { IIntegrationMapSyncEntity, ITagCreateInput, ITagUpdateInput, IntegrationEntity } from '../../../plugins/contracts';
export declare class AutomationLabelSyncCommand {
    readonly input: IIntegrationMapSyncEntity<ITagCreateInput | ITagUpdateInput>;
    readonly entity: IntegrationEntity;
    constructor(input: IIntegrationMapSyncEntity<ITagCreateInput | ITagUpdateInput>, entity: IntegrationEntity);
}
