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
exports.OrganizationTaskSettingUpdateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const organization_task_setting_service_1 = require("../../organization-task-setting.service");
const organization_task_setting_update_command_1 = require("../organization-task-setting.update.command");
let OrganizationTaskSettingUpdateHandler = exports.OrganizationTaskSettingUpdateHandler = class OrganizationTaskSettingUpdateHandler {
    _organizationTaskSettingService;
    constructor(_organizationTaskSettingService) {
        this._organizationTaskSettingService = _organizationTaskSettingService;
    }
    /**
     * Executes the update operation for organization task settings.
     *
     * @param command - The command containing the identifier and updated settings.
     * @returns A Promise resolving to the updated organization task settings.
     * @throws Throws an error if the update operation fails.
     */
    async execute(command) {
        try {
            // Destructure the command to obtain the identifier and updated settings.
            const { id, input } = command;
            // Update the organization task settings using the provided service.
            await this._organizationTaskSettingService.update(id, input);
            // Retrieve and return the updated organization task settings.
            return await this._organizationTaskSettingService.findOneByIdString(id);
        }
        catch (error) {
            // Handle errors during the update operation.
            console.error('Error during organization task settings update:', error);
        }
    }
};
exports.OrganizationTaskSettingUpdateHandler = OrganizationTaskSettingUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_task_setting_update_command_1.OrganizationTaskSettingUpdateCommand),
    __metadata("design:paramtypes", [organization_task_setting_service_1.OrganizationTaskSettingService])
], OrganizationTaskSettingUpdateHandler);
//# sourceMappingURL=organization-task-setting.update.handler.js.map