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
exports.FindRelatedIssueTypesHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
;
const related_issue_type_service_1 = require("../../related-issue-type.service");
const find_related_issue_type_query_1 = require("../find-related-issue-type.query");
let FindRelatedIssueTypesHandler = exports.FindRelatedIssueTypesHandler = class FindRelatedIssueTypesHandler {
    TaskRelatedIssueTypeervice;
    constructor(TaskRelatedIssueTypeervice) {
        this.TaskRelatedIssueTypeervice = TaskRelatedIssueTypeervice;
    }
    /**
     *
     * @param query
     * @returns
     */
    async execute(query) {
        const { options } = query;
        return await this.TaskRelatedIssueTypeervice.fetchAll(options);
    }
};
exports.FindRelatedIssueTypesHandler = FindRelatedIssueTypesHandler = __decorate([
    (0, cqrs_1.QueryHandler)(find_related_issue_type_query_1.FindRelatedIssueTypesQuery),
    __metadata("design:paramtypes", [related_issue_type_service_1.TaskRelatedIssueTypeService])
], FindRelatedIssueTypesHandler);
//# sourceMappingURL=find-related-issue-type.handler.js.map