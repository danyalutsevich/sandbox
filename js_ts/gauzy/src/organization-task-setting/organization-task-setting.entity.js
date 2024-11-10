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
exports.OrganizationTaskSetting = void 0;
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/contracts/dist/index");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_organization_task_setting_repository_1 = require("./repository/mikro-orm-organization-task-setting.repository");
let OrganizationTaskSetting = exports.OrganizationTaskSetting = class OrganizationTaskSetting extends internal_1.TenantOrganizationBaseEntity {
    /**
     * Indicates whether tasks privacy features are enabled.
     * When true, tasks have privacy features such as restricted visibility.
     */
    isTasksPrivacyEnabled;
    /**
     * Indicates whether tasks allow multiple assignees.
     * When true, tasks can have more than one assigned person.
     */
    isTasksMultipleAssigneesEnabled;
    /**
     * Indicates whether manual time tracking is enabled for tasks.
     * When true, users can manually input time spent on tasks.
     */
    isTasksManualTimeEnabled;
    /**
     * Indicates whether group estimation is enabled for tasks.
     * When true, tasks can be estimated collectively by a group.
     */
    isTasksGroupEstimationEnabled;
    /**
     * Indicates whether task estimation in hours is enabled.
     * When true, tasks can be estimated in terms of hours.
     */
    isTasksEstimationInHoursEnabled;
    /**
     * Indicates whether task estimation in story points is enabled.
     * When true, tasks can be estimated using story points.
     */
    isTasksEstimationInStoryPointsEnabled;
    /**
     * Indicates whether proof of completion is enabled for tasks.
     * When true, tasks may require proof of completion.
     */
    isTasksProofOfCompletionEnabled;
    /**
     * Specifies the type of proof of completion required for tasks.
     * Enumerated values from `TaskProofOfCompletionTypeEnum`.
     */
    tasksProofOfCompletionType;
    /**
     * Indicates whether the linking of tasks is enabled.
     * When true, tasks can be linked to one another.
     */
    isTasksLinkedEnabled;
    /**
     * Indicates whether comments on tasks are enabled.
     * When true, users can add comments to tasks.
     */
    isTasksCommentsEnabled;
    /**
     * Indicates whether the tracking of task history is enabled.
     * When true, changes and updates to tasks are recorded for historical reference.
     */
    isTasksHistoryEnabled;
    /**
     * Indicates whether the use of acceptance criteria for tasks is enabled.
     * When true, tasks may include acceptance criteria for completion.
     */
    isTasksAcceptanceCriteriaEnabled;
    /**
     * Indicates whether the use of drafts for tasks is enabled.
     * When true, users can save tasks as drafts before finalizing and publishing them.
     */
    isTasksDraftsEnabled;
    /**
     * Indicates whether notifications about tasks approaching their due date are enabled.
     * When true, users receive notifications for tasks with approaching due dates.
     */
    isTasksNotifyLeftEnabled;
    /**
     * Specifies the number of days before the due date when notifications about tasks should be sent.
     */
    tasksNotifyLeftPeriodDays;
    /**
     * Indicates whether automatic closure of tasks is enabled.
     * When true, tasks may automatically close after a specified period.
     */
    isTasksAutoCloseEnabled;
    /**
     * Specifies the number of days after which tasks should automatically close.
     */
    tasksAutoClosePeriodDays;
    /**
     * Indicates whether automatic archiving of tasks is enabled.
     * When true, tasks may automatically be archived after a specified period.
     */
    isTasksAutoArchiveEnabled;
    /**
     * Specifies the number of days after which tasks should automatically be archived.
     */
    tasksAutoArchivePeriodDays;
    /**
     * Indicates whether automatic status updates are enabled for tasks.
     * When true, tasks may automatically update their status based on certain criteria.
     */
    isTasksAutoStatusEnabled;
    /**
     * Organization Project
     */
    project;
    projectId;
    /**
     * Organization Team
     */
    organizationTeam;
    organizationTeamId;
};
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], OrganizationTaskSetting.prototype, "isTasksPrivacyEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], OrganizationTaskSetting.prototype, "isTasksMultipleAssigneesEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], OrganizationTaskSetting.prototype, "isTasksManualTimeEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], OrganizationTaskSetting.prototype, "isTasksGroupEstimationEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], OrganizationTaskSetting.prototype, "isTasksEstimationInHoursEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], OrganizationTaskSetting.prototype, "isTasksEstimationInStoryPointsEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], OrganizationTaskSetting.prototype, "isTasksProofOfCompletionEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, enum: index_1.TaskProofOfCompletionTypeEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(index_1.TaskProofOfCompletionTypeEnum),
    (0, entity_1.MultiORMColumn)({ default: index_1.TaskProofOfCompletionTypeEnum.PRIVATE }),
    __metadata("design:type", String)
], OrganizationTaskSetting.prototype, "tasksProofOfCompletionType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], OrganizationTaskSetting.prototype, "isTasksLinkedEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], OrganizationTaskSetting.prototype, "isTasksCommentsEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], OrganizationTaskSetting.prototype, "isTasksHistoryEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], OrganizationTaskSetting.prototype, "isTasksAcceptanceCriteriaEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], OrganizationTaskSetting.prototype, "isTasksDraftsEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], OrganizationTaskSetting.prototype, "isTasksNotifyLeftEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ default: 7 }),
    __metadata("design:type", Number)
], OrganizationTaskSetting.prototype, "tasksNotifyLeftPeriodDays", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], OrganizationTaskSetting.prototype, "isTasksAutoCloseEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ default: 7 }),
    __metadata("design:type", Number)
], OrganizationTaskSetting.prototype, "tasksAutoClosePeriodDays", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], OrganizationTaskSetting.prototype, "isTasksAutoArchiveEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ default: 7 }),
    __metadata("design:type", Number)
], OrganizationTaskSetting.prototype, "tasksAutoArchivePeriodDays", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], OrganizationTaskSetting.prototype, "isTasksAutoStatusEnabled", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationProject, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** Database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], OrganizationTaskSetting.prototype, "project", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.project),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], OrganizationTaskSetting.prototype, "projectId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationTeam, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** Database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], OrganizationTaskSetting.prototype, "organizationTeam", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.organizationTeam),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], OrganizationTaskSetting.prototype, "organizationTeamId", void 0);
exports.OrganizationTaskSetting = OrganizationTaskSetting = __decorate([
    (0, entity_1.MultiORMEntity)('organization_task_setting', { mikroOrmRepository: () => mikro_orm_organization_task_setting_repository_1.MikroOrmOrganizationTaskSettingRepository })
], OrganizationTaskSetting);
//# sourceMappingURL=organization-task-setting.entity.js.map