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
exports.IntegrationMapSyncScreenshotHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../../../plugins/contracts/dist/index");
const integration_map_sync_entity_command_1 = require("../integration-map.sync-entity.command");
const integration_map_sync_screenshot_command_1 = require("../integration-map.sync-screenshot.command");
const integration_map_service_1 = require("../../integration-map.service");
const context_1 = require("../../../core/context");
const commands_1 = require("./../../../time-tracking/screenshot/commands");
let IntegrationMapSyncScreenshotHandler = exports.IntegrationMapSyncScreenshotHandler = class IntegrationMapSyncScreenshotHandler {
    _commandBus;
    _integrationMapService;
    constructor(_commandBus, _integrationMapService) {
        this._commandBus = _commandBus;
        this._integrationMapService = _integrationMapService;
    }
    /**
     * Third party screenshot integrated and mapped
     *
     * @param command
     * @returns
     */
    async execute(command) {
        const { input } = command;
        const tenantId = context_1.RequestContext.currentTenantId();
        const { integrationId, sourceId, organizationId, entity } = input;
        const { time_slot, full_url, thumb_url, recorded_at, employeeId } = entity;
        try {
            const screenshotMap = await this._integrationMapService.findOneByWhereOptions({
                entity: index_1.IntegrationEntity.SCREENSHOT,
                sourceId,
                integrationId,
                organizationId,
                tenantId
            });
            await this._commandBus.execute(new commands_1.ScreenshotUpdateCommand(Object.assign({}, {
                id: screenshotMap.gauzyId,
                recordedAt: recorded_at,
                activityTimestamp: time_slot,
                file: full_url,
                thumb: thumb_url,
                employeeId
            })));
            return screenshotMap;
        }
        catch (error) {
            const gauzyScreenshot = await this._commandBus.execute(new commands_1.ScreenshotCreateCommand({
                file: full_url,
                thumb: thumb_url,
                recordedAt: recorded_at,
                activityTimestamp: time_slot,
                employeeId,
                organizationId
            }));
            return await this._commandBus.execute(new integration_map_sync_entity_command_1.IntegrationMapSyncEntityCommand({
                gauzyId: gauzyScreenshot.id,
                integrationId,
                sourceId,
                entity: index_1.IntegrationEntity.SCREENSHOT,
                organizationId
            }));
        }
    }
};
exports.IntegrationMapSyncScreenshotHandler = IntegrationMapSyncScreenshotHandler = __decorate([
    (0, cqrs_1.CommandHandler)(integration_map_sync_screenshot_command_1.IntegrationMapSyncScreenshotCommand),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        integration_map_service_1.IntegrationMapService])
], IntegrationMapSyncScreenshotHandler);
//# sourceMappingURL=integration-map.sync-screenshot.handler.js.map