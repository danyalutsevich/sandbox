import { IOrganizationDepartmentCreateInput } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class OrganizationDepartmentUpdateCommand implements ICommand {
    readonly id: string;
    readonly input: IOrganizationDepartmentCreateInput;
    static readonly type = "[OrganizationDepartment] Update";
    constructor(id: string, input: IOrganizationDepartmentCreateInput);
}
