import { IIncomeFindInput } from '../../../plugins/contracts';
import { EmployeeFeatureDTO } from "./../../employee/dto";
import { IncomeDTO } from "./income.dto";
declare const DeleteIncomeDTO_base: import("@nestjs/mapped-types").MappedType<Partial<EmployeeFeatureDTO> & Pick<IncomeDTO, "organization" | "organizationId">>;
/**
 * Delete income request DTO validation
 */
export declare class DeleteIncomeDTO extends DeleteIncomeDTO_base implements IIncomeFindInput {
}
export {};
