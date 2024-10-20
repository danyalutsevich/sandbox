import * as contracts from '../../../plugins/contracts';
import { IntersectionType } from "@nestjs/mapped-types";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { RelationalContactDTO } from "./../../contact/dto";
import { RelationalTagDTO } from "./../../tags/dto";
import { TenantOrganizationBaseDTO } from "./../../core/dto";

/**
 * Warehouse request DTO validation
 */
export class WarehouseDTO extends IntersectionType(
	TenantOrganizationBaseDTO,
	RelationalTagDTO,
	RelationalContactDTO
) implements contracts.IWarehouse {

    @ApiProperty({ type: () => String, readOnly: true })
	@IsNotEmpty()
    @IsString()
	readonly name: string;

    @ApiProperty({ type: () => String, readOnly: true })
	@IsNotEmpty()
    @IsString()
	readonly code: string;

    @ApiProperty({ type: () => String, readOnly: true })
	@IsNotEmpty()
    @IsEmail()
	readonly email: string;

    @ApiPropertyOptional({ type: () => String, readOnly: true })
    @IsOptional()
	readonly description: string;

    @ApiPropertyOptional({ type: () => Boolean, readOnly: true })
	@IsOptional()
	@IsBoolean()
	readonly active: boolean;

	@ApiPropertyOptional({ type: () => Object, readOnly: true })
	@IsOptional()
	readonly logo: contracts.IImageAsset

	@ApiPropertyOptional({ type: () => String, readOnly: true })
	@IsOptional()
	readonly logoId: contracts.IImageAsset['id']
}