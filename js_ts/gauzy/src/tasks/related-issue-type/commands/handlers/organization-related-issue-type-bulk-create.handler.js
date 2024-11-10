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
exports.OrganizationRelatedIssueTypeBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
;
const organization_related_issue_type_bulk_create_command_1 = require("../organization-related-issue-type-bulk-create.command");
const related_issue_type_service_1 = require("../../related-issue-type.service");
let OrganizationRelatedIssueTypeBulkCreateHandler = exports.OrganizationRelatedIssueTypeBulkCreateHandler = class OrganizationRelatedIssueTypeBulkCreateHandler {
    TaskRelatedIssueTypeervice;
    constructor(TaskRelatedIssueTypeervice) {
        this.TaskRelatedIssueTypeervice = TaskRelatedIssueTypeervice;
    }
    async execute(command) {
        const { input } = command;
        return await this.TaskRelatedIssueTypeervice.bulkCreateOrganizationRelatedIssueTypes(input);
    }
};
exports.OrganizationRelatedIssueTypeBulkCreateHandler = OrganizationRelatedIssueTypeBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_related_issue_type_bulk_create_command_1.OrganizationRelatedIssueTypeBulkCreateCommand),
    __metadata("design:paramtypes", [related_issue_type_service_1.TaskRelatedIssueTypeService])
], OrganizationRelatedIssueTypeBulkCreateHandler);
//# sourceMappingURL=organization-related-issue-type-bulk-create.handler.js.map