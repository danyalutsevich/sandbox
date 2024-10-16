import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { IOrganization } from '../../../../plugins/contracts/dist/index';
import { UserService } from '../../../user/user.service';
import { UserOrganizationService } from '../../../user-organization/user-organization.services';
import { OrganizationService } from '../../organization.service';
import { ContactService } from '../../../contact/contact.service';
import { OrganizationCreateCommand } from '../organization.create.command';
import { Organization } from './../../../core/entities/internal';
export declare class OrganizationCreateHandler implements ICommandHandler<OrganizationCreateCommand> {
    private readonly commandBus;
    private readonly organizationService;
    private readonly userOrganizationService;
    private readonly userService;
    private readonly contactService;
    constructor(commandBus: CommandBus, organizationService: OrganizationService, userOrganizationService: UserOrganizationService, userService: UserService, contactService: ContactService);
    /**
     * Asynchronously executes the process of creating a new organization, along with associated tasks such as
     * adding users to the organization, creating contact details, executing various update tasks, and handling import records.
     * This function encapsulates several steps, each responsible for a part of the organization creation process.
     *
     * @param command An instance of OrganizationCreateCommand, containing the input data and settings required to create the organization.
     * @returns A promise that resolves to an instance of IOrganization, representing the newly created organization.
     */
    execute(command: OrganizationCreateCommand): Promise<IOrganization>;
    /**
     * Executes various organization update tasks concurrently. This function
     * triggers several operations related to an organization, such as creating reports,
     * task statuses, task sizes, task priorities, issue types, and task settings.
     * These operations are executed in parallel. If any operation fails,
     * the error is caught and logged.
     *
     * @param organization An instance of the Organization class, representing the organization for which the update tasks are to be executed.
     * @param organizationId The unique identifier of the organization, used in some of the update tasks.
     * @returns Promise<void> This function returns a promise that resolves to void.
     */
    executeOrganizationUpdateTasks(organization: Organization): Promise<void>;
}
