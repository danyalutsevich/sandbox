import { BaseEntityEventSubscriber } from '../core/entities/subscribers/base-entity-event.subscriber';
import { OrganizationTeam } from './organization-team.entity';
export declare class OrganizationTeamSubscriber extends BaseEntityEventSubscriber<OrganizationTeam> {
    /**
     * Indicates that this subscriber only listen to OrganizationTeam events.
     */
    listenTo(): typeof OrganizationTeam;
    /**
     * Called after an OrganizationTeam entity is loaded from the database. This method updates
     * the entity by setting the prefix and updating the logo URL if an image is available.
     *
     * @param entity The OrganizationTeam entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the post-load processing is complete.
     */
    afterEntityLoad(entity: OrganizationTeam): Promise<void>;
    /**
     * Called before an OrganizationTeam entity is inserted into the database. This method sets the
     * creator ID, generates a slug for the profile link, and assigns a default logo if necessary.
     *
     * @param entity The OrganizationTeam entity about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-insertion processing is complete.
     */
    beforeEntityCreate(entity: OrganizationTeam): Promise<void>;
    /**
     * Called before an OrganizationTeam entity is updated in the database. This method updates
     * the slug for the profile link based on the team's name.
     *
     * @param entity The OrganizationTeam entity that is about to be updated.
     * @returns {Promise<void>} A promise that resolves when the pre-update processing is complete.
     */
    beforeEntityUpdate(entity: OrganizationTeam): Promise<void>;
}
