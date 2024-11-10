"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationSettingSubscriber = void 0;
const typeorm_1 = require("typeorm");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
const integration_setting_entity_1 = require("./integration-setting.entity");
const integration_setting_utils_1 = require("./integration-setting.utils");
let IntegrationSettingSubscriber = exports.IntegrationSettingSubscriber = class IntegrationSettingSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
     * Indicates that this subscriber only listen to IntegrationSetting events.
     */
    listenTo() {
        return integration_setting_entity_1.IntegrationSetting;
    }
    /**
     * Called after an IntegrationSetting entity is loaded from the database. This method handles
     * sensitive information by partially masking it before presenting to the user.
     *
     * @param entity The IntegrationSetting entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the post-load processing is complete.
     */
    async afterEntityLoad(entity) {
        try {
            // Extract sensitive information from the entity
            const { settingsName, settingsValue } = entity;
            // Specify the percentage of the string to be replaced with the character
            const percentage = 25;
            if (integration_setting_utils_1.sensitiveSecretKeys.includes(settingsName) && typeof settingsValue === 'string') {
                // Create an object containing the sensitive data
                const secrets = {
                    [settingsName]: settingsValue,
                };
                // Apply the wrapping function only to the sensitive keys
                const wrapped = (0, integration_setting_utils_1.keysToWrapSecrets)(integration_setting_utils_1.sensitiveSecretKeys, secrets, percentage);
                entity.wrapSecretKey = settingsName;
                entity.wrapSecretValue = wrapped[settingsName];
            }
        }
        catch (error) {
            console.error('IntegrationSettingSubscriber: An error occurred during the afterEntityLoad process:', error);
        }
    }
};
exports.IntegrationSettingSubscriber = IntegrationSettingSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], IntegrationSettingSubscriber);
//# sourceMappingURL=integration-setting.subscriber.js.map