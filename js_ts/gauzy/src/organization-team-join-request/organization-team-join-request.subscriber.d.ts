import { BaseEntityEventSubscriber } from '../core/entities/subscribers/base-entity-event.subscriber';
import { OrganizationTeamJoinRequest } from './organization-team-join-request.entity';
export declare class OrganizationTeamJoinRequestSubscriber extends BaseEntityEventSubscriber<OrganizationTeamJoinRequest> {
    /**
     * Indicates that this subscriber only listen to OrganizationTeamJoinRequest events.
     */
    listenTo(): typeof OrganizationTeamJoinRequest;
    /**
     * Called after an OrganizationTeamJoinRequest entity is loaded from the database. This method checks
     * if the join request is expired based on the 'expiredAt' property and sets the 'isExpired' flag accordingly.
     *
     * @param entity The OrganizationTeamJoinRequest entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the post-load processing is complete.
     */
    afterEntityLoad(entity: OrganizationTeamJoinRequest): Promise<void>;
    /**
     * Called before an OrganizationTeamJoinRequest entity is inserted into the database. This method sets
     * the expiration date for the join request based on a predefined interval.
     *
     * @param entity The OrganizationTeamJoinRequest entity about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    beforeEntityCreate(entity: OrganizationTeamJoinRequest): Promise<void>;
}
