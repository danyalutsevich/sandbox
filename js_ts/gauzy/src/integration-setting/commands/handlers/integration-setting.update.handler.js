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
exports.IntegrationSettingUpdateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const integration_setting_update_command_1 = require("../integration-setting.update.command");
const integration_setting_service_1 = require("../../integration-setting.service");
let IntegrationSettingUpdateHandler = exports.IntegrationSettingUpdateHandler = class IntegrationSettingUpdateHandler {
    _integrationSettingService;
    constructor(_integrationSettingService) {
        this._integrationSettingService = _integrationSettingService;
    }
    /**
     * Execute the IntegrationSettingUpdateCommand to bulk update or create integration settings.
     *
     * @param command - The IntegrationSettingUpdateCommand containing the input settings and integration ID.
     * @returns {Promise<IIntegrationSetting[]>} - A promise that resolves with an array of updated or created integration settings.
     */
    async execute(command) {
        try {
            const { input, integrationId } = command;
            // Call the service method to bulk update or create integration settings
            return await this._integrationSettingService.bulkUpdateOrCreate(integrationId, input);
        }
        catch (error) {
            // Handle errors and return an appropriate error response
            console.log(`Failed to update integration settings: ${error.message}`);
            throw new common_1.HttpException(`Failed to update integration settings: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.IntegrationSettingUpdateHandler = IntegrationSettingUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(integration_setting_update_command_1.IntegrationSettingUpdateCommand),
    __metadata("design:paramtypes", [integration_setting_service_1.IntegrationSettingService])
], IntegrationSettingUpdateHandler);
//# sourceMappingURL=integration-setting.update.handler.js.map