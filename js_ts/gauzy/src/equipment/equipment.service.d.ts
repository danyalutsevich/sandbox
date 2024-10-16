import { IPagination } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { TypeOrmEquipmentRepository } from './repository/type-orm-equipment.repository';
import { MikroOrmEquipmentRepository } from './repository/mikro-orm-equipment.repository';
import { Equipment } from './equipment.entity';
export declare class EquipmentService extends TenantAwareCrudService<Equipment> {
    constructor(typeOrmEquipmentRepository: TypeOrmEquipmentRepository, mikroOrmEquipmentRepository: MikroOrmEquipmentRepository);
    /**
     *
     * @returns
     */
    getAll(): Promise<IPagination<Equipment>>;
    /**
     *
     * @param filter
     * @returns
     */
    pagination(filter: any): Promise<IPagination<Equipment>>;
}
