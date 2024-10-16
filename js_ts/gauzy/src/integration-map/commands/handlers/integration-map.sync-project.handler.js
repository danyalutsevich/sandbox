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
exports.IntegrationMapSyncProjectHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../../../plugins/contracts/dist/index");
const context_1 = require("./../../../core/context");
const integration_map_sync_project_command_1 = require("./../integration-map.sync-project.command");
const integration_map_sync_entity_command_1 = require("./../integration-map.sync-entity.command");
const integration_map_service_1 = require("../../integration-map.service");
const commands_1 = require("../../../organization-project/commands");
let IntegrationMapSyncProjectHandler = exports.IntegrationMapSyncProjectHandler = class IntegrationMapSyncProjectHandler {
    _commandBus;
    _integrationMapService;
    constructor(_commandBus, _integrationMapService) {
        this._commandBus = _commandBus;
        this._integrationMapService = _integrationMapService;
    }
    /**
     * Third party organization project integrated and mapped
     *
     * @param command
     * @returns
     */
    async execute(command) {
        const { input } = command;
        const { integrationId, sourceId, organizationId, entity } = input;
        const tenantId = context_1.RequestContext.currentTenantId();
        try {
            const projectMap = await this._integrationMapService.findOneByWhereOptions({
                entity: index_1.IntegrationEntity.PROJECT,
                sourceId,
                integrationId,
                organizationId,
                tenantId
            });
            await this._commandBus.execute(new commands_1.OrganizationProjectUpdateCommand({
                ...entity,
                id: projectMap.gauzyId
            }));
            return projectMap;
        }
        catch (error) {
            const project = await this._commandBus.execute(new commands_1.OrganizationProjectCreateCommand(entity));
            return await this._commandBus.execute(new integration_map_sync_entity_command_1.IntegrationMapSyncEntityCommand({
                gauzyId: project.id,
                integrationId,
                sourceId,
                entity: index_1.IntegrationEntity.PROJECT,
                organizationId
            }));
        }
    }
};
exports.IntegrationMapSyncProjectHandler = IntegrationMapSyncProjectHandler = __decorate([
    (0, cqrs_1.CommandHandler)(integration_map_sync_project_command_1.IntegrationMapSyncProjectCommand),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        integration_map_service_1.IntegrationMapService])
], IntegrationMapSyncProjectHandler);
//# sourceMappingURL=integration-map.sync-project.handler.js.map