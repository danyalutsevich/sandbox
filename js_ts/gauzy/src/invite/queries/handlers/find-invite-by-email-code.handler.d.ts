import { IQueryHandler } from '@nestjs/cqrs';
import { InviteService } from './../../invite.service';
import { FindInviteByEmailCodeQuery } from '../find-invite-by-email-code.query';
export declare class FindInviteByEmailCodeHandler implements IQueryHandler<FindInviteByEmailCodeQuery> {
    private readonly inviteService;
    constructor(inviteService: InviteService);
    execute(query: FindInviteByEmailCodeQuery): Promise<import("../../../../plugins/contracts/dist").IInvite>;
}
