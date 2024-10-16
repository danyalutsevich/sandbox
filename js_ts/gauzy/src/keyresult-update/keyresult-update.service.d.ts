import { KeyResultUpdate } from './keyresult-update.entity';
import { TenantAwareCrudService } from './../core/crud';
import { TypeOrmKeyResultUpdateRepository } from './repository/type-orm-keyresult-update.repository';
import { MikroOrmKeyResultUpdateRepository } from './repository/mikro-orm-keyresult-update.repository';
export declare class KeyResultUpdateService extends TenantAwareCrudService<KeyResultUpdate> {
    constructor(typeOrmKeyResultUpdateRepository: TypeOrmKeyResultUpdateRepository, mikroOrmKeyResultUpdateRepository: MikroOrmKeyResultUpdateRepository);
    /**
     *
     * @param keyResultId
     * @returns
     */
    findByKeyResultId(keyResultId: string): Promise<KeyResultUpdate[]>;
    /**
     *
     * @param ids
     * @returns
     */
    deleteBulkByKeyResultId(ids: string[]): Promise<import("typeorm").DeleteResult>;
}
