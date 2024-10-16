import { IIncomeUpdateInput } from '../../../plugins/contracts';
import { IntersectionType } from "@nestjs/mapped-types";
import { RelationalCurrencyDTO } from "./../../currency/dto";
import { RelationalTagDTO } from "./../../tags/dto";
import { IncomeDTO } from "./income.dto";

/**
 * Update income request DTO validation
 */
export class UpdateIncomeDTO extends IntersectionType(
    IncomeDTO,
    RelationalTagDTO,
    RelationalCurrencyDTO
) implements IIncomeUpdateInput {}