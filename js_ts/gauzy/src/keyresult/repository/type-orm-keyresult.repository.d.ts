import { Repository } from 'typeorm';
import { KeyResult } from '../keyresult.entity';
export declare class TypeOrmKeyResultRepository extends Repository<KeyResult> {
    readonly repository: Repository<KeyResult>;
    constructor(repository: Repository<KeyResult>);
}
