import { ICommandHandler } from '@nestjs/cqrs';
import { InviteService } from './../../invite.service';
import { InviteBulkCreateCommand } from './../invite.bulk.create.command';
export declare class InviteBulkCreateHandler implements ICommandHandler<InviteBulkCreateCommand> {
    private readonly inviteService;
    constructor(inviteService: InviteService);
    execute(command: InviteBulkCreateCommand): Promise<import("../../../../plugins/contracts/dist").ICreateEmailInvitesOutput>;
}
