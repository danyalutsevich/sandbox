import { Repository } from 'typeorm';
import { OrganizationAward } from '../organization-award.entity';
export declare class TypeOrmOrganizationAwardRepository extends Repository<OrganizationAward> {
    readonly repository: Repository<OrganizationAward>;
    constructor(repository: Repository<OrganizationAward>);
}
