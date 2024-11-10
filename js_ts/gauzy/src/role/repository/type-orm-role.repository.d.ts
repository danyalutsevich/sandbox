import { Repository } from 'typeorm';
import { Role } from '../role.entity';
export declare class TypeOrmRoleRepository extends Repository<Role> {
    readonly repository: Repository<Role>;
    constructor(repository: Repository<Role>);
}
