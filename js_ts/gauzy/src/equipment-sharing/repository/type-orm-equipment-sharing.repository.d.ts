import { Repository } from 'typeorm';
import { EquipmentSharing } from '../equipment-sharing.entity';
export declare class TypeOrmEquipmentSharingRepository extends Repository<EquipmentSharing> {
    readonly repository: Repository<EquipmentSharing>;
    constructor(repository: Repository<EquipmentSharing>);
}
