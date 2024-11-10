import { Repository } from 'typeorm';
import { FeatureOrganization } from '../feature-organization.entity';
export declare class TypeOrmFeatureOrganizationRepository extends Repository<FeatureOrganization> {
    readonly repository: Repository<FeatureOrganization>;
    constructor(repository: Repository<FeatureOrganization>);
}
