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
exports.IntegrationEntitySettingGetHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const integration_entity_setting_get_command_1 = require("./../integration-entity-setting.get.command");
const integration_entity_setting_service_1 = require("./../../integration-entity-setting.service");
let IntegrationEntitySettingGetHandler = exports.IntegrationEntitySettingGetHandler = class IntegrationEntitySettingGetHandler {
    _integrationEntitySettingService;
    constructor(_integrationEntitySettingService) {
        this._integrationEntitySettingService = _integrationEntitySettingService;
    }
    /**
     * Execute the get command for integration entity settings.
     *
     * @param command - The IntegrationEntitySettingGetCommand containing the integrationId.
     * @returns A promise resolving to paginated integration entity settings.
     */
    async execute(command) {
        const { integrationId } = command;
        return await this._integrationEntitySettingService.getIntegrationEntitySettings(integrationId);
    }
};
exports.IntegrationEntitySettingGetHandler = IntegrationEntitySettingGetHandler = __decorate([
    (0, cqrs_1.CommandHandler)(integration_entity_setting_get_command_1.IntegrationEntitySettingGetCommand),
    __metadata("design:paramtypes", [integration_entity_setting_service_1.IntegrationEntitySettingService])
], IntegrationEntitySettingGetHandler);
//# sourceMappingURL=integration-entity-setting.get.handler.js.map