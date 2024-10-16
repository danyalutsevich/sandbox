"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRegistrationEvent = void 0;
const base_event_1 = require("../base-event");
/**
 * Event class representing an account registration event.
 */
class AccountRegistrationEvent extends base_event_1.BaseEvent {
    ctx;
    user;
    /**
     * Constructor for AccountRegistrationEvent.
     * @param ctx - The request context associated with the registration event.
     * @param user - The user associated with the registration event.
     */
    constructor(ctx, user) {
        super();
        this.ctx = ctx;
        this.user = user;
    }
}
exports.AccountRegistrationEvent = AccountRegistrationEvent;
//# sourceMappingURL=account-registration-event.js.map