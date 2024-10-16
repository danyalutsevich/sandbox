import { ICommandHandler } from '@nestjs/cqrs';
import { OrganizationDepartmentService } from '../../organization-department.service';
import { OrganizationDepartmentUpdateCommand } from '../organization-department.update.command';
export declare class OrganizationDepartmentUpdateHandler implements ICommandHandler<OrganizationDepartmentUpdateCommand> {
    private readonly organizationDepartmentService;
    constructor(organizationDepartmentService: OrganizationDepartmentService);
    execute(command: OrganizationDepartmentUpdateCommand): Promise<any>;
}
