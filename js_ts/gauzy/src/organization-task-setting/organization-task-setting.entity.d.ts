import { IOrganizationProject, IOrganizationTaskSetting, IOrganizationTeam, TaskProofOfCompletionTypeEnum } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class OrganizationTaskSetting extends TenantOrganizationBaseEntity implements IOrganizationTaskSetting {
    /**
     * Indicates whether tasks privacy features are enabled.
     * When true, tasks have privacy features such as restricted visibility.
     */
    isTasksPrivacyEnabled: boolean;
    /**
     * Indicates whether tasks allow multiple assignees.
     * When true, tasks can have more than one assigned person.
     */
    isTasksMultipleAssigneesEnabled: boolean;
    /**
     * Indicates whether manual time tracking is enabled for tasks.
     * When true, users can manually input time spent on tasks.
     */
    isTasksManualTimeEnabled: boolean;
    /**
     * Indicates whether group estimation is enabled for tasks.
     * When true, tasks can be estimated collectively by a group.
     */
    isTasksGroupEstimationEnabled: boolean;
    /**
     * Indicates whether task estimation in hours is enabled.
     * When true, tasks can be estimated in terms of hours.
     */
    isTasksEstimationInHoursEnabled: boolean;
    /**
     * Indicates whether task estimation in story points is enabled.
     * When true, tasks can be estimated using story points.
     */
    isTasksEstimationInStoryPointsEnabled: boolean;
    /**
     * Indicates whether proof of completion is enabled for tasks.
     * When true, tasks may require proof of completion.
     */
    isTasksProofOfCompletionEnabled: boolean;
    /**
     * Specifies the type of proof of completion required for tasks.
     * Enumerated values from `TaskProofOfCompletionTypeEnum`.
     */
    tasksProofOfCompletionType: TaskProofOfCompletionTypeEnum;
    /**
     * Indicates whether the linking of tasks is enabled.
     * When true, tasks can be linked to one another.
     */
    isTasksLinkedEnabled: boolean;
    /**
     * Indicates whether comments on tasks are enabled.
     * When true, users can add comments to tasks.
     */
    isTasksCommentsEnabled: boolean;
    /**
     * Indicates whether the tracking of task history is enabled.
     * When true, changes and updates to tasks are recorded for historical reference.
     */
    isTasksHistoryEnabled: boolean;
    /**
     * Indicates whether the use of acceptance criteria for tasks is enabled.
     * When true, tasks may include acceptance criteria for completion.
     */
    isTasksAcceptanceCriteriaEnabled: boolean;
    /**
     * Indicates whether the use of drafts for tasks is enabled.
     * When true, users can save tasks as drafts before finalizing and publishing them.
     */
    isTasksDraftsEnabled: boolean;
    /**
     * Indicates whether notifications about tasks approaching their due date are enabled.
     * When true, users receive notifications for tasks with approaching due dates.
     */
    isTasksNotifyLeftEnabled: boolean;
    /**
     * Specifies the number of days before the due date when notifications about tasks should be sent.
     */
    tasksNotifyLeftPeriodDays: number;
    /**
     * Indicates whether automatic closure of tasks is enabled.
     * When true, tasks may automatically close after a specified period.
     */
    isTasksAutoCloseEnabled: boolean;
    /**
     * Specifies the number of days after which tasks should automatically close.
     */
    tasksAutoClosePeriodDays: number;
    /**
     * Indicates whether automatic archiving of tasks is enabled.
     * When true, tasks may automatically be archived after a specified period.
     */
    isTasksAutoArchiveEnabled: boolean;
    /**
     * Specifies the number of days after which tasks should automatically be archived.
     */
    tasksAutoArchivePeriodDays: number;
    /**
     * Indicates whether automatic status updates are enabled for tasks.
     * When true, tasks may automatically update their status based on certain criteria.
     */
    isTasksAutoStatusEnabled: boolean;
    /**
     * Organization Project
     */
    project?: IOrganizationProject;
    projectId?: IOrganizationProject['id'];
    /**
     * Organization Team
     */
    organizationTeam?: IOrganizationTeam;
    organizationTeamId?: IOrganizationTeam['id'];
}
