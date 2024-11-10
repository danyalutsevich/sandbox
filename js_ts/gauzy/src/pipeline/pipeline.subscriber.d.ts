import { Pipeline } from "./pipeline.entity";
import { BaseEntityEventSubscriber } from "../core/entities/subscribers/base-entity-event.subscriber";
export declare class PipelineSubscriber extends BaseEntityEventSubscriber<Pipeline> {
    /**
    * Indicates that this subscriber only listen to Pipeline events.
    */
    listenTo(): typeof Pipeline;
    /**
     * Called after a Pipeline entity is loaded from the database. This method performs
     * additional operations defined in the __after_fetch method on the loaded entity.
     *
     * @param entity The Pipeline entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the post-load processing is complete.
     */
    afterEntityLoad(entity: Pipeline): Promise<void>;
    /**
     * Called before a Pipeline entity is inserted or created in the database. This method
     * assigns pipeline ID and an index to each stage in the pipeline.
     *
     * @param entity The Pipeline entity about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    beforeEntityCreate(entity: Pipeline): Promise<void>;
    /**
     * Called after a Pipeline entity is inserted into the database. This method performs
     * additional operations defined in the __after_fetch method on the newly created entity.
     *
     * @param entity The Pipeline entity that has been created.
     * @returns {Promise<void>} A promise that resolves when the post-creation processing is complete.
     */
    afterEntityCreate(entity: Pipeline): Promise<void>;
    /***
     * Internal method to be used after fetching the Pipeline entity.
     *
     * @param entity - The fetched Pipeline entity.
     */
    private __after_fetch;
}
