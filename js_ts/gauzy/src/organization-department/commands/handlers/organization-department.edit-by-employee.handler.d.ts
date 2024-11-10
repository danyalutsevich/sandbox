import { ICommandHandler } from '@nestjs/cqrs';
import { OrganizationDepartmentEditByEmployeeCommand } from '../organization-department.edit-by-employee.command';
import { OrganizationDepartmentService } from '../../organization-department.service';
import { UpdateEntityByMembersHandler } from '../../../shared/handlers';
export declare class OrganizationDepartmentEditByEmployeeHandler extends UpdateEntityByMembersHandler implements ICommandHandler<OrganizationDepartmentEditByEmployeeCommand> {
    protected readonly organizationDepartmentService: OrganizationDepartmentService;
    constructor(organizationDepartmentService: OrganizationDepartmentService);
    execute(command: OrganizationDepartmentEditByEmployeeCommand): Promise<any>;
}
