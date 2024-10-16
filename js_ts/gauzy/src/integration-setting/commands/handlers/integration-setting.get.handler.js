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
exports.IntegrationSettingGetHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const context_1 = require("core/context");
const integration_setting_get_command_1 = require("./../integration-setting.get.command");
const integration_setting_service_1 = require("../../integration-setting.service");
let IntegrationSettingGetHandler = exports.IntegrationSettingGetHandler = class IntegrationSettingGetHandler {
    integrationSettingService;
    constructor(integrationSettingService) {
        this.integrationSettingService = integrationSettingService;
    }
    /**
     * Executes the 'IntegrationSettingGetCommand' to retrieve an integration setting.
     *
     * @param command - The 'IntegrationSettingGetCommand' containing the input for the query.
     * @returns A promise that resolves to an 'IIntegrationSetting' object.
     */
    async execute(command) {
        const { input } = command;
        const tenantId = context_1.RequestContext.currentTenantId();
        if (input.where instanceof Object) {
            input.where = Object.assign(input.where, { tenantId });
        }
        const { record } = await this.integrationSettingService.findOneOrFailByOptions(input);
        return record;
    }
};
exports.IntegrationSettingGetHandler = IntegrationSettingGetHandler = __decorate([
    (0, cqrs_1.CommandHandler)(integration_setting_get_command_1.IntegrationSettingGetCommand),
    __metadata("design:paramtypes", [integration_setting_service_1.IntegrationSettingService])
], IntegrationSettingGetHandler);
//# sourceMappingURL=integration-setting.get.handler.js.map