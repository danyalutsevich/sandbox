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
exports.TaskLinkedIssue = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const contracts_1 = require("../../../plugins/contracts");
const task_entity_1 = require("./../task.entity");
const internal_1 = require("./../../core/entities/internal");
const entity_1 = require("./../../core/decorators/entity");
const mikro_orm_linked_issue_repository_1 = require("./repository/mikro-orm-linked-issue.repository");
let TaskLinkedIssue = exports.TaskLinkedIssue = class TaskLinkedIssue extends internal_1.TenantOrganizationBaseEntity {
    action;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    taskFrom;
    taskFromId;
    /**
     * Task Linked Issues
     */
    taskTo;
    taskToId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: contracts_1.TaskRelatedIssuesRelationEnum }),
    (0, entity_1.MultiORMColumn)(),
    (0, class_validator_1.IsEnum)(contracts_1.TaskRelatedIssuesRelationEnum),
    __metadata("design:type", Number)
], TaskLinkedIssue.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => task_entity_1.Task }),
    (0, entity_1.MultiORMManyToOne)(() => task_entity_1.Task),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], TaskLinkedIssue.prototype, "taskFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.taskFrom),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", Object)
], TaskLinkedIssue.prototype, "taskFromId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Object }),
    (0, entity_1.MultiORMManyToOne)(() => task_entity_1.Task, (it) => it.linkedIssues),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], TaskLinkedIssue.prototype, "taskTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.taskTo),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", Object)
], TaskLinkedIssue.prototype, "taskToId", void 0);
exports.TaskLinkedIssue = TaskLinkedIssue = __decorate([
    (0, entity_1.MultiORMEntity)('task_linked_issues', { mikroOrmRepository: () => mikro_orm_linked_issue_repository_1.MikroOrmTaskLinkedIssueRepository })
], TaskLinkedIssue);
//# sourceMappingURL=task-linked-issue.entity.js.map