import { IEquipment } from '../../../plugins/contracts';
import { RelationalCurrencyDTO } from "./../../currency/dto";
import { RelationalTagDTO } from "./../../tags/dto";
import { EquipmentDTO } from "./equipment.dto";
declare const CreateEquipmentDTO_base: import("@nestjs/mapped-types").MappedType<RelationalTagDTO & RelationalCurrencyDTO & EquipmentDTO>;
export declare class CreateEquipmentDTO extends CreateEquipmentDTO_base implements IEquipment {
}
export {};
