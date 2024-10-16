import { ICommand } from '@nestjs/cqrs';
import { IEditEntityByMemberInput as IOrganizationDepartmentEditByEmployeeInput } from '../../../plugins/contracts';
export declare class OrganizationContactEditByEmployeeCommand implements ICommand {
    readonly input: IOrganizationDepartmentEditByEmployeeInput;
    static readonly type = "[OrganizationContact] Edit By Employee";
    constructor(input: IOrganizationDepartmentEditByEmployeeInput);
}
