import { IOrganizationVendorCreateInput, IOrganizationVendorFindInput } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class OrganizationVendorFirstOrCreateCommand implements ICommand {
    readonly input: IOrganizationVendorCreateInput | IOrganizationVendorFindInput;
    static readonly type = "[OrganizationVendor] First Or Create";
    constructor(input: IOrganizationVendorCreateInput | IOrganizationVendorFindInput);
}
