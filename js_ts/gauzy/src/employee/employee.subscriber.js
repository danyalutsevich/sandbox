"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSubscriber = void 0;
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/common/dist/index");
const employee_entity_1 = require("./employee.entity");
const utils_1 = require("../core/utils");
const internal_1 = require("../core/entities/internal");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
const entity_event_subscriber_types_1 = require("../core/entities/subscribers/entity-event-subscriber.types");
let EmployeeSubscriber = exports.EmployeeSubscriber = class EmployeeSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
     * Indicates that this subscriber only listen to Employee events.
     */
    listenTo() {
        return employee_entity_1.Employee;
    }
    /**
     * Called after an Employee entity is loaded from the database.
     *
     * @param entity - The loaded Employee entity.
     * @param event - The LoadEvent associated with the entity loading.
     */
    async afterEntityLoad(entity) {
        try {
            // Set fullName from the associated user's name, if available
            if (entity.user) {
                entity.fullName = entity.user.name;
            }
            // Set isDeleted to true if the deletedAt property is present and not null
            if ('deletedAt' in entity) {
                entity.isDeleted = !!entity.deletedAt;
            }
            // Default billRateValue to 0 if it's not set
            if ('billRateValue' in entity) {
                entity.billRateValue = entity.billRateValue || 0;
            }
        }
        catch (error) {
            // Handle or log the error as needed
            console.error('EmployeeSubscriber: An error occurred during the afterEntityLoad process:', error.message);
        }
    }
    /**
     * Called before entity is inserted/created to the database.
     *
     * @param entity
     */
    async beforeEntityCreate(entity) {
        try {
            if (entity.user) {
                await this.createSlug(entity);
            }
            // Set a default avatar image if none is provided
            if (!entity.user.imageUrl) {
                entity.user.imageUrl = (0, utils_1.getUserDummyImage)(entity.user);
            }
            //
            this.updateEmployeeStatus(entity);
        }
        catch (error) {
            console.error('EmployeeSubscriber: An error occurred during the beforeEntityCreate process:', error.message);
        }
    }
    /**
     * Called before the entity is updated in the database.
     *
     * @param entity - The employee entity to be updated.
     */
    async beforeEntityUpdate(entity) {
        try {
            this.updateEmployeeStatus(entity);
        }
        catch (error) {
            console.error('EmployeeSubscriber: An error occurred during the beforeEntityUpdate process:', error.message);
        }
    }
    /**
     * Called after entity is inserted/created to the database.
     *
     * @param entity
     * @param em
     */
    async afterEntityCreate(entity, em) {
        try {
            if (entity) {
                await this.calculateTotalEmployees(entity, em);
            }
        }
        catch (error) {
            console.error('EmployeeSubscriber: An error occurred during the afterEntityCreate process:', error.message);
        }
    }
    /**
     * Called after entity is removed from the database.
     *
     * @param entity
     * @param em
     */
    async afterEntityDelete(entity, em) {
        try {
            if (entity) {
                await this.calculateTotalEmployees(entity, em);
            }
        }
        catch (error) {
            console.error('EmployeeSubscriber: An error occurred during the afterEntityDelete process:', error);
        }
    }
    /**
     * Creates a slug for an Employee entity based on the associated User's information.
     * The slug is generated using the first and last name, username, or email, in that order of preference.
     *
     * @param {Employee} entity - The Employee entity for which to create the slug.
     * @throws {Error} If neither entity nor entity.user is defined, or if slug creation fails.
     */
    async createSlug(entity) {
        try {
            if (!entity || !entity.user) {
                console.error('Entity or User object is not defined.');
                return;
            }
            const { firstName, lastName, username, email } = entity.user;
            if (firstName || lastName) {
                // Use first &/or last name to create slug
                entity.profile_link = (0, index_1.sluggable)(`${firstName || ''} ${lastName || ''}`.trim());
            }
            else if (username) {
                // Use username to create slug if first & last name not found
                entity.profile_link = (0, index_1.sluggable)(username);
            }
            else {
                // Use email to create slug if nothing found
                entity.profile_link = (0, index_1.sluggable)((0, index_1.retrieveNameFromEmail)(email));
            }
        }
        catch (error) {
            console.error(`EmployeeSubscriber: Error creating slug for entity with id ${entity.id}: `, error);
        }
    }
    /**
     * Calculates and updates the total number of employees for an organization.
     * Handles both TypeORM and MikroORM environments.
     *
     * @param entity The employee entity with organizationId and tenantId.
     * @param em The entity manager, either TypeORM's or MikroORM's.
     */
    async calculateTotalEmployees(entity, em) {
        try {
            const { organizationId, tenantId } = entity;
            // Handle TypeORM specific logic
            if (em instanceof entity_event_subscriber_types_1.TypeOrmEntityManager) {
                const totalEmployees = await em.countBy(employee_entity_1.Employee, { organizationId, tenantId });
                await em.update(internal_1.Organization, { id: organizationId, tenantId }, { totalEmployees });
            }
            // Handle MikroORM specific logic
            else if (em instanceof entity_event_subscriber_types_1.MikroOrmEntityManager) {
                const totalEmployees = await em.count(employee_entity_1.Employee, { organizationId, tenantId });
                await em.nativeUpdate(internal_1.Organization, { id: organizationId, tenantId }, { totalEmployees });
            }
        }
        catch (error) {
            console.error('EmployeeSubscriber: Error while updating total employee count of the organization:', error);
        }
    }
    /**
     * Updates the employee's status based on the start and end work dates.
     *
     * @param entity - The employee entity to be updated.
     */
    updateEmployeeStatus(entity) {
        if (entity.startedWorkOn) {
            this.setEmployeeStatus(entity, true, false);
            entity.endWork = null; // Ensure end work date is cleared
        }
        if (entity.endWork) {
            this.setEmployeeStatus(entity, false, true);
        }
    }
    /**
     * Sets the employee's status flags.
     *
     * @param entity - The employee entity.
     * @param isActive - The active status of the employee.
     * @param isArchived - The archived status of the employee.
     */
    setEmployeeStatus(entity, isActive, isArchived) {
        entity.isTrackingEnabled = isActive;
        entity.allowScreenshotCapture = isActive;
        entity.isActive = isActive;
        entity.isArchived = isArchived;
    }
};
exports.EmployeeSubscriber = EmployeeSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], EmployeeSubscriber);
//# sourceMappingURL=employee.subscriber.js.map