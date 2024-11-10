import { TaskRelatedIssueType } from './related-issue-type.entity';
import { BaseEntityEventSubscriber } from '../../core/entities/subscribers/base-entity-event.subscriber';
export declare class TaskRelatedIssueTypeSubscriber extends BaseEntityEventSubscriber<TaskRelatedIssueType> {
    /**
     * Indicates that this subscriber only listen to TaskRelatedIssueType events.
     */
    listenTo(): typeof TaskRelatedIssueType;
    /**
     * Called after a TaskRelatedIssueType entity is loaded from the database. This method updates
     * the entity by setting the full icon URL if an icon is associated with the issue type.
     *
     * @param entity The TaskRelatedIssueType entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    afterEntityLoad(entity: TaskRelatedIssueType): Promise<void>;
    /**
     * Called before a TaskRelatedIssueType entity is inserted into the database. This method ensures
     * that default values for color and value properties are set.
     *
     * @param entity The TaskRelatedIssueType entity about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    beforeEntityCreate(entity: TaskRelatedIssueType): Promise<void>;
}
