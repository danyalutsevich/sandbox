import { IOrganizationCreateInput } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class OrganizationCreateCommand implements ICommand {
    readonly input: IOrganizationCreateInput;
    static readonly type = "[Organization] Create";
    constructor(input: IOrganizationCreateInput);
}
