import { IGetActivitiesInput, ReportGroupFilterEnum } from '../../../../../plugins/contracts/dist/index';
import { IntersectionType } from "@nestjs/swagger";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEnum, IsOptional } from "class-validator";
import { FiltersQueryDTO, SelectorsQueryDTO } from "../../../../shared/dto";

/**
 * Get activities request DTO validation
 */
export class ActivityQueryDTO extends IntersectionType(
    FiltersQueryDTO,
    SelectorsQueryDTO
) implements IGetActivitiesInput {

    @ApiPropertyOptional({ type: () => Array, enum: ReportGroupFilterEnum })
    @IsOptional()
    @IsEnum(ReportGroupFilterEnum)
    readonly groupBy: ReportGroupFilterEnum;

    @ApiPropertyOptional({ type: () => Array, isArray: true })
    @IsOptional()
    @IsArray()
    readonly types: string[];

    @ApiPropertyOptional({ type: () => Array, isArray: true })
    @IsOptional()
    @IsArray()
    readonly titles: string[];
}