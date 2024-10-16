import { IIntegrationMapSyncEntity, ITagCreateInput, ITagUpdateInput } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class IntegrationMapSyncLabelCommand implements ICommand {
    readonly request: IIntegrationMapSyncEntity<ITagCreateInput | ITagUpdateInput>;
    static readonly type = "[Integration Map] Sync Label";
    constructor(request: IIntegrationMapSyncEntity<ITagCreateInput | ITagUpdateInput>);
}
