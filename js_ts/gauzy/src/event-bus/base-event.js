"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEvent = void 0;
/**
 * Abstract base class for representing events in an event-driven architecture.
 */
class BaseEvent {
    /**
     * Readonly property representing the creation timestamp of the event.
     */
    createdAt;
    /**
     * Constructor for the BaseEvent class.
     * Initializes the `createdAt` property with the current date and time.
     */
    constructor() {
        this.createdAt = new Date();
    }
}
exports.BaseEvent = BaseEvent;
//# sourceMappingURL=base-event.js.map