import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty } from "class-validator";
import { IDeleteTimeSlot } from '../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseDTO } from "./../../../core/dto";

export class DeleteTimeSlotDTO extends TenantOrganizationBaseDTO
	implements IDeleteTimeSlot {

	@ApiProperty({ type: () => Array })
	@ArrayNotEmpty()
	readonly ids: string[] = [];
}