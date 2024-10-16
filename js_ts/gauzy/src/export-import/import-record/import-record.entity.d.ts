import { IImportRecord } from '../../../plugins/contracts';
import { TenantBaseEntity } from '../../core/entities/internal';
export declare class ImportRecord extends TenantBaseEntity implements IImportRecord {
    entityType: string;
    sourceId: string;
    destinationId: string;
    importDate?: Date;
    /** Additional virtual columns */
    wasCreated?: boolean;
}
