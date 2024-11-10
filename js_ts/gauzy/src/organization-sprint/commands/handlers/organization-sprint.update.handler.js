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
exports.OrganizationSprintUpdateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const organization_sprint_service_1 = require("../../organization-sprint.service");
const organization_sprint_update_command_1 = require("../organization-sprint.update.command");
let OrganizationSprintUpdateHandler = exports.OrganizationSprintUpdateHandler = class OrganizationSprintUpdateHandler {
    organizationSprintService;
    constructor(organizationSprintService) {
        this.organizationSprintService = organizationSprintService;
    }
    async execute(command) {
        const { id, input } = command;
        const record = await this.organizationSprintService.findOneByIdString(id);
        if (!record) {
            throw new common_1.NotFoundException(`The requested record was not found`);
        }
        //This will call save() with the id so that task[] also get saved accordingly
        return this.organizationSprintService.create({
            id,
            ...input
        });
    }
};
exports.OrganizationSprintUpdateHandler = OrganizationSprintUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_sprint_update_command_1.OrganizationSprintUpdateCommand),
    __metadata("design:paramtypes", [organization_sprint_service_1.OrganizationSprintService])
], OrganizationSprintUpdateHandler);
//# sourceMappingURL=organization-sprint.update.handler.js.map