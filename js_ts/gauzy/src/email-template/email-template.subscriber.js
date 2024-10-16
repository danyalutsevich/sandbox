"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateSubscriber = void 0;
const typeorm_1 = require("typeorm");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
const email_template_entity_1 = require("./email-template.entity");
let EmailTemplateSubscriber = exports.EmailTemplateSubscriber = class EmailTemplateSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
    * Indicates that this subscriber only listen to EmailTemplate events.
    */
    listenTo() {
        return email_template_entity_1.EmailTemplate;
    }
    /**
     * Called after entity is loaded from the database.
     *
     * @param entity
     */
    async afterEntityLoad(entity) {
        try {
            if (entity.name) {
                entity.title = entity.name.split('/')[0].split('-').join(' ');
            }
        }
        catch (error) {
            console.error('EmailTemplateSubscriber: Error during the afterEntityLoad process:', error);
        }
    }
};
exports.EmailTemplateSubscriber = EmailTemplateSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], EmailTemplateSubscriber);
//# sourceMappingURL=email-template.subscriber.js.map