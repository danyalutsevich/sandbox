import { ICommand } from '@nestjs/cqrs';
import { IOrganizationTeam } from '../../../../plugins/contracts/dist/index';
export declare class OrganizationTeamTaskPriorityBulkCreateCommand implements ICommand {
    readonly input: IOrganizationTeam;
    static readonly type = "[Organization Team] Task Priority Bulk Create";
    constructor(input: IOrganizationTeam);
}
