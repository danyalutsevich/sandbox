import { IExpenseCreateInput } from "../../../plugins/contracts";
import { IntersectionType } from "@nestjs/mapped-types";
import { PartialType } from "@nestjs/swagger";
import { RelationalTagDTO } from "./../../tags/dto";
import { EmployeeFeatureDTO } from "./../../employee/dto";
import { OrganizationVendorFeatureDTO } from "./../../organization-vendor/dto";
import { ExpenseDTO } from "./expense.dto";
import { RelationalCurrencyDTO } from "currency/dto";

/**
 * Create Expense DTO request validation
 */
export class CreateExpenseDTO extends IntersectionType(
    ExpenseDTO,
    OrganizationVendorFeatureDTO,
    PartialType(EmployeeFeatureDTO),
    IntersectionType(RelationalTagDTO, RelationalCurrencyDTO)
) implements IExpenseCreateInput {}