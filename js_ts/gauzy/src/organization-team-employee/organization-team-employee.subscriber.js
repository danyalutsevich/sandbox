"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationTeamEmployeeSubscriber = void 0;
const typeorm_1 = require("typeorm");
const organization_team_employee_entity_1 = require("./organization-team-employee.entity");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
let OrganizationTeamEmployeeSubscriber = exports.OrganizationTeamEmployeeSubscriber = class OrganizationTeamEmployeeSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
    * Indicates that this subscriber only listen to OrganizationTeamEmployee events.
    */
    listenTo() {
        return organization_team_employee_entity_1.OrganizationTeamEmployee;
    }
    /**
     * Called after an OrganizationTeamEmployee entity is removed from the database. This method logs
     * an action indicating that the team member entity has been removed.
     *
     * @param entity The OrganizationTeamEmployee entity that was just deleted.
     * @returns {Promise<void>} A promise that resolves when the post-delete processing is complete.
     */
    async afterEntityDelete(entity) {
        try {
            if (entity.id) {
                console.log(`AFTER TEAM MEMBER ENTITY WITH ID ${entity.id} REMOVED`);
            }
        }
        catch (error) {
            console.error('OrganizationTeamEmployeeSubscriber: An error occurred during the afterEntityDelete process:', error);
        }
    }
};
exports.OrganizationTeamEmployeeSubscriber = OrganizationTeamEmployeeSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], OrganizationTeamEmployeeSubscriber);
//# sourceMappingURL=organization-team-employee.subscriber.js.map