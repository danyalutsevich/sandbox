import { Repository } from 'typeorm';
import { Equipment } from '../equipment.entity';
export declare class TypeOrmEquipmentRepository extends Repository<Equipment> {
    readonly repository: Repository<Equipment>;
    constructor(repository: Repository<Equipment>);
}
