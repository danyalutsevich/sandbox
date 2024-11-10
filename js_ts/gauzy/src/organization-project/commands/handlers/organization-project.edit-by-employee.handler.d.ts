import { ICommandHandler } from '@nestjs/cqrs';
import { UpdateEntityByMembersHandler } from '../../../shared/handlers';
import { OrganizationProjectService } from '../../organization-project.service';
import { OrganizationProjectEditByEmployeeCommand } from '../organization-project.edit-by-employee.command';
export declare class OrganizationProjectEditByEmployeeHandler extends UpdateEntityByMembersHandler implements ICommandHandler<OrganizationProjectEditByEmployeeCommand> {
    protected readonly organizationProjectService: OrganizationProjectService;
    constructor(organizationProjectService: OrganizationProjectService);
    execute(command: OrganizationProjectEditByEmployeeCommand): Promise<any>;
}
