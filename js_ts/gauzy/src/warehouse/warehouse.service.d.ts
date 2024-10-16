import { IWarehouse } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { MikroOrmWarehouseRepository } from './repository/mikro-orm-warehouse.repository';
import { TypeOrmWarehouseRepository } from './repository/type-orm-warehouse.repository';
import { Warehouse } from './warehouse.entity';
export declare class WarehouseService extends TenantAwareCrudService<Warehouse> {
    readonly typeOrmWarehouseRepository: TypeOrmWarehouseRepository;
    readonly mikroOrmWarehouseRepository: MikroOrmWarehouseRepository;
    constructor(typeOrmWarehouseRepository: TypeOrmWarehouseRepository, mikroOrmWarehouseRepository: MikroOrmWarehouseRepository);
    /**
     *
     * @param id
     * @param relations
     * @returns
     */
    findById(id: IWarehouse['id'], relations?: string[]): Promise<IWarehouse>;
}
