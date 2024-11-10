import { ICommand } from '@nestjs/cqrs';
import { IOrganizationTeamCreateInput } from '../../../plugins/contracts';
export declare class OrganizationTeamCreateCommand implements ICommand {
    readonly input: IOrganizationTeamCreateInput;
    static readonly type = "[Organization Team] Create";
    constructor(input: IOrganizationTeamCreateInput);
}
