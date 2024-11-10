import { ICommandHandler } from '@nestjs/cqrs';
import { IOrganizationVendor } from '../../../../plugins/contracts/dist/index';
import { OrganizationVendorFirstOrCreateCommand } from './../organization-vendor-first-or-create.command';
import { OrganizationVendorService } from './../../organization-vendor.service';
export declare class OrganizationVendorFirstOrCreateHandler implements ICommandHandler<OrganizationVendorFirstOrCreateCommand> {
    private readonly _organizationVendorService;
    constructor(_organizationVendorService: OrganizationVendorService);
    execute(command: OrganizationVendorFirstOrCreateCommand): Promise<IOrganizationVendor>;
}
