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
exports.IntegrationSettingGetManyHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const integration_setting_getMany_command_1 = require("./../integration-setting.getMany.command");
const context_1 = require("../../../core/context");
const integration_setting_service_1 = require("../../integration-setting.service");
let IntegrationSettingGetManyHandler = exports.IntegrationSettingGetManyHandler = class IntegrationSettingGetManyHandler {
    _integrationSettingService;
    constructor(_integrationSettingService) {
        this._integrationSettingService = _integrationSettingService;
    }
    /**
     * Executes a command to retrieve multiple integration settings.
     *
     * @param command - The command to execute for retrieving integration settings.
     * @returns A Promise that resolves to an array of integration settings.
     */
    async execute(command) {
        // Extract the input parameters from the command
        const { input } = command;
        // Get the current tenant ID from the RequestContext
        const tenantId = context_1.RequestContext.currentTenantId();
        // Append the tenant ID to the 'where' clause if it's an object
        if (input.where instanceof Object) {
            input.where = Object.assign(input.where, { tenantId });
        }
        // Retrieve the integration settings
        const { items } = await this._integrationSettingService.findAll(input);
        return items;
    }
};
exports.IntegrationSettingGetManyHandler = IntegrationSettingGetManyHandler = __decorate([
    (0, cqrs_1.CommandHandler)(integration_setting_getMany_command_1.IntegrationSettingGetManyCommand),
    __metadata("design:paramtypes", [integration_setting_service_1.IntegrationSettingService])
], IntegrationSettingGetManyHandler);
//# sourceMappingURL=integration-setting.getMany.handler.js.map