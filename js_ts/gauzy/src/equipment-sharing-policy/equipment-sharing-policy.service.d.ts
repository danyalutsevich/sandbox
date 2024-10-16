import { TenantAwareCrudService } from './../core/crud';
import { IEquipmentSharingPolicy } from '../../plugins/contracts/dist/index';
import { EquipmentSharingPolicy } from './equipment-sharing-policy.entity';
import { TypeOrmEquipmentSharingPolicyRepository } from './repository/type-orm-equipment-sharing-policy.repository';
import { MikroOrmEquipmentSharingPolicyRepository } from './repository/mikro-orm-equipment-sharing-policy.repository';
export declare class EquipmentSharingPolicyService extends TenantAwareCrudService<EquipmentSharingPolicy> {
    constructor(typeOrmEquipmentSharingPolicyRepository: TypeOrmEquipmentSharingPolicyRepository, mikroOrmEquipmentSharingPolicyRepository: MikroOrmEquipmentSharingPolicyRepository);
    /**
     *
     * @param entity
     * @returns
     */
    create(entity: IEquipmentSharingPolicy): Promise<EquipmentSharingPolicy>;
    /**
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: string, entity: IEquipmentSharingPolicy): Promise<EquipmentSharingPolicy>;
}
