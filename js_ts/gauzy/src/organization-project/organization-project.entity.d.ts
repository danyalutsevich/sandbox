import { CurrenciesEnum, IActivity, IEmployee, IExpense, IImageAsset, IInvoiceItem, IOrganizationContact, IOrganizationGithubRepository, IOrganizationProject, IOrganizationSprint, IOrganizationTeam, IPayment, ITag, ITask, ITaskPriority, ITaskRelatedIssueType, ITaskSize, ITaskStatus, ITaskVersion, ITimeLog, OrganizationProjectBudgetTypeEnum, ProjectBillingEnum, ProjectOwnerEnum, TaskListTypeEnum } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class OrganizationProject extends TenantOrganizationBaseEntity implements IOrganizationProject {
    name: string;
    startDate?: Date;
    endDate?: Date;
    billing: ProjectBillingEnum;
    currency: CurrenciesEnum;
    public: boolean;
    owner: ProjectOwnerEnum;
    taskListType: TaskListTypeEnum;
    code?: string;
    description?: string;
    color?: string;
    billable?: boolean;
    billingFlat?: boolean;
    openSource?: boolean;
    projectUrl?: string;
    openSourceProjectUrl?: string;
    budget?: number;
    budgetType?: OrganizationProjectBudgetTypeEnum;
    membersCount?: number;
    imageUrl?: string;
    isTasksAutoSync?: boolean;
    isTasksAutoSyncOnLabel?: boolean;
    syncTag?: string;
    /**
     * OrganizationGithubRepository Relationship
     */
    repository?: IOrganizationGithubRepository;
    /**
     * Repository ID
     */
    repositoryId?: IOrganizationGithubRepository['id'];
    /**
     * Organization Contact Relationship
     */
    organizationContact?: IOrganizationContact;
    /**
     * Organization Contact ID
     */
    organizationContactId?: IOrganizationContact['id'];
    /**
     * ImageAsset Relationship
     */
    image?: IImageAsset;
    /**
     * Image Asset ID
     */
    imageId?: IImageAsset['id'];
    /**
     * Organization Tasks Relationship
     */
    tasks?: ITask[];
    /**
     * TimeLog Relationship
     */
    timeLogs?: ITimeLog[];
    /**
     * Organization Invoice Items Relationship
     */
    invoiceItems?: IInvoiceItem[];
    /**
     * Organization Sprints Relationship
     */
    organizationSprints?: IOrganizationSprint[];
    /**
     * Organization Payments Relationship
     */
    payments?: IPayment[];
    /**
     * Expense Relationship
     */
    expenses?: IExpense[];
    /**
     * Activity Relationship
     */
    activities?: IActivity[];
    /**
     * Project Statuses
     */
    statuses?: ITaskStatus[];
    /**
     * Project Related Issue Type Relationship
     */
    relatedIssueTypes?: ITaskRelatedIssueType[];
    /**
     * Project Priorities Relationship
     */
    priorities?: ITaskPriority[];
    /**
     * Project Sizes Relationship
     */
    sizes?: ITaskSize[];
    /**
     * Project Versions Relationship
     */
    versions?: ITaskVersion[];
    /**
     * Tags Relationship
     */
    tags: ITag[];
    /**
     * Project Members Relationship
     */
    members?: IEmployee[];
    /**
     * Organization Teams Relationship
     */
    teams?: IOrganizationTeam[];
}
