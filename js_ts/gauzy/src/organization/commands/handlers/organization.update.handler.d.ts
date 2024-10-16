import { ICommandHandler } from '@nestjs/cqrs';
import { IOrganization } from '../../../../plugins/contracts/dist/index';
import { OrganizationService } from '../../organization.service';
import { OrganizationUpdateCommand } from '../organization.update.command';
export declare class OrganizationUpdateHandler implements ICommandHandler<OrganizationUpdateCommand> {
    private readonly organizationService;
    constructor(organizationService: OrganizationService);
    /**
     *
     * Executes the organization update operation.
     *
     * @param command This includes the organization's ID and the new data to be updated.
     * @returns A promise that resolves to the updated instance of IOrganization.
     */
    execute(command: OrganizationUpdateCommand): Promise<IOrganization>;
    /**
     * Updates an organization with the provided input data.
     *
     * @param id The unique identifier of the organization to be updated.
     * @param input The data to update the organization with.
     * @returns The updated organization.
     */
    private update;
}
