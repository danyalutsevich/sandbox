"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TaskLinkedIssueModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskLinkedIssueModule = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../../role-permission/role-permission.module");
const task_linked_issue_entity_1 = require("./task-linked-issue.entity");
const task_linked_issue_controller_1 = require("./task-linked-issue.controller");
const task_linked_issue_service_1 = require("./task-linked-issue.service");
let TaskLinkedIssueModule = exports.TaskLinkedIssueModule = TaskLinkedIssueModule_1 = class TaskLinkedIssueModule {
};
exports.TaskLinkedIssueModule = TaskLinkedIssueModule = TaskLinkedIssueModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/task-linked-issue', module: TaskLinkedIssueModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([task_linked_issue_entity_1.TaskLinkedIssue]),
            nestjs_1.MikroOrmModule.forFeature([task_linked_issue_entity_1.TaskLinkedIssue]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [task_linked_issue_controller_1.TaskLinkedIssueController],
        providers: [task_linked_issue_service_1.TaskLinkedIssueService],
        exports: [task_linked_issue_service_1.TaskLinkedIssueService]
    })
], TaskLinkedIssueModule);
//# sourceMappingURL=task-linked-issue.module.js.map