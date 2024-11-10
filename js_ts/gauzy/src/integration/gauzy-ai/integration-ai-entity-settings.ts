import { IntegrationEntity } from '../../../plugins/contracts';

export const DEFAULT_ENTITY_SETTINGS = [
    {
        entity: IntegrationEntity.JOB_MATCHING,
        sync: true
    },
    {
        entity: IntegrationEntity.EMPLOYEE_PERFORMANCE,
        sync: true
    }
];
