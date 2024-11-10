import { IWarehouse } from '../../../plugins/contracts';
import { WarehouseDTO } from "./warehouse.dto";

/**
 * Update warehouse request DTO validation
 */
export class UpdateWarehouseDTO extends WarehouseDTO implements IWarehouse {}