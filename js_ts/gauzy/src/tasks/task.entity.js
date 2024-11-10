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
var Task_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const typeorm_1 = require("typeorm");
const core_1 = require("@mikro-orm/core");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/config/dist/index");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_task_repository_1 = require("./repository/mikro-orm-task.repository");
let Task = exports.Task = Task_1 = class Task extends internal_1.TenantOrganizationBaseEntity {
    [core_1.EntityRepositoryType];
    number;
    prefix;
    title;
    description;
    status;
    priority;
    size;
    issueType;
    estimate;
    dueDate;
    /**
     * task privacy should be boolean true/false
     */
    public;
    startDate;
    resolvedAt;
    version;
    /** Additional virtual columns */
    taskNumber;
    /** Additional virtual columns */
    rootEpic;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    // Define the parent-child relationship
    parent;
    // Define the parent-child relationship
    parentId;
    /**
     * Organization Project
     */
    project;
    projectId;
    /**
     * Creator
     */
    creator;
    creatorId;
    /**
     * Organization Sprint
     */
    organizationSprint;
    organizationSprintId;
    /**
     * Task Status
     */
    taskStatus;
    taskStatusId;
    /**
     * Task Size
     */
    taskSize;
    taskSizeId;
    /**
     * Task Priority
     */
    taskPriority;
    taskPriorityId;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    /**
     * Organization Team Employees
     */
    organizationTeamEmployees;
    /**
     * Estimations
     */
    estimations;
    /**
     * Children Tasks
     */
    children;
    /**
     * InvoiceItem
     */
    invoiceItems;
    /**
     * TimeLog
     */
    timeLogs;
    /**
     * Activity
     */
    activities;
    /**
     * Linked Task Issues
     */
    linkedIssues;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    /**
     * Daily planned Tasks
     */
    dailyPlans;
    /**
     * Tags
     */
    tags;
    /**
     * Members
     */
    members;
    /**
     * OrganizationTeam
     */
    teams;
};
__decorate([
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        ...((0, index_2.isMySQL)() ? { type: 'bigint' } : {})
    }),
    __metadata("design:type", Number)
], Task.prototype, "number", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "prefix", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        ...((0, index_2.isMySQL)() ? { type: 'text' } : {})
    }),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "issueType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], Task.prototype, "estimate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Task.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, default: true }),
    __metadata("design:type", Boolean)
], Task.prototype, "public", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Task.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Task.prototype, "resolvedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "version", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", String)
], Task.prototype, "taskNumber", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", Object)
], Task.prototype, "rootEpic", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Task_1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, entity_1.MultiORMManyToOne)(() => Task_1, (task) => task.children, {
        onDelete: 'SET NULL'
    }),
    __metadata("design:type", Task)
], Task.prototype, "parent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], Task.prototype, "parentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Object }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationProject, (it) => it.tasks, {
        /** Indicates if the relation column value can be nullable or not. */
        nullable: true,
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], Task.prototype, "project", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.project),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], Task.prototype, "projectId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.User, {
        nullable: true,
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Task.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.RelationId)((it) => it.creator),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], Task.prototype, "creatorId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Object }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationSprint, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Task.prototype, "organizationSprint", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.organizationSprint),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], Task.prototype, "organizationSprintId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Object }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.TaskStatus, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Task.prototype, "taskStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.taskStatus),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, type: 'varchar', relationId: true }),
    __metadata("design:type", Object)
], Task.prototype, "taskStatusId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Object }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.TaskSize, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Task.prototype, "taskSize", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.taskSize),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, type: 'varchar', relationId: true }),
    __metadata("design:type", Object)
], Task.prototype, "taskSizeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Object }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.TaskPriority, {
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Task.prototype, "taskPriority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.taskPriority),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, type: 'varchar', relationId: true }),
    __metadata("design:type", Object)
], Task.prototype, "taskPriorityId", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.OrganizationTeamEmployee, (it) => it.activeTask),
    __metadata("design:type", Array)
], Task.prototype, "organizationTeamEmployees", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.TaskEstimation, (it) => it.task),
    __metadata("design:type", Array)
], Task.prototype, "estimations", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => Task_1, (task) => task.parent),
    __metadata("design:type", Array)
], Task.prototype, "children", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.InvoiceItem, (invoiceItem) => invoiceItem.task),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Task.prototype, "invoiceItems", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.TimeLog, (it) => it.task),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Task.prototype, "timeLogs", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Activity, (activity) => activity.task),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Task.prototype, "activities", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.TaskLinkedIssue, (it) => it.taskTo),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Task.prototype, "linkedIssues", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.DailyPlan, (dailyPlan) => dailyPlan.tasks, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Task.prototype, "dailyPlans", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Array, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Tag, (tag) => tag.tasks, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'tag_task',
        joinColumn: 'taskId',
        inverseJoinColumn: 'tagId'
    }),
    (0, typeorm_1.JoinTable)({
        name: 'tag_task'
    }),
    __metadata("design:type", Array)
], Task.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Array, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Employee, (employee) => employee.tasks, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'task_employee',
        joinColumn: 'taskId',
        inverseJoinColumn: 'employeeId'
    }),
    (0, typeorm_1.JoinTable)({
        name: 'task_employee'
    }),
    __metadata("design:type", Array)
], Task.prototype, "members", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Array, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.OrganizationTeam, (team) => team.tasks, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'task_team',
        joinColumn: 'taskId',
        inverseJoinColumn: 'organizationTeamId'
    }),
    (0, typeorm_1.JoinTable)({
        name: 'task_team'
    }),
    __metadata("design:type", Array)
], Task.prototype, "teams", void 0);
exports.Task = Task = Task_1 = __decorate([
    (0, entity_1.MultiORMEntity)('task', { mikroOrmRepository: () => mikro_orm_task_repository_1.MikroOrmTaskRepository }),
    (0, entity_1.ColumnIndex)('taskNumber', ['projectId', 'number'], { unique: true })
], Task);
//# sourceMappingURL=task.entity.js.map