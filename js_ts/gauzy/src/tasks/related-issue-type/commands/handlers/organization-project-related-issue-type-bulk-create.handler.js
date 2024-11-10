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
exports.OrganizationProjectRelatedIssueTypeBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
;
const organization_project_related_issue_type_bulk_create_command_1 = require("../organization-project-related-issue-type-bulk-create.command");
const related_issue_type_service_1 = require("../../related-issue-type.service");
let OrganizationProjectRelatedIssueTypeBulkCreateHandler = exports.OrganizationProjectRelatedIssueTypeBulkCreateHandler = class OrganizationProjectRelatedIssueTypeBulkCreateHandler {
    TaskRelatedIssueTypeervice;
    constructor(TaskRelatedIssueTypeervice) {
        this.TaskRelatedIssueTypeervice = TaskRelatedIssueTypeervice;
    }
    async execute(command) {
        const { input } = command;
        const { id: projectId, organizationId } = input;
        /**
         * Create bulk task Related Issue Type for specific organization project
         */
        return await this.TaskRelatedIssueTypeervice.createBulkRelatedIssueTypesByEntity({
            organizationId,
            projectId,
        });
    }
};
exports.OrganizationProjectRelatedIssueTypeBulkCreateHandler = OrganizationProjectRelatedIssueTypeBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_project_related_issue_type_bulk_create_command_1.OrganizationProjectRelatedIssueTypeBulkCreateCommand),
    __metadata("design:paramtypes", [related_issue_type_service_1.TaskRelatedIssueTypeService])
], OrganizationProjectRelatedIssueTypeBulkCreateHandler);
//# sourceMappingURL=organization-project-related-issue-type-bulk-create.handler.js.map