import { RequestContext } from '../../core/context';
import { User } from '../../core/entities/internal';
import { BaseEvent } from '../base-event';
/**
 * Event class representing an account verification event.
 */
export declare class AccountVerifiedEvent extends BaseEvent {
    readonly ctx: RequestContext;
    readonly user: User;
    /**
     * Constructor for AccountVerifiedEvent.
     * @param ctx - The request context associated with the verification event.
     * @param user - The user associated with the verification event.
     */
    constructor(ctx: RequestContext, user: User);
}
