import { ICommand } from '@nestjs/cqrs';
import { IOrganizationTeam } from '../../../../plugins/contracts/dist/index';
export declare class OrganizationTeamIssueTypeBulkCreateCommand implements ICommand {
    readonly input: IOrganizationTeam;
    static readonly type = "[Organization Team] Issue Type Bulk Create";
    constructor(input: IOrganizationTeam);
}
