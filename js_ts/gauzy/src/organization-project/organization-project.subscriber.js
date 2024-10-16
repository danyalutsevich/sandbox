"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationProjectSubscriber = void 0;
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/config/dist/index");
const utils_1 = require("./../core/utils");
const organization_project_entity_1 = require("./organization-project.entity");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
const entity_event_subscriber_types_1 = require("../core/entities/subscribers/entity-event-subscriber.types");
const database_helper_1 = require("../database/database.helper");
let OrganizationProjectSubscriber = exports.OrganizationProjectSubscriber = class OrganizationProjectSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
    * Indicates that this subscriber only listen to OrganizationProject events.
    */
    listenTo() {
        return organization_project_entity_1.OrganizationProject;
    }
    /**
     * Called after an OrganizationProject entity is loaded from the database. This method updates
     * the entity by setting the image URL if an associated image with a full URL is present.
     *
     * @param entity The OrganizationProject entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    async afterEntityLoad(entity) {
        try {
            // Check if the image is present and has a fullUrl
            if (entity.image && entity.image.fullUrl) {
                entity.imageUrl = entity.image.fullUrl;
            }
        }
        catch (error) {
            console.error('OrganizationProjectSubscriber: An error occurred during the afterEntityLoad process:', error.message);
        }
    }
    /**
     * Called before an OrganizationProject entity is inserted or created in the database.
     * This method sets initial values and prepares the entity for creation.
     *
     * @param entity The OrganizationProject entity about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    async beforeEntityCreate(entity) {
        try {
            // Generate a dummy image URL based on the first two initials of the name, if imageUrl is not provided
            if (!entity.imageUrl && entity.name) {
                const initials = entity.name.toLowerCase().split(' ').slice(0, 2).map((elem) => elem.charAt(0)).join('');
                entity.imageUrl = (0, utils_1.getDummyImage)(330, 300, initials.toUpperCase());
            }
        }
        catch (error) {
            console.error('OrganizationProjectSubscriber: An error occurred during the beforeEntityCreate process:', error.message);
        }
    }
    /**
     * Called after an OrganizationProject entity is created in the database. This method updates
     * the members count of the project.
     *
     * @param entity The OrganizationProject entity that was just created.
     * @param em An optional entity manager which can be either from TypeORM or MikroORM.
     * @returns {Promise<void>} A promise that resolves when the post-creation processing is complete.
     */
    async afterEntityCreate(entity, em) {
        try {
            await this.updateProjectMembersCount(entity, em);
        }
        catch (error) {
            console.error('OrganizationProjectSubscriber: An error occurred during the afterEntityCreate process:', error.message);
        }
    }
    /**
     * Called after an OrganizationProject entity is updated in the database. This method is responsible
     * for updating the project's members count to reflect any changes made to the entity.
     *
     * @param entity The OrganizationProject entity that was just updated.
     * @param em An optional entity manager which can be either from TypeORM or MikroORM. It provides the
     *           necessary context for database operations.
     * @returns {Promise<void>} A promise that resolves when the post-update processing is complete.
     */
    async afterEntityUpdate(entity, em) {
        try {
            await this.updateProjectMembersCount(entity, em);
        }
        catch (error) {
            console.error('OrganizationProjectSubscriber: An error occurred during the afterEntityUpdate process:', error.message);
        }
    }
    /**
     * Updates the members count of an OrganizationProject entity.
     *
     * @param entity The OrganizationProject entity for which the member count is to be updated.
     * @param em An optional entity manager which can be either from TypeORM or MikroORM.
     * @returns {Promise<void>} A promise that resolves when the members count update is complete.
     */
    async updateProjectMembersCount(entity, em) {
        try {
            if (!em) {
                return;
            }
            const { organizationId, tenantId, id: projectId } = entity;
            let query = (0, database_helper_1.prepareSQLQuery)(`
                SELECT COUNT(*) AS count FROM organization_project_employee
                INNER JOIN organization_project
                    ON "organization_project"."id" = "organization_project_employee"."organizationProjectId"
                WHERE
                    "organization_project_employee"."organizationProjectId" = $1 AND
                    "organization_project"."organizationId" = $2 AND
                    "organization_project"."tenantId" = $3
            `);
            let updateQuery = (0, database_helper_1.prepareSQLQuery)(`UPDATE "organization_project" SET "membersCount" = $1 WHERE "id" = $2 AND "organizationId" = $3 AND "tenantId" = $4`);
            //
            switch ((0, index_1.getConfig)().dbConnectionOptions.type) {
                case index_1.DatabaseTypeEnum.mysql:
                case index_1.DatabaseTypeEnum.sqlite:
                case index_1.DatabaseTypeEnum.betterSqlite3:
                    // Replace $ placeholders with ? for mysql, sqlite & better-sqlite3
                    query = query.replace(/\$\d/g, '?');
                    updateQuery = updateQuery.replace(/\$\d/g, '?');
                    break;
                default:
                    break;
            }
            let totalMembers = 0;
            // Handle TypeORM specific logic
            if (em instanceof entity_event_subscriber_types_1.TypeOrmEntityManager) {
                const result = await em.query(query, [projectId, organizationId, tenantId]);
                // Extract count from result - the structure of this may vary based on the database and driver
                totalMembers = parseInt(result[0]?.count ?? 0, 10);
            }
            // Handle MikroORM specific logic
            else if (em instanceof entity_event_subscriber_types_1.MikroOrmEntityManager) {
                // Replace $ placeholders with ? for MikroORM
                query = query.replace(/\$\d/g, '?');
                const result = await em.getConnection().execute(query, [projectId, organizationId, tenantId]);
                totalMembers = parseInt(result[0]?.count ?? 0, 10);
            }
            // Update members count in both TypeORM and MikroORM
            if (totalMembers >= 0) {
                // Common update logic for both ORMs
                if (em instanceof entity_event_subscriber_types_1.TypeOrmEntityManager) {
                    await em.query(updateQuery, [totalMembers, projectId, organizationId, tenantId]);
                }
                else if (em instanceof entity_event_subscriber_types_1.MikroOrmEntityManager) {
                    // Replace $ placeholders with ? for MikroORM
                    updateQuery = updateQuery.replace(/\$\d/g, '?');
                    await em.getConnection().execute(updateQuery, [totalMembers, projectId, organizationId, tenantId]);
                }
            }
        }
        catch (error) {
            console.error('OrganizationProjectSubscriber: An error occurred during the updateProjectMembersCount process:', error);
        }
    }
};
exports.OrganizationProjectSubscriber = OrganizationProjectSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], OrganizationProjectSubscriber);
//# sourceMappingURL=organization-project.subscriber.js.map