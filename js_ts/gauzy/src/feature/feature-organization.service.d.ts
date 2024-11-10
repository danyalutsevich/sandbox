import { IFeatureOrganization, IFeatureOrganizationUpdateInput, ITenant } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { FeatureOrganization } from './feature-organization.entity';
import { FeatureService } from './feature.service';
import { TypeOrmFeatureOrganizationRepository } from './repository/type-orm-feature-organization.repository';
import { MikroOrmFeatureOrganizationRepository } from './repository/mikro-orm-feature-organization.repository';
export declare class FeatureOrganizationService extends TenantAwareCrudService<FeatureOrganization> {
    readonly typeOrmFeatureOrganizationRepository: TypeOrmFeatureOrganizationRepository;
    readonly mikroOrmFeatureOrganizationRepository: MikroOrmFeatureOrganizationRepository;
    private readonly _featureService;
    constructor(typeOrmFeatureOrganizationRepository: TypeOrmFeatureOrganizationRepository, mikroOrmFeatureOrganizationRepository: MikroOrmFeatureOrganizationRepository, _featureService: FeatureService);
    /**
     * UPDATE feature organization respective tenant by feature id
     *
     * @param input
     * @returns
     */
    updateFeatureOrganization(entity: IFeatureOrganizationUpdateInput): Promise<boolean>;
    /**
     * Create/Update feature organization for relative tenants.
     *
     * @param tenants An array of ITenant instances.
     * @returns A Promise resolving to an array of IFeatureOrganization.
     */
    updateTenantFeatureOrganizations(tenants: ITenant[]): Promise<IFeatureOrganization[]>;
}
