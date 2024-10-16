"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TaskRelatedIssueTypeModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRelatedIssueTypeModule = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../../role-permission/role-permission.module");
const related_issue_type_entity_1 = require("./related-issue-type.entity");
const related_issue_type_controller_1 = require("./related-issue-type.controller");
const related_issue_type_service_1 = require("./related-issue-type.service");
const handlers_1 = require("./commands/handlers");
const handlers_2 = require("./queries/handlers");
let TaskRelatedIssueTypeModule = exports.TaskRelatedIssueTypeModule = TaskRelatedIssueTypeModule_1 = class TaskRelatedIssueTypeModule {
};
exports.TaskRelatedIssueTypeModule = TaskRelatedIssueTypeModule = TaskRelatedIssueTypeModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/task-related-issue-types',
                    module: TaskRelatedIssueTypeModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([related_issue_type_entity_1.TaskRelatedIssueType]),
            nestjs_1.MikroOrmModule.forFeature([related_issue_type_entity_1.TaskRelatedIssueType]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [
            related_issue_type_controller_1.TaskRelatedIssueTypeController
        ],
        providers: [
            related_issue_type_service_1.TaskRelatedIssueTypeService,
            ...handlers_2.QueryHandlers,
            ...handlers_1.CommandHandlers
        ],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, related_issue_type_service_1.TaskRelatedIssueTypeService]
    })
], TaskRelatedIssueTypeModule);
//# sourceMappingURL=related-issue-type.module.js.map