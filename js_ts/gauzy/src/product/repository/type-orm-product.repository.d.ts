import { Repository } from 'typeorm';
import { Product } from '../product.entity';
export declare class TypeOrmProductRepository extends Repository<Product> {
    readonly repository: Repository<Product>;
    constructor(repository: Repository<Product>);
}
