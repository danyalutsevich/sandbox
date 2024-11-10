import { RequestContext } from '../../core/context';
import { User } from '../../core/entities/internal';
import { BaseEvent } from '../base-event';
/**
 * Event class representing an account registration event.
 */
export declare class AccountRegistrationEvent extends BaseEvent {
    readonly ctx: RequestContext;
    readonly user: User;
    /**
     * Constructor for AccountRegistrationEvent.
     * @param ctx - The request context associated with the registration event.
     * @param user - The user associated with the registration event.
     */
    constructor(ctx: RequestContext, user: User);
}
