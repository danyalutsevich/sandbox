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
exports.OrganizationTeamTaskSizeBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
;
const organization_team_task_size_bulk_create_command_1 = require("../organization-team-task-size-bulk-create.command");
const size_service_1 = require("./../../size.service");
let OrganizationTeamTaskSizeBulkCreateHandler = exports.OrganizationTeamTaskSizeBulkCreateHandler = class OrganizationTeamTaskSizeBulkCreateHandler {
    taskSizeService;
    constructor(taskSizeService) {
        this.taskSizeService = taskSizeService;
    }
    async execute(command) {
        const { input } = command;
        const { id: organizationTeamId, organizationId } = input;
        /**
         * Create bulk task size for specific organization team
         */
        return await this.taskSizeService.createBulkSizesByEntity({ organizationId, organizationTeamId });
    }
};
exports.OrganizationTeamTaskSizeBulkCreateHandler = OrganizationTeamTaskSizeBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_team_task_size_bulk_create_command_1.OrganizationTeamTaskSizeBulkCreateCommand),
    __metadata("design:paramtypes", [size_service_1.TaskSizeService])
], OrganizationTeamTaskSizeBulkCreateHandler);
//# sourceMappingURL=organization-team-task-size-bulk-create.handle.js.map