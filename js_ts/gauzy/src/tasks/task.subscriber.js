"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSubscriber = void 0;
const typeorm_1 = require("typeorm");
const context_1 = require("./../core/context");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
const task_entity_1 = require("./task.entity");
let TaskSubscriber = exports.TaskSubscriber = class TaskSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
    * Indicates that this subscriber only listen to Task events.
    */
    listenTo() {
        return task_entity_1.Task;
    }
    /**
     * Called after a Task entity is loaded from the database. This method constructs a formatted
     * task number based on the prefix and the task's number.
     *
     * @param entity The Task entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the task number generation is complete.
     */
    async afterEntityLoad(entity) {
        try {
            if (entity) {
                let prefix = '';
                if (entity.prefix) {
                    // Use the entity's prefix in uppercase
                    prefix = entity.prefix.toUpperCase();
                }
                else if (entity.project?.name) {
                    // Use the first three characters of the project's name in uppercase
                    prefix = entity.project?.name.substring(0, 3).toUpperCase();
                }
                // Construct an array to hold the parts of the task number
                const list = [];
                // Add the prefix or derived prefix from the project name
                list.push(prefix);
                // Add the task number or default to 0
                list.push(entity.number || 0);
                // Set the taskNumber property if 'number' exists in the entity
                if ('number' in entity) {
                    entity.taskNumber = list.filter(Boolean).join('-');
                }
            }
        }
        catch (error) {
            console.error('TaskSubscriber: An error occurred during the afterEntityLoad process:', error);
        }
    }
    /**
     * Called before a Task entity is inserted into the database. This method sets the creator ID
     * of the task based on the current user context.
     *
     * @param entity The Task entity about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    async beforeEntityCreate(entity) {
        try {
            // Retrieve the current user's ID from RequestContext and assign it as the creator
            if (entity) {
                entity.creatorId = context_1.RequestContext.currentUserId();
            }
        }
        catch (error) {
            console.error('TaskSubscriber: An error occurred during the beforeEntityCreate process:', error);
        }
    }
};
exports.TaskSubscriber = TaskSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], TaskSubscriber);
//# sourceMappingURL=task.subscriber.js.map