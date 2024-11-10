import { ICommand } from '@nestjs/cqrs';
import { IEditEntityByMemberInput as IOrganizationDepartmentEditByEmployeeInput } from '../../../plugins/contracts';
export declare class OrganizationDepartmentEditByEmployeeCommand implements ICommand {
    readonly input: IOrganizationDepartmentEditByEmployeeInput;
    static readonly type = "[OrganizationDepartment] Edit By Employee";
    constructor(input: IOrganizationDepartmentEditByEmployeeInput);
}
