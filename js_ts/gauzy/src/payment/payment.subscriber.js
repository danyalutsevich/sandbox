"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSubscriber = void 0;
const typeorm_1 = require("typeorm");
const context_1 = require("./../core/context");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
const payment_entity_1 = require("./payment.entity");
let PaymentSubscriber = exports.PaymentSubscriber = class PaymentSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
    * Indicates that this subscriber only listen to Payment events.
    */
    listenTo() {
        return payment_entity_1.Payment;
    }
    /**
     * Called before a Payment entity is inserted or created in the database. This method assigns
     * the ID of the current user to the recordedById property of the entity, tracking who created the payment.
     *
     * @param entity The Payment entity about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    async beforeEntityCreate(entity) {
        try {
            // Assign the current user's ID to recordedById
            entity.recordedById = context_1.RequestContext.currentUserId();
        }
        catch (error) {
            console.error('Error in PaymentSubscriber beforeEntityCreate:', error.message);
        }
    }
};
exports.PaymentSubscriber = PaymentSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], PaymentSubscriber);
//# sourceMappingURL=payment.subscriber.js.map