import { IQueryHandler } from '@nestjs/cqrs';
import { InviteService } from '../../invite.service';
import { FindInviteByEmailTokenQuery } from '../find-invite-by-email-token.query';
export declare class FindInviteByEmailTokenHandler implements IQueryHandler<FindInviteByEmailTokenQuery> {
    private readonly inviteService;
    constructor(inviteService: InviteService);
    execute(query: FindInviteByEmailTokenQuery): Promise<import("../../../../plugins/contracts/dist").IInvite>;
}
