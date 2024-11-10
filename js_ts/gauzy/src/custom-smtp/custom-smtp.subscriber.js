"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSmtpSubscriber = void 0;
const typeorm_1 = require("typeorm");
const decorators_1 = require("./../core/decorators");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
const custom_smtp_entity_1 = require("./custom-smtp.entity");
let CustomSmtpSubscriber = exports.CustomSmtpSubscriber = class CustomSmtpSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
    * Indicates that this subscriber only listen to CustomSmtp events.
    */
    listenTo() {
        return custom_smtp_entity_1.CustomSmtp;
    }
    /**
     * Processes a CustomSmtp entity after it's loaded.
     * This function sets the entity's secretKey and secretPassword based on its username and password, if they are present.
     *
     * @param entity The CustomSmtp entity that has been loaded.
     */
    async afterEntityLoad(entity) {
        try {
            if (entity.username) {
                entity.secretKey = entity.username;
            }
            if (entity.password) {
                entity.secretPassword = entity.password;
            }
            (0, decorators_1.WrapSecrets)(entity, entity); // Assuming wrapSecrets is a function to securely handle secrets.
        }
        catch (error) {
            console.error('CustomSmtpSubscriber: Error during the afterEntityLoad process:', error);
        }
    }
};
exports.CustomSmtpSubscriber = CustomSmtpSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], CustomSmtpSubscriber);
//# sourceMappingURL=custom-smtp.subscriber.js.map