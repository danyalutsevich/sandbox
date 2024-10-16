"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceSubscriber = void 0;
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = require("jsonwebtoken");
const index_1 = require("../../plugins/config/dist/index");
const invoice_entity_1 = require("./invoice.entity");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
const entity_event_subscriber_types_1 = require("../core/entities/subscribers/entity-event-subscriber.types");
let InvoiceSubscriber = exports.InvoiceSubscriber = class InvoiceSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
    * Indicates that this subscriber only listen to Invoice events.
    */
    listenTo() {
        return invoice_entity_1.Invoice;
    }
    /**
     * Called after an Invoice entity is created in the database. This method updates
     * the entity by setting a generated token.
     *
     * @param entity The newly created Invoice entity.
     * @param em An optional entity manager which can be either from TypeORM or MikroORM.
     *           Used for executing the update operation.
     * @returns {Promise<void>} A promise that resolves when the update operation is complete.
     */
    async afterEntityCreate(entity, em) {
        try {
            const payload = {
                id: entity.id,
                organizationId: entity.organizationId,
                tenantId: entity.tenantId
            };
            const token = this.createToken(payload);
            // Update the Invoice entity with the generated token
            if (em instanceof entity_event_subscriber_types_1.TypeOrmEntityManager) {
                await em.update(invoice_entity_1.Invoice, { id: entity.id }, { token });
            }
            else if (em instanceof entity_event_subscriber_types_1.MikroOrmEntityManager) {
                await em.nativeUpdate(invoice_entity_1.Invoice, { id: entity.id }, { token });
            }
        }
        catch (error) {
            console.error('InvoiceSubscriber: Error during the afterEntityCreate process:', error);
        }
    }
    /**
     * Generate a public invoice token.
     *
     * @param payload The data to be encoded in the JWT.
     * @returns The generated JWT string.
     */
    createToken(payload) {
        const token = (0, jsonwebtoken_1.sign)(payload, index_1.environment.JWT_SECRET, {});
        return token;
    }
};
exports.InvoiceSubscriber = InvoiceSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], InvoiceSubscriber);
//# sourceMappingURL=invoice.subscriber.js.map