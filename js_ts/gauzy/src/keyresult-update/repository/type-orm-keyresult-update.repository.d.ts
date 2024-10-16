import { Repository } from 'typeorm';
import { KeyResultUpdate } from '../keyresult-update.entity';
export declare class TypeOrmKeyResultUpdateRepository extends Repository<KeyResultUpdate> {
    readonly repository: Repository<KeyResultUpdate>;
    constructor(repository: Repository<KeyResultUpdate>);
}
