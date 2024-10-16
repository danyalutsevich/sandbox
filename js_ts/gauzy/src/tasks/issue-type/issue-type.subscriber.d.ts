import { BaseEntityEventSubscriber } from '../../core/entities/subscribers/base-entity-event.subscriber';
import { IssueType } from './issue-type.entity';
export declare class IssueTypeSubscriber extends BaseEntityEventSubscriber<IssueType> {
    /**
     * Indicates that this subscriber only listen to IssueType events.
     */
    listenTo(): typeof IssueType;
    /**
     * Called after an IssueType entity is loaded from the database. This method updates
     * the entity by setting the full icon URL using the FileStorage provider.
     *
     * @param entity The IssueType entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    afterEntityLoad(entity: IssueType): Promise<void>;
    /**
     * Called before an IssueType entity is inserted into the database. This method sets default
     * values and prepares the entity for creation.
     *
     * @param entity The IssueType entity that is about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    beforeEntityCreate(entity: IssueType): Promise<void>;
}
