import { EntityRepositoryType } from '@mikro-orm/core';
import { IEmployee, IContact, ISkill, IUser, IOrganizationPosition, IOrganizationTeam, ITimeLog, IOrganizationDepartment, IOrganizationEmploymentType, IInvoiceItem, IRequestApprovalEmployee, IOrganizationProject, IOrganizationContact, IEmployeeSetting, ITimeOffPolicy, ITimeOff as ITimeOffRequest, IExpense, ITimesheet, ITask, ITimeSlot, IGoal, ICandidate, IEmployeeAward, IEquipmentSharing, IEmployeePhone, IDailyPlan } from '../../plugins/contracts/dist/index';
import { Tag, TaskEstimation, TenantOrganizationBaseEntity } from '../core/entities/internal';
import { HasCustomFields } from '../core/entities/custom-entity-fields';
import { EmployeeEntityCustomFields } from '../core/entities/custom-entity-fields/employee';
import { Taggable } from '../tags/tag.types';
import { MikroOrmEmployeeRepository } from './repository/mikro-orm-employee.repository';
export declare class Employee extends TenantOrganizationBaseEntity implements IEmployee, Taggable, HasCustomFields {
    [EntityRepositoryType]?: MikroOrmEmployeeRepository;
    valueDate?: Date;
    short_description?: string;
    description?: string;
    startedWorkOn?: Date;
    endWork?: Date;
    payPeriod?: string;
    billRateValue?: number;
    minimumBillingRate?: number;
    billRateCurrency?: string;
    reWeeklyLimit?: number;
    offerDate?: Date;
    acceptDate?: Date;
    rejectDate?: Date;
    employeeLevel?: string;
    anonymousBonus?: boolean;
    averageIncome?: number;
    averageBonus?: number;
    totalWorkHours?: number;
    averageExpenses?: number;
    show_anonymous_bonus?: boolean;
    show_average_bonus?: boolean;
    show_average_expenses?: boolean;
    show_average_income?: boolean;
    show_billrate?: boolean;
    show_payperiod?: boolean;
    show_start_work_on?: boolean;
    isJobSearchActive?: boolean;
    linkedInUrl?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    twitterUrl?: string;
    githubUrl?: string;
    gitlabUrl?: string;
    upworkUrl?: string;
    stackoverflowUrl?: string;
    isVerified?: boolean;
    isVetted?: boolean;
    totalJobs?: number;
    jobSuccess?: number;
    profile_link?: string;
    /**
     * Enabled/Disabled Time Tracking Feature
     */
    isTrackingEnabled: boolean;
    /**
     * Employee status (Online/Offline)
     */
    isOnline?: boolean;
    isAway?: boolean;
    /**
     * Employee time tracking status
     */
    isTrackingTime?: boolean;
    /**
     * Enabled/Disabled Screen Capture Feature
     */
    allowScreenshotCapture?: boolean;
    /** Upwork ID */
    upworkId?: string;
    /** LinkedIn ID */
    linkedInId?: string;
    /** Additional virtual columns */
    fullName?: string;
    isDeleted?: boolean;
    /**
     * User
     */
    user: IUser;
    userId: string;
    /**
     * Contact
     */
    contact?: IContact;
    contactId?: string;
    /**
     * Candidate
     */
    candidate?: ICandidate;
    organizationPosition?: IOrganizationPosition;
    organizationPositionId?: string;
    teams?: IOrganizationTeam[];
    /**
     * Estimations
     */
    estimations?: TaskEstimation[];
    /**
     * Time Tracking (Timesheets)
     */
    timesheets?: ITimesheet[];
    /**
     * Time Tracking (Time Logs)
     */
    timeLogs?: ITimeLog[];
    /**
     * Time Tracking (Time Slots)
     */
    timeSlots?: ITimeSlot[];
    invoiceItems?: IInvoiceItem[];
    requestApprovals?: IRequestApprovalEmployee[];
    settings?: IEmployeeSetting[];
    expenses?: IExpense[];
    /**
     * Goal
     */
    goals?: IGoal[];
    /**
     * Lead
     */
    leads?: IGoal[];
    /**
     * Awards
     */
    awards?: IEmployeeAward[];
    /**
     * Phone Numbers
     */
    phoneNumbers?: IEmployeePhone[];
    dailyPlans?: IDailyPlan[];
    /**
     * Employee Organization Projects
     */
    projects?: IOrganizationProject[];
    /**
     * Employee Tags
     */
    tags?: Tag[];
    /**
     * Employee Skills
     */
    skills?: ISkill[];
    /**
     * Organization Departments
     */
    organizationDepartments?: IOrganizationDepartment[];
    /**
     * Organization Employment Types
     */
    organizationEmploymentTypes?: IOrganizationEmploymentType[];
    /**
     * Employee Organization Contacts
     */
    organizationContacts?: IOrganizationContact[];
    /**
     * TimeOffPolicy
     */
    timeOffPolicies?: ITimeOffPolicy[];
    /**
     * TimeOffRequest
     */
    timeOffRequests?: ITimeOffRequest[];
    /**
     * Task
     */
    tasks?: ITask[];
    /**
     * Equipment Sharing
     */
    equipmentSharings?: IEquipmentSharing[];
    customFields?: EmployeeEntityCustomFields;
}
