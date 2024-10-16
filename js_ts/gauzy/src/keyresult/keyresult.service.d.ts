import { KeyResult } from './keyresult.entity';
import { TenantAwareCrudService } from './../core/crud';
import { TypeOrmKeyResultRepository } from './repository/type-orm-keyresult.repository';
import { MikroOrmKeyResultRepository } from './repository/mikro-orm-keyresult.repository';
export declare class KeyResultService extends TenantAwareCrudService<KeyResult> {
    constructor(typeOrmKeyResultRepository: TypeOrmKeyResultRepository, mikroOrmKeyResultRepository: MikroOrmKeyResultRepository);
    /**
     *
     * @param input
     * @returns
     */
    createBulk(input: KeyResult[]): Promise<KeyResult[]>;
}
