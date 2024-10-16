import { EntityRepositoryType } from '@mikro-orm/core';
import { ICandidate, IEmployee, IEmployeeLevel, IEquipment, IEventType, IExpense, IExpenseCategory, IIncome, IIntegration, IInvoice, IMerchant, IOrganization, IOrganizationContact, IOrganizationDepartment, IOrganizationEmploymentType, IOrganizationPosition, IOrganizationProject, IOrganizationTeam, IOrganizationVendor, IPayment, IProduct, IRequestApproval, ITag, ITask, IUser, IWarehouse } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
import { TagEntityCustomFields } from '../core/entities/custom-entity-fields/tag';
import { MikroOrmTagRepository } from './repository/mikro-orm-tag.repository';
export declare class Tag extends TenantOrganizationBaseEntity implements ITag {
    [EntityRepositoryType]?: MikroOrmTagRepository;
    name: string;
    color: string;
    textColor?: string;
    description?: string;
    icon?: string;
    isSystem?: boolean;
    fullIconUrl?: string;
    /**
     * Organization Team
     */
    organizationTeam?: IOrganizationTeam;
    organizationTeamId?: IOrganizationTeam['id'];
    /**
     * Candidate
     */
    candidates?: ICandidate[];
    /**
     * Employee
     */
    employees?: IEmployee[];
    /**
     * Equipment
     */
    equipments?: IEquipment[];
    /**
     * EventType
     */
    eventTypes?: IEventType[];
    /**
     * Income
     */
    incomes?: IIncome[];
    /**
     * Expense
     */
    expenses?: IExpense[];
    /**
     * Invoice
     */
    invoices?: IInvoice[];
    /**
     * Income
     */
    tasks?: ITask[];
    /**
     * OrganizationVendor
     */
    organizationVendors?: IOrganizationVendor[];
    /**
     * OrganizationTeam
     */
    organizationTeams?: IOrganizationTeam[];
    /**
     * OrganizationProject
     */
    organizationProjects?: IOrganizationProject[];
    /**
     * OrganizationPosition
     */
    organizationPositions?: IOrganizationPosition[];
    /**
     * ExpenseCategory
     */
    expenseCategories?: IExpenseCategory[];
    /**
     * OrganizationEmploymentType
     */
    organizationEmploymentTypes?: IOrganizationEmploymentType[];
    /**
     * EmployeeLevel
     */
    employeeLevels?: IEmployeeLevel[];
    /**
     * OrganizationDepartment
     */
    organizationDepartments?: IOrganizationDepartment[];
    /**
     * OrganizationContact
     */
    organizationContacts?: IOrganizationContact[];
    /**
     * Product
     */
    products?: IProduct[];
    /**
     * Payment
     */
    payments?: IPayment[];
    /**
     * RequestApproval
     */
    requestApprovals?: IRequestApproval[];
    /**
     * User
     */
    users?: IUser[];
    /**
     * Integration
     */
    integrations?: IIntegration[];
    /**
     * Merchant
     */
    merchants?: IMerchant[];
    /**
     * Warehouse
     */
    warehouses?: IWarehouse[];
    /**
     * Organization
     */
    organizations?: IOrganization[];
    customFields?: TagEntityCustomFields;
}
