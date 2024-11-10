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
exports.OrganizationProjectSettingUpdateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const organization_project_service_1 = require("../../organization-project.service");
const organization_project_setting_update_command_1 = require("../organization-project-setting.update.command");
let OrganizationProjectSettingUpdateHandler = exports.OrganizationProjectSettingUpdateHandler = class OrganizationProjectSettingUpdateHandler {
    _organizationProjectService;
    logger = new common_1.Logger('OrganizationProjectSettingUpdateHandler');
    constructor(_organizationProjectService) {
        this._organizationProjectService = _organizationProjectService;
    }
    /**
     * Execute an organization project setting update command.
     *
     * @param command - An `OrganizationProjectSettingUpdateCommand` object containing the update details.
     * @returns A promise that resolves to an `IOrganizationProjectSetting` or an `UpdateResult` object representing the result of the update operation.
     */
    async execute(command) {
        try {
            // Extract the 'id' and 'input' properties from the command object.
            const { id, input } = command;
            // Update the organization project setting using the provided 'id' and 'input'.
            await this._organizationProjectService.update(id, input);
            // Retrieve and return the updated organization project setting.
            return await this._organizationProjectService.findOneByIdString(id);
        }
        catch (error) {
            // Handle errors and return an appropriate error response
            this.logger.error('Failed to update project integration settings', error.message);
            throw new common_1.HttpException(`Failed to update project integration settings: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.OrganizationProjectSettingUpdateHandler = OrganizationProjectSettingUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_project_setting_update_command_1.OrganizationProjectSettingUpdateCommand),
    __metadata("design:paramtypes", [organization_project_service_1.OrganizationProjectService])
], OrganizationProjectSettingUpdateHandler);
//# sourceMappingURL=organization-project-setting.update.handler.js.map