import { IEquipmentSharingPolicy, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController, PaginationParams } from './../core/crud';
import { EquipmentSharingPolicy } from './equipment-sharing-policy.entity';
import { EquipmentSharingPolicyService } from './equipment-sharing-policy.service';
export declare class EquipmentSharingPolicyController extends CrudController<EquipmentSharingPolicy> {
    private readonly equipmentSharingPolicyService;
    constructor(equipmentSharingPolicyService: EquipmentSharingPolicyService);
    /**
     * GET equipment sharing policy by pagination
     *
     * @param filter
     * @returns
     */
    pagination(filter: PaginationParams<EquipmentSharingPolicy>): Promise<IPagination<IEquipmentSharingPolicy>>;
    findAll(data: any): Promise<IPagination<IEquipmentSharingPolicy>>;
    create(entity: IEquipmentSharingPolicy): Promise<IEquipmentSharingPolicy>;
    update(id: string, entity: IEquipmentSharingPolicy): Promise<IEquipmentSharingPolicy>;
}
