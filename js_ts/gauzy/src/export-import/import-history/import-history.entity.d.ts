import { IImportHistory, ImportStatusEnum } from '../../../plugins/contracts';
import { TenantBaseEntity } from '../../core/entities/internal';
export declare class ImportHistory extends TenantBaseEntity implements IImportHistory {
    file: string;
    path: string;
    size: number;
    status: ImportStatusEnum;
    importDate?: Date;
    /** Additional virtual columns */
    fullUrl?: string;
}
