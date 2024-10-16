import { CrudController, PaginationParams } from './../core/crud';
import { IEquipment, IPagination } from '../../plugins/contracts/dist/index';
import { Equipment } from './equipment.entity';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDTO, UpdateEquipmentDTO } from './dto';
export declare class EquipmentController extends CrudController<Equipment> {
    private readonly equipmentService;
    constructor(equipmentService: EquipmentService);
    pagination(filter: PaginationParams<Equipment>): Promise<IPagination<IEquipment>>;
    findAll(data: any): Promise<IPagination<IEquipment>>;
    create(entity: CreateEquipmentDTO): Promise<IEquipment>;
    update(id: string, entity: UpdateEquipmentDTO): Promise<IEquipment>;
}
