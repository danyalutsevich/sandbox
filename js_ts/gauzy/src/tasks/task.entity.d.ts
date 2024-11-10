import { EntityRepositoryType } from '@mikro-orm/core';
import { IActivity, IDailyPlan, IEmployee, IInvoiceItem, IOrganizationProject, IOrganizationSprint, IOrganizationTeam, ITag, ITask, ITaskPriority, ITaskSize, ITaskStatus, ITimeLog, IUser, TaskPriorityEnum, TaskSizeEnum, TaskStatusEnum } from '../../plugins/contracts/dist/index';
import { OrganizationTeamEmployee, TaskEstimation, TaskLinkedIssue, TenantOrganizationBaseEntity } from '../core/entities/internal';
import { MikroOrmTaskRepository } from './repository/mikro-orm-task.repository';
export declare class Task extends TenantOrganizationBaseEntity implements ITask {
    [EntityRepositoryType]?: MikroOrmTaskRepository;
    number?: number;
    prefix?: string;
    title: string;
    description?: string;
    status?: TaskStatusEnum;
    priority?: TaskPriorityEnum;
    size?: TaskSizeEnum;
    issueType?: string;
    estimate?: number;
    dueDate?: Date;
    /**
     * task privacy should be boolean true/false
     */
    public?: boolean;
    startDate?: Date;
    resolvedAt?: Date;
    version?: string;
    /** Additional virtual columns */
    taskNumber?: string;
    /** Additional virtual columns */
    rootEpic?: ITask;
    parent?: Task;
    parentId?: Task['id'];
    /**
     * Organization Project
     */
    project?: IOrganizationProject;
    projectId?: IOrganizationProject['id'];
    /**
     * Creator
     */
    creator?: IUser;
    creatorId?: IUser['id'];
    /**
     * Organization Sprint
     */
    organizationSprint?: IOrganizationSprint;
    organizationSprintId?: IOrganizationSprint['id'];
    /**
     * Task Status
     */
    taskStatus?: ITaskStatus;
    taskStatusId?: ITaskStatus['id'];
    /**
     * Task Size
     */
    taskSize?: ITaskSize;
    taskSizeId?: ITaskSize['id'];
    /**
     * Task Priority
     */
    taskPriority?: ITaskPriority;
    taskPriorityId?: ITaskPriority['id'];
    /**
     * Organization Team Employees
     */
    organizationTeamEmployees?: OrganizationTeamEmployee[];
    /**
     * Estimations
     */
    estimations?: TaskEstimation[];
    /**
     * Children Tasks
     */
    children?: Task[];
    /**
     * InvoiceItem
     */
    invoiceItems?: IInvoiceItem[];
    /**
     * TimeLog
     */
    timeLogs?: ITimeLog[];
    /**
     * Activity
     */
    activities?: IActivity[];
    /**
     * Linked Task Issues
     */
    linkedIssues?: TaskLinkedIssue[];
    /**
     * Daily planned Tasks
     */
    dailyPlans?: IDailyPlan[];
    /**
     * Tags
     */
    tags?: ITag[];
    /**
     * Members
     */
    members?: IEmployee[];
    /**
     * OrganizationTeam
     */
    teams?: IOrganizationTeam[];
}
