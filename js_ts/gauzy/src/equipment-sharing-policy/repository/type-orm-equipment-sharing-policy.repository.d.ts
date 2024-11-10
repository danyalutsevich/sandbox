import { Repository } from 'typeorm';
import { EquipmentSharingPolicy } from '../equipment-sharing-policy.entity';
export declare class TypeOrmEquipmentSharingPolicyRepository extends Repository<EquipmentSharingPolicy> {
    readonly repository: Repository<EquipmentSharingPolicy>;
    constructor(repository: Repository<EquipmentSharingPolicy>);
}
