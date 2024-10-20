"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountVerifiedHandler = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const event_bus_1 = require("../../event-bus");
const account_verified_event_1 = require("../account-verified-event");
let AccountVerifiedHandler = exports.AccountVerifiedHandler = class AccountVerifiedHandler {
    eventBus;
    subscription;
    constructor(eventBus) {
        this.eventBus = eventBus;
    }
    onModuleInit() {
        const event$ = this.eventBus.ofType(account_verified_event_1.AccountVerifiedEvent);
        this.subscription = event$.pipe((0, rxjs_1.tap)((event) => this.execute(event))).subscribe();
    }
    /**
     * Handles the account verification event.
     * @param event The event containing the verification details.
     */
    async execute(event) {
        try {
            // Perform any necessary actions with the event data
            const { ctx, user } = event;
            // Log the successful handling of the event
            console.log(`Account Verified Successfully: ${user.name} : ${ctx.id}`);
        }
        catch (error) {
            // Handle any errors that occur during event handling
            console.error('Error handling during account verified event:', error);
        }
    }
    onModuleDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
};
exports.AccountVerifiedHandler = AccountVerifiedHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_bus_1.EventBus])
], AccountVerifiedHandler);
//# sourceMappingURL=account-verified-handler.js.map