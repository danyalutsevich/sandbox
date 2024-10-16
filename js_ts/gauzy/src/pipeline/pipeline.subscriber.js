"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineSubscriber = void 0;
const typeorm_1 = require("typeorm");
const pipeline_entity_1 = require("./pipeline.entity");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
let PipelineSubscriber = exports.PipelineSubscriber = class PipelineSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
    * Indicates that this subscriber only listen to Pipeline events.
    */
    listenTo() {
        return pipeline_entity_1.Pipeline;
    }
    /**
     * Called after a Pipeline entity is loaded from the database. This method performs
     * additional operations defined in the __after_fetch method on the loaded entity.
     *
     * @param entity The Pipeline entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the post-load processing is complete.
     */
    async afterEntityLoad(entity) {
        try {
            this.__after_fetch(entity);
        }
        catch (error) {
            console.error(`PipelineSubscriber: An error occurred during the afterEntityLoad process for Pipeline ID ${entity.id}:`, error);
        }
    }
    /**
     * Called before a Pipeline entity is inserted or created in the database. This method
     * assigns pipeline ID and an index to each stage in the pipeline.
     *
     * @param entity The Pipeline entity about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    async beforeEntityCreate(entity) {
        try {
            // Assign pipeline ID to each stage and set an incrementing index
            const pipelineId = entity?.id ? { pipelineId: entity.id } : {};
            let index = 0;
            entity?.stages?.forEach((stage) => {
                Object.assign(stage, pipelineId, { index: ++index });
            });
        }
        catch (error) {
            console.error('PipelineSubscriber: An error occurred during the beforeEntityCreate process:', error);
        }
    }
    /**
     * Called after a Pipeline entity is inserted into the database. This method performs
     * additional operations defined in the __after_fetch method on the newly created entity.
     *
     * @param entity The Pipeline entity that has been created.
     * @returns {Promise<void>} A promise that resolves when the post-creation processing is complete.
     */
    async afterEntityCreate(entity) {
        try {
            this.__after_fetch(entity);
        }
        catch (error) {
            console.error('PipelineSubscriber: An error occurred during the afterEntityCreate process:', error);
        }
    }
    /***
     * Internal method to be used after fetching the Pipeline entity.
     *
     * @param entity - The fetched Pipeline entity.
     */
    __after_fetch(entity) {
        if (entity.stages) {
            entity.stages.sort(({ index: a }, { index: b }) => a - b);
        }
    }
};
exports.PipelineSubscriber = PipelineSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], PipelineSubscriber);
//# sourceMappingURL=pipeline.subscriber.js.map