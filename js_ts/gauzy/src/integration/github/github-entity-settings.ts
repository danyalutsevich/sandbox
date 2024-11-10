import { IntegrationEntity } from '../../../plugins/contracts';

export const DEFAULT_ENTITY_SETTINGS = [
    {
        entity: IntegrationEntity.ISSUE,
        sync: true
    }
];

export const ISSUE_TIED_ENTITIES = [
    {
        entity: IntegrationEntity.LABEL,
        sync: true
    }
];
