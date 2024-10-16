import { Repository } from 'typeorm';
import { OrganizationPosition } from '../organization-position.entity';
export declare class TypeOrmOrganizationPositionRepository extends Repository<OrganizationPosition> {
    readonly repository: Repository<OrganizationPosition>;
    constructor(repository: Repository<OrganizationPosition>);
}
