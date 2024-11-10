"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailResetSubscriber = void 0;
const typeorm_1 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
const index_1 = require("../../plugins/config/dist/index");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
const email_reset_entity_1 = require("./email-reset.entity");
let EmailResetSubscriber = exports.EmailResetSubscriber = class EmailResetSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
     * Indicates that this subscriber only listen to EmailReset events.
     */
    listenTo() {
        return email_reset_entity_1.EmailReset;
    }
    /**
     * Called after entity is loaded from the database.
     *
     * @param entity
     */
    async afterEntityLoad(entity) {
        try {
            if ('expiredAt' in entity) {
                entity.isExpired = entity.expiredAt ? (0, moment_1.default)(entity.expiredAt).isBefore((0, moment_1.default)()) : false;
            }
        }
        catch (error) {
            console.error('EmailResetSubscriber: Error during the afterEntityLoad process:', error);
        }
    }
    /**
     * Called before entity is inserted/created to the database.
     *
     * @param entity
     */
    async beforeEntityCreate(entity) {
        try {
            if (entity) {
                entity.expiredAt = (0, moment_1.default)(new Date()).add(index_1.environment.EMAIL_RESET_EXPIRATION_TIME, 'seconds').toDate();
            }
        }
        catch (error) {
            console.error('EmailResetSubscriber: Error during the beforeEntityCreate process:', error);
        }
    }
};
exports.EmailResetSubscriber = EmailResetSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], EmailResetSubscriber);
//# sourceMappingURL=email-reset.subscriber.js.map