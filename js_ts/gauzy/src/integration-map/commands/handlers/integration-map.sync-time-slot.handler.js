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
exports.IntegrationMapSyncTimeSlotHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../../../plugins/contracts/dist/index");
const integration_map_sync_entity_command_1 = require("../integration-map.sync-entity.command");
const integration_map_sync_time_slot_command_1 = require("../integration-map.sync-time-slot.command");
const integration_map_service_1 = require("../../integration-map.service");
const context_1 = require("../../../core/context");
const commands_1 = require("./../../../time-tracking/time-slot/commands");
let IntegrationMapSyncTimeSlotHandler = exports.IntegrationMapSyncTimeSlotHandler = class IntegrationMapSyncTimeSlotHandler {
    _commandBus;
    _integrationMapService;
    constructor(_commandBus, _integrationMapService) {
        this._commandBus = _commandBus;
        this._integrationMapService = _integrationMapService;
    }
    /**
     * Third party timeslot integrated and mapped
     *
     * @param command
     * @returns
     */
    async execute(command) {
        const { input } = command;
        const tenantId = context_1.RequestContext.currentTenantId();
        const { sourceId, organizationId, integrationId, entity } = input;
        const { employeeId } = entity;
        try {
            return await this._integrationMapService.findOneByWhereOptions({
                entity: index_1.IntegrationEntity.TIME_SLOT,
                sourceId,
                integrationId,
                organizationId,
                tenantId
            });
        }
        catch (error) {
            const { time_slot, starts_at } = entity;
            const gauzyTimeSlot = await this._commandBus.execute(new commands_1.TimeSlotCreateCommand({
                employeeId,
                startedAt: starts_at,
                overall: 0,
                keyboard: 0,
                mouse: 0,
                duration: 0,
                time_slot,
                organizationId
            }));
            return await this._commandBus.execute(new integration_map_sync_entity_command_1.IntegrationMapSyncEntityCommand({
                gauzyId: gauzyTimeSlot.id,
                integrationId,
                sourceId,
                entity: index_1.IntegrationEntity.TIME_SLOT,
                organizationId
            }));
        }
    }
};
exports.IntegrationMapSyncTimeSlotHandler = IntegrationMapSyncTimeSlotHandler = __decorate([
    (0, cqrs_1.CommandHandler)(integration_map_sync_time_slot_command_1.IntegrationMapSyncTimeSlotCommand),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        integration_map_service_1.IntegrationMapService])
], IntegrationMapSyncTimeSlotHandler);
//# sourceMappingURL=integration-map.sync-time-slot.handler.js.map