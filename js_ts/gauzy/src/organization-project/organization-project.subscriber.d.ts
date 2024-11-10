import { OrganizationProject } from "./organization-project.entity";
import { BaseEntityEventSubscriber } from "../core/entities/subscribers/base-entity-event.subscriber";
import { MultiOrmEntityManager } from "../core/entities/subscribers/entity-event-subscriber.types";
export declare class OrganizationProjectSubscriber extends BaseEntityEventSubscriber<OrganizationProject> {
    /**
    * Indicates that this subscriber only listen to OrganizationProject events.
    */
    listenTo(): typeof OrganizationProject;
    /**
     * Called after an OrganizationProject entity is loaded from the database. This method updates
     * the entity by setting the image URL if an associated image with a full URL is present.
     *
     * @param entity The OrganizationProject entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    afterEntityLoad(entity: OrganizationProject): Promise<void>;
    /**
     * Called before an OrganizationProject entity is inserted or created in the database.
     * This method sets initial values and prepares the entity for creation.
     *
     * @param entity The OrganizationProject entity about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    beforeEntityCreate(entity: OrganizationProject): Promise<void>;
    /**
     * Called after an OrganizationProject entity is created in the database. This method updates
     * the members count of the project.
     *
     * @param entity The OrganizationProject entity that was just created.
     * @param em An optional entity manager which can be either from TypeORM or MikroORM.
     * @returns {Promise<void>} A promise that resolves when the post-creation processing is complete.
     */
    afterEntityCreate(entity: OrganizationProject, em?: MultiOrmEntityManager): Promise<void>;
    /**
     * Called after an OrganizationProject entity is updated in the database. This method is responsible
     * for updating the project's members count to reflect any changes made to the entity.
     *
     * @param entity The OrganizationProject entity that was just updated.
     * @param em An optional entity manager which can be either from TypeORM or MikroORM. It provides the
     *           necessary context for database operations.
     * @returns {Promise<void>} A promise that resolves when the post-update processing is complete.
     */
    afterEntityUpdate(entity: OrganizationProject, em?: MultiOrmEntityManager): Promise<void>;
    /**
     * Updates the members count of an OrganizationProject entity.
     *
     * @param entity The OrganizationProject entity for which the member count is to be updated.
     * @param em An optional entity manager which can be either from TypeORM or MikroORM.
     * @returns {Promise<void>} A promise that resolves when the members count update is complete.
     */
    updateProjectMembersCount(entity: OrganizationProject, em?: MultiOrmEntityManager): Promise<void>;
}
