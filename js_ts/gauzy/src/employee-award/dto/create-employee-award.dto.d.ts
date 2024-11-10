import { IEmployeeAwardCreateInput } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "./../../core/dto";
import { EmployeeFeatureDTO } from "./../../employee/dto";
declare const CreateEmployeeAwardDTO_base: import("@nestjs/mapped-types").MappedType<TenantOrganizationBaseDTO & EmployeeFeatureDTO>;
/**
 * Create employee award DTO validation
 */
export declare class CreateEmployeeAwardDTO extends CreateEmployeeAwardDTO_base implements IEmployeeAwardCreateInput {
    readonly name: string;
    readonly year: string;
}
export {};
