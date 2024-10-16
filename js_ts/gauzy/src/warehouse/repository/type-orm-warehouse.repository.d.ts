import { Repository } from 'typeorm';
import { Warehouse } from '../warehouse.entity';
export declare class TypeOrmWarehouseRepository extends Repository<Warehouse> {
    readonly repository: Repository<Warehouse>;
    constructor(repository: Repository<Warehouse>);
}
