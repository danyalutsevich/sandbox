import { IEmployeeUpdateInput } from '../../../plugins/contracts';
import { EmployeePublicSettingDTO } from "./employee-public-setting.dto";
import { UpdateProfileDTO } from "./update-profile.dto";
declare const UpdateEmployeeDTO_base: import("@nestjs/mapped-types").MappedType<UpdateProfileDTO & EmployeePublicSettingDTO>;
/**
 * Only SUPER_ADMIN/ADMIN updates these fields
 * Private fields DTO
 */
export declare class UpdateEmployeeDTO extends UpdateEmployeeDTO_base implements IEmployeeUpdateInput {
    isActive?: boolean;
    isJobSearchActive?: boolean;
    isVerified?: boolean;
    isVetted?: boolean;
    isTrackingEnabled: boolean;
    allowScreenshotCapture?: boolean;
    /** Employee status (Online/Offline) */
    isOnline?: boolean;
    /** Employee time tracking status */
    isTrackingTime?: boolean;
}
export {};
