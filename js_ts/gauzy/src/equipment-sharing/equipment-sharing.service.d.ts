import { IEquipmentSharing, IPagination } from '../../plugins/contracts/dist/index';
import { ConfigService } from '../../plugins/config/dist/index';
import { EquipmentSharing } from './equipment-sharing.entity';
import { TenantAwareCrudService } from './../core/crud';
import { TypeOrmEquipmentSharingRepository } from './repository/type-orm-equipment-sharing.repository';
import { MikroOrmEquipmentSharingRepository } from './repository/mikro-orm-equipment-sharing.repository';
import { TypeOrmRequestApprovalRepository } from './../request-approval/repository/type-orm-request-approval.repository';
import { MikroOrmRequestApprovalRepository } from './../request-approval/repository/mikro-orm-request-approval.repository';
export declare class EquipmentSharingService extends TenantAwareCrudService<EquipmentSharing> {
    private typeOrmRequestApprovalRepository;
    private readonly configService;
    constructor(typeOrmEquipmentSharingRepository: TypeOrmEquipmentSharingRepository, mikroOrmEquipmentSharingRepository: MikroOrmEquipmentSharingRepository, typeOrmRequestApprovalRepository: TypeOrmRequestApprovalRepository, mikroOrmRequestApprovalRepository: MikroOrmRequestApprovalRepository, configService: ConfigService);
    findEquipmentSharingsByOrgId(organizationId: string): Promise<any>;
    findRequestApprovalsByEmployeeId(id: string): Promise<any>;
    findAllEquipmentSharings(): Promise<IPagination<IEquipmentSharing>>;
    createEquipmentSharing(equipmentSharing: EquipmentSharing): Promise<EquipmentSharing>;
    update(id: string, equipmentSharing: EquipmentSharing): Promise<EquipmentSharing>;
    delete(id: string): Promise<any>;
    updateStatusEquipmentSharingByAdmin(id: string, status: number): Promise<EquipmentSharing>;
    pagination(filter: any): Promise<IPagination<IEquipmentSharing>>;
}
