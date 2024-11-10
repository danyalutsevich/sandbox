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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationMapSyncActivityHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../../../plugins/contracts/dist/index");
const commands_1 = require("./../../../time-tracking/activity/commands");
const integration_map_sync_activity_command_1 = require("./../integration-map.sync-activity.command");
const integration_map_sync_entity_command_1 = require("./../integration-map.sync-entity.command");
const integration_map_service_1 = require("../../integration-map.service");
const context_1 = require("../../../core/context");
let IntegrationMapSyncActivityHandler = exports.IntegrationMapSyncActivityHandler = class IntegrationMapSyncActivityHandler {
    _commandBus;
    _integrationMapService;
    constructor(_commandBus, _integrationMapService) {
        this._commandBus = _commandBus;
        this._integrationMapService = _integrationMapService;
    }
    /**
     * Third party activity integrated and mapped
     *
     * @param command
     * @returns
     */
    async execute(command) {
        const { input } = command;
        const { sourceId, organizationId, integrationId, entity } = input;
        const tenantId = context_1.RequestContext.currentTenantId();
        try {
            const activityMap = await this._integrationMapService.findOneByWhereOptions({
                entity: index_1.IntegrationEntity.ACTIVITY,
                sourceId,
                integrationId,
                organizationId,
                tenantId
            });
            await this._commandBus.execute(new commands_1.ActivityUpdateCommand(Object.assign(entity, {
                id: activityMap.gauzyId,
            })));
            return activityMap;
        }
        catch (error) {
            const gauzyActivity = await this._commandBus.execute(new commands_1.ActivityCreateCommand(entity));
            return await this._commandBus.execute(new integration_map_sync_entity_command_1.IntegrationMapSyncEntityCommand({
                gauzyId: gauzyActivity.id,
                integrationId,
                sourceId,
                entity: index_1.IntegrationEntity.ACTIVITY,
                organizationId,
                tenantId
            }));
        }
    }
};
exports.IntegrationMapSyncActivityHandler = IntegrationMapSyncActivityHandler = __decorate([
    (0, cqrs_1.CommandHandler)(integration_map_sync_activity_command_1.IntegrationMapSyncActivityCommand),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        integration_map_service_1.IntegrationMapService])
], IntegrationMapSyncActivityHandler);
//# sourceMappingURL=integration-map.sync-activity.handler.js.map