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
exports.AccountRegistrationHandler = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const event_bus_1 = require("../../event-bus");
const account_registration_event_1 = require("../account-registration-event");
let AccountRegistrationHandler = exports.AccountRegistrationHandler = class AccountRegistrationHandler {
    eventBus;
    subscription;
    constructor(eventBus) {
        this.eventBus = eventBus;
    }
    onModuleInit() {
        const event$ = this.eventBus.ofType(account_registration_event_1.AccountRegistrationEvent);
        this.subscription = event$.pipe((0, rxjs_1.tap)((event) => this.execute(event))).subscribe();
    }
    /**
     * Handles the account registration event.
     * @param event The event containing the registration details.
     */
    async execute(event) {
        try {
            // Perform any necessary actions with the event data
            const { ctx, user } = event;
            // Log the successful handling of the event
            console.log(`Account Registered Successfully: ${user.name} : ${ctx.id}`);
        }
        catch (error) {
            // Handle any errors that occur during event handling
            console.error('Error handling during account registered event:', error);
        }
    }
    onModuleDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
};
exports.AccountRegistrationHandler = AccountRegistrationHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_bus_1.EventBus])
], AccountRegistrationHandler);
//# sourceMappingURL=account-registration-handler.js.map