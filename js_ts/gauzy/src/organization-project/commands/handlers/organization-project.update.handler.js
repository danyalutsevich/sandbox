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
exports.OrganizationProjectUpdateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const organization_project_update_command_1 = require("../organization-project.update.command");
const organization_project_service_1 = require("../../organization-project.service");
let OrganizationProjectUpdateHandler = exports.OrganizationProjectUpdateHandler = class OrganizationProjectUpdateHandler {
    _organizationProjectService;
    constructor(_organizationProjectService) {
        this._organizationProjectService = _organizationProjectService;
    }
    async execute(command) {
        try {
            const { input } = command;
            const { id } = input;
            //We are using create here because create calls the method save()
            //We need save() to save ManyToMany relations
            await this._organizationProjectService.create({
                ...input,
                id
            });
            return await this._organizationProjectService.findOneByIdString(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.OrganizationProjectUpdateHandler = OrganizationProjectUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_project_update_command_1.OrganizationProjectUpdateCommand),
    __metadata("design:paramtypes", [organization_project_service_1.OrganizationProjectService])
], OrganizationProjectUpdateHandler);
//# sourceMappingURL=organization-project.update.handler.js.map