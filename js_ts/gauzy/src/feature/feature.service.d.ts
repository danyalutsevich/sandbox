import { FeatureEnum, IFeature, IPagination } from '../../plugins/contracts/dist/index';
import { Feature } from './feature.entity';
import { CrudService } from '../core/crud/crud.service';
import { TypeOrmFeatureRepository } from './repository/type-orm-feature.repository';
import { MikroOrmFeatureRepository } from './repository/mikro-orm-feature.repository';
export declare class FeatureService extends CrudService<Feature> {
    readonly typeOrmFeatureRepository: TypeOrmFeatureRepository;
    readonly mikroOrmFeatureRepository: MikroOrmFeatureRepository;
    constructor(typeOrmFeatureRepository: TypeOrmFeatureRepository, mikroOrmFeatureRepository: MikroOrmFeatureRepository);
    /**
     * Retrieves top-level features (those with no parent) from the database. Allows specifying related entities
     * to be included in the result. Features are ordered by their creation time in ascending order.
     *
     * @param relations An array of strings indicating which related entities to include in the result.
     * @returns A promise resolving to a paginated response containing top-level IFeature objects.
     */
    getParentFeatures(relations?: string[]): Promise<IPagination<IFeature>>;
    /**
     * Checks if the specified feature flag is enabled.
     * @param flag The feature flag to check.
     * @returns A boolean indicating whether the feature flag is enabled.
     */
    isFeatureEnabled(flag: FeatureEnum): Promise<boolean>;
}
