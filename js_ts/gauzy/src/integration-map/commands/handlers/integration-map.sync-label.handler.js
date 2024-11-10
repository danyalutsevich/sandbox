"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationMapSyncLabelHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../../../plugins/contracts/dist/index");
const context_1 = require("core/context");
const commands_1 = require("tags/commands");
const tag_service_1 = require("tags/tag.service");
const integration_map_sync_entity_command_1 = require("./../integration-map.sync-entity.command");
const integration_map_sync_label_command_1 = require("./../integration-map.sync-label.command");
const integration_map_service_1 = require("../../integration-map.service");
let IntegrationMapSyncLabelHandler = exports.IntegrationMapSyncLabelHandler = class IntegrationMapSyncLabelHandler {
    _commandBus;
    _integrationMapService;
    _tagService;
    constructor(_commandBus, _integrationMapService, _tagService) {
        this._commandBus = _commandBus;
        this._integrationMapService = _integrationMapService;
        this._tagService = _tagService;
    }
    /**
     * Execute the IntegrationMapSyncLabelCommand to sync GitHub labels and update tags.
     *
     * @param command - The IntegrationMapSyncLabelCommand containing the request data.
     * @returns A promise that resolves to the updated integration map.
     */
    async execute(command) {
        const { request } = command;
        const { sourceId, organizationId, integrationId, entity } = request;
        const { name, color, description, isSystem } = entity;
        const tenantId = context_1.RequestContext.currentTenantId() || request.tenantId;
        try {
            // Check if an integration map already exists for the issue
            const integrationMap = await this._integrationMapService.findOneByWhereOptions({
                entity: index_1.IntegrationEntity.LABEL,
                sourceId,
                integrationId,
                organizationId,
                tenantId
            });
            // Try to find the corresponding tag
            try {
                await this._tagService.findOneByIdString(integrationMap.gauzyId);
                // Update the corresponding task with the new input data
                return await this._commandBus.execute(new commands_1.TagUpdateCommand(integrationMap.gauzyId, entity));
            }
            catch (error) {
                // Create a corresponding tag with the new input data
                return await this._commandBus.execute(new commands_1.TagCreateCommand({
                    id: integrationMap.gauzyId,
                    name,
                    color,
                    description,
                    isSystem,
                    organizationId,
                    tenantId
                }));
            }
        }
        catch (error) {
            const tag = await this._commandBus.execute(new commands_1.TagCreateCommand({
                name,
                color,
                description,
                isSystem,
                organizationId,
                tenantId
            }));
            await this._commandBus.execute(new integration_map_sync_entity_command_1.IntegrationMapSyncEntityCommand({
                gauzyId: tag.id,
                entity: index_1.IntegrationEntity.LABEL,
                integrationId,
                sourceId,
                organizationId,
                tenantId
            }));
            return tag;
        }
    }
};
exports.IntegrationMapSyncLabelHandler = IntegrationMapSyncLabelHandler = __decorate([
    (0, cqrs_1.CommandHandler)(integration_map_sync_label_command_1.IntegrationMapSyncLabelCommand),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        integration_map_service_1.IntegrationMapService, typeof (_a = typeof tag_service_1.TagService !== "undefined" && tag_service_1.TagService) === "function" ? _a : Object])
], IntegrationMapSyncLabelHandler);
//# sourceMappingURL=integration-map.sync-label.handler.js.map