import { IIntegrationMapSyncEntity, ITaskCreateInput, ITaskUpdateInput, IntegrationEntity } from '../../../plugins/contracts';

export class AutomationTaskSyncCommand {

    constructor(
        public readonly input: IIntegrationMapSyncEntity<ITaskCreateInput | ITaskUpdateInput>,
        public readonly entity: IntegrationEntity
    ) { }
}
