import { IContact, IEmployeeUpdateInput } from '../../../plugins/contracts';
import { SocialNetworksDTO } from "./network.dto";
import { EmploymentDTO } from "./employment.dto";
import { HiringDTO } from "./hiring.dto";
import { RatesDTO } from "./rates.dto";
import { RelationalTagDTO } from "./../../tags/dto";
import { Employee } from "./../employee.entity";
declare const UpdateProfileDTO_base: import("@nestjs/mapped-types").MappedType<SocialNetworksDTO & EmploymentDTO & HiringDTO & RatesDTO & RelationalTagDTO & Pick<Employee, "upworkId" | "linkedInId">>;
/**
 * EMPLOYEE can updates these fields only
 * Public Fields DTO
 */
export declare class UpdateProfileDTO extends UpdateProfileDTO_base implements IEmployeeUpdateInput {
    readonly profile_link?: string;
    readonly contact?: IContact;
    isAway?: boolean;
}
export {};
