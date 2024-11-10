"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantSubscriber = void 0;
const typeorm_1 = require("typeorm");
const utils_1 = require("../core/utils");
const tenant_entity_1 = require("./tenant.entity");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
let TenantSubscriber = exports.TenantSubscriber = class TenantSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
    * Indicates that this subscriber only listen to Organization events.
    */
    listenTo() {
        return tenant_entity_1.Tenant;
    }
    /**
     * Executes after a Tenant entity is loaded. It updates the entity's logo
     * using `updateTenantLogo`. Errors during this process are logged.
     *
     * @param entity The loaded Tenant entity.
     * @returns {Promise<void>}
     */
    async afterEntityLoad(entity) {
        try {
            await this.updateTenantLogo(entity);
        }
        catch (error) {
            console.error('TenantSubscriber: An error occurred during the afterEntityLoad process:', error);
        }
    }
    /**
     * Invoked before creating a new Tenant entity. It sets or updates the logo
     * through `updateTenantLogo`. Errors are logged for troubleshooting.
     *
     * @param entity The Tenant entity to be created.
     */
    async beforeEntityCreate(entity) {
        try {
            await this.updateTenantLogo(entity);
        }
        catch (error) {
            console.error('TenantSubscriber: An error occurred during the beforeEntityCreate process:', error);
        }
    }
    /**
     * Called before a Tenant entity is updated in the database. This method updates
     * the tenant's logo as necessary before the actual database update occurs.
     *
     * @param entity The Tenant entity that is about to be updated.
     * @returns {Promise<void>} A promise that resolves when the pre-update processing is complete.
     */
    async beforeEntityUpdate(entity) {
        try {
            // Update the tenant's logo, if applicable
            await this.updateTenantLogo(entity);
        }
        catch (error) {
            console.error('TenantSubscriber: An error occurred during the beforeEntityUpdate process:', error);
        }
    }
    /**
     * Updates the logo for a Tenant entity.
     *
     * @param entity - The Tenant entity for which the logo is to be updated.
     * @returns A promise that resolves when the logo update is complete.
     */
    async updateTenantLogo(entity) {
        try {
            if (!entity.logo) {
                entity.logo = (0, utils_1.getTenantLogo)(entity.name);
            }
            if (!!entity['image']) {
                entity.logo = entity.image.fullUrl || entity.logo;
            }
        }
        catch (error) {
            console.error('TenantSubscriber: An error occurred during the updateTenantLogo process:', error);
        }
    }
};
exports.TenantSubscriber = TenantSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], TenantSubscriber);
//# sourceMappingURL=tenant.subscriber.js.map