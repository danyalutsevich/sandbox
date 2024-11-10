import { ICommandHandler } from '@nestjs/cqrs';
import { EventTypeCreateCommand } from '../event-type.create.command';
import { EventType } from '../../event-type.entity';
import { EventTypeService } from '../../event-type.service';
import { EmployeeService } from '../../../employee/employee.service';
import { OrganizationService } from '../../../organization/organization.service';
export declare class EventTypeCreateHandler implements ICommandHandler<EventTypeCreateCommand> {
    private readonly eventTypeService;
    private readonly employeeService;
    private readonly organizationService;
    constructor(eventTypeService: EventTypeService, employeeService: EmployeeService, organizationService: OrganizationService);
    execute(command: EventTypeCreateCommand): Promise<EventType>;
}
