import { ICommandHandler } from '@nestjs/cqrs';
import { UpdateEntityByMembersHandler } from '../../../shared/handlers';
import { OrganizationContactService } from '../../organization-contact.service';
import { OrganizationContactEditByEmployeeCommand } from '../organization-contact.edit-by-employee.command';
export declare class OrganizationContactEditByEmployeeHandler extends UpdateEntityByMembersHandler implements ICommandHandler<OrganizationContactEditByEmployeeCommand> {
    protected readonly organizationContactService: OrganizationContactService;
    constructor(organizationContactService: OrganizationContactService);
    execute(command: OrganizationContactEditByEmployeeCommand): Promise<any>;
}
