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
exports.OrganizationTeamTaskRelatedIssueTypeBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
;
const organization_team_task_related_issue_type_bulk_create_command_1 = require("../organization-team-task-related-issue-type-bulk-create.command");
const related_issue_type_service_1 = require("../../related-issue-type.service");
let OrganizationTeamTaskRelatedIssueTypeBulkCreateHandler = exports.OrganizationTeamTaskRelatedIssueTypeBulkCreateHandler = class OrganizationTeamTaskRelatedIssueTypeBulkCreateHandler {
    TaskRelatedIssueTypeervice;
    constructor(TaskRelatedIssueTypeervice) {
        this.TaskRelatedIssueTypeervice = TaskRelatedIssueTypeervice;
    }
    async execute(command) {
        const { input } = command;
        const { id: organizationTeamId, organizationId } = input;
        /**
         * Create bulk task statuses for specific organization team
         */
        return this.TaskRelatedIssueTypeervice.createBulkRelatedIssueTypesByEntity({
            organizationId,
            organizationTeamId,
        });
    }
};
exports.OrganizationTeamTaskRelatedIssueTypeBulkCreateHandler = OrganizationTeamTaskRelatedIssueTypeBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_team_task_related_issue_type_bulk_create_command_1.OrganizationTeamTaskRelatedIssueTypeBulkCreateCommand),
    __metadata("design:paramtypes", [related_issue_type_service_1.TaskRelatedIssueTypeService])
], OrganizationTeamTaskRelatedIssueTypeBulkCreateHandler);
//# sourceMappingURL=organization-team-task-related-issue-type-bulk-create.handle.js.map