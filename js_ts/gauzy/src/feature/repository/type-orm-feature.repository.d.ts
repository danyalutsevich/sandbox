import { Repository } from 'typeorm';
import { Feature } from '../feature.entity';
export declare class TypeOrmFeatureRepository extends Repository<Feature> {
    readonly repository: Repository<Feature>;
    constructor(repository: Repository<Feature>);
}
