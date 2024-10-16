"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountVerifiedEvent = void 0;
const base_event_1 = require("../base-event");
/**
 * Event class representing an account verification event.
 */
class AccountVerifiedEvent extends base_event_1.BaseEvent {
    ctx;
    user;
    /**
     * Constructor for AccountVerifiedEvent.
     * @param ctx - The request context associated with the verification event.
     * @param user - The user associated with the verification event.
     */
    constructor(ctx, user) {
        super();
        this.ctx = ctx;
        this.user = user;
    }
}
exports.AccountVerifiedEvent = AccountVerifiedEvent;
//# sourceMappingURL=account-verified-event.js.map