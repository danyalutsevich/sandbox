import { Repository } from 'typeorm';
import { User } from '../user.entity';
export declare class TypeOrmUserRepository extends Repository<User> {
    readonly repository: Repository<User>;
    constructor(repository: Repository<User>);
}
