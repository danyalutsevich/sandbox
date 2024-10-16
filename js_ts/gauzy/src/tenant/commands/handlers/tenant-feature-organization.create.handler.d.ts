import { ICommandHandler } from '@nestjs/cqrs';
import { IFeatureOrganization } from '../../../../plugins/contracts/dist/index';
import { FeatureOrganizationService } from './../../../feature/feature-organization.service';
import { TenantFeatureOrganizationCreateCommand } from '../tenant-feature-organization.create.command';
export declare class TenantFeatureOrganizationCreateHandler implements ICommandHandler<TenantFeatureOrganizationCreateCommand> {
    private readonly _featureOrganizationService;
    constructor(_featureOrganizationService: FeatureOrganizationService);
    /**
     * Executes the TenantFeatureOrganizationCreateCommand. This method takes the command,
     * extracts the necessary input data, and passes it to the _featureOrganizationService
     * for processing. The service is responsible for creating or updating feature organizations
     * for tenants based on the provided input.
     *
     * @param command An instance of TenantFeatureOrganizationCreateCommand containing tenant and feature organization data.
     * @returns A Promise that resolves to an array of IFeatureOrganization, representing the updated or created feature organizations.
     */
    execute(command: TenantFeatureOrganizationCreateCommand): Promise<IFeatureOrganization[]>;
}
