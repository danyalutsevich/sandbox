import { CrudController, PaginationParams } from './../core/crud';
import { EquipmentSharing } from './equipment-sharing.entity';
import { EquipmentSharingService } from './equipment-sharing.service';
import { IEquipmentSharing, IPagination } from '../../plugins/contracts/dist/index';
import { CommandBus } from '@nestjs/cqrs';
export declare class EquipmentSharingController extends CrudController<EquipmentSharing> {
    private readonly equipmentSharingService;
    private commandBus;
    constructor(equipmentSharingService: EquipmentSharingService, commandBus: CommandBus);
    /**
     * GET equipment sharings by orgization id
     *
     * @param orgId
     * @returns
     */
    findEquipmentSharingsByOrgId(organizationId: string): Promise<IPagination<IEquipmentSharing>>;
    /**
     * GET equipment sharings by employee id
     *
     * @param employeeId
     * @returns
     */
    findEquipmentSharingsByEmployeeId(employeeId: string): Promise<IPagination<IEquipmentSharing>>;
    /**
     * CREATE equipment sharing
     *
     * @param organizationId
     * @param equipmentSharing
     * @returns
     */
    createEquipmentSharing(organizationId: string, equipmentSharing: EquipmentSharing): Promise<IEquipmentSharing>;
    /**
     * UPDATE equipment sharings request approval
     *
     * @param id
     * @returns
     */
    equipmentSharingsRequestApproval(id: string): Promise<IEquipmentSharing>;
    /**
     * UPDATE equipment sharings request refuse
     *
     * @param id
     * @returns
     */
    equipmentSharingsRequestRefuse(id: string): Promise<IEquipmentSharing>;
    /**
     * GET equipment sharing by pagination
     *
     * @param filter
     * @returns
     */
    pagination(filter: PaginationParams<EquipmentSharing>): Promise<IPagination<IEquipmentSharing>>;
    /**
     * GET all equipment sharings
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<IEquipmentSharing>>;
    /**
     * UPDATE equipment sharing by id
     *
     * @param id
     * @param equipmentSharing
     * @returns
     */
    update(id: string, equipmentSharing: EquipmentSharing): Promise<IEquipmentSharing>;
}
