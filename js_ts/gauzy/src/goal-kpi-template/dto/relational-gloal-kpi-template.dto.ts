import { IGoalKPITemplate } from '../../../plugins/contracts';
import { ApiProperty } from "@nestjs/swagger";
import { IsObject, IsOptional, IsString } from "class-validator";

export class RelationalGoalKpiTemplateDTO {

    @ApiProperty({ type: () => Object })
    @IsOptional()
    @IsObject()
    readonly kpi: IGoalKPITemplate;

    @ApiProperty({ type: () => String })
    @IsOptional()
    @IsString()
    readonly kpiId: string;
}