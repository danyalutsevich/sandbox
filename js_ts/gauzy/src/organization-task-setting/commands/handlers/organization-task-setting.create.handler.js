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
exports.OrganizationTaskSettingCreateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const organization_task_setting_service_1 = require("../../organization-task-setting.service");
const organization_task_setting_create_command_1 = require("../organization-task-setting.create.command");
let OrganizationTaskSettingCreateHandler = exports.OrganizationTaskSettingCreateHandler = class OrganizationTaskSettingCreateHandler {
    _organizationTaskSettingService;
    constructor(_organizationTaskSettingService) {
        this._organizationTaskSettingService = _organizationTaskSettingService;
    }
    /**
     * The execution of a command to create organization task settings.
     * This method tries to create a new organization task setting using the provided command and inputs.
     *
     * @param command An instance of OrganizationTaskSettingCreateCommand containing the necessary information to create an organization task setting.
     * @returns A promise that resolves to an instance of IOrganizationTaskSetting, representing the newly created organization task setting.
     */
    async execute(command) {
        try {
            const { input } = command;
            return await this._organizationTaskSettingService.create(input);
        }
        catch (error) {
            console.log('Error while creating organization task setting', error);
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.OrganizationTaskSettingCreateHandler = OrganizationTaskSettingCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_task_setting_create_command_1.OrganizationTaskSettingCreateCommand),
    __metadata("design:paramtypes", [organization_task_setting_service_1.OrganizationTaskSettingService])
], OrganizationTaskSettingCreateHandler);
//# sourceMappingURL=organization-task-setting.create.handler.js.map