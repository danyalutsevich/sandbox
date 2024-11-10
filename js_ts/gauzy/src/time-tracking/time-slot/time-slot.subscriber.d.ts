import { TimeSlot } from "./time-slot.entity";
import { BaseEntityEventSubscriber } from "../../core/entities/subscribers/base-entity-event.subscriber";
export declare class TimeSlotSubscriber extends BaseEntityEventSubscriber<TimeSlot> {
    /**
    * Indicates that this subscriber only listen to TimeSlot events.
    */
    listenTo(): typeof TimeSlot;
    /**
     * Called after a TimeSlot entity is loaded from the database. This method updates
     * the entity with additional calculated properties.
     *
     * @param entity The TimeSlot entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the post-load processing is complete.
     */
    afterEntityLoad(entity: TimeSlot): Promise<void>;
    /**
     * Called after a TimeSlot entity is removed from the database. This method handles the
     * deletion of associated screenshot files from the storage.
     *
     * @param entity The TimeSlot entity that was just deleted.
     * @returns {Promise<void>} A promise that resolves when the file deletion operations are complete.
     */
    afterEntityDelete(entity: TimeSlot): Promise<void>;
    /**
     * Calculates the activity percentage based on activity time and total duration.
     * If the duration is zero, the function returns zero to avoid division by zero errors.
     *
     * @param activity The amount of time spent on a specific activity.
     * @param duration The total duration for which the activity is calculated.
     * @returns The activity as a percentage of the total duration, rounded to two decimal places.
     */
    private calculateActivity;
    /**
     * Calculate overall activity in percentage
     *
     * @param entity
     * @returns
     */
    private calculateOverallActivity;
    /**
     * Calculate mouse activity in percentage
     *
     * @param entity
     * @returns
     */
    private calculateMouseActivity;
    /**
     * Calculate keyboard activity in percentage
     *
     * @param entity
     * @returns
     */
    private calculateKeyboardActivity;
}
