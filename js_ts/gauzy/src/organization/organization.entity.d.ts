import { DefaultValueDateTypeEnum, IOrganization, WeekDaysEnum, IContact, ITag, IInvoice, IEmployee, IDeal, ISkill, IPayment, IOrganizationSprint, IInvoiceEstimateHistory, IOrganizationAward, IOrganizationLanguage, IFeatureOrganization, IAccountingTemplate, IReportOrganization, IImageAsset } from '../../plugins/contracts/dist/index';
import { ImageAsset, TenantBaseEntity } from '../core/entities/internal';
export declare class Organization extends TenantBaseEntity implements IOrganization {
    name: string;
    isDefault: boolean;
    profile_link: string;
    banner: string;
    totalEmployees: number;
    short_description: string;
    client_focus: string;
    overview: string;
    imageUrl?: string;
    currency: string;
    valueDate?: Date;
    defaultValueDateType: DefaultValueDateTypeEnum;
    defaultAlignmentType?: string;
    timeZone?: string;
    regionCode?: string;
    brandColor?: string;
    dateFormat?: string;
    officialName?: string;
    startWeekOn?: WeekDaysEnum;
    taxId?: string;
    numberFormat?: string;
    minimumProjectSize?: string;
    bonusType?: string;
    bonusPercentage?: number;
    invitesAllowed?: boolean;
    show_income?: boolean;
    show_profits?: boolean;
    show_bonuses_paid?: boolean;
    show_total_hours?: boolean;
    show_minimum_project_size?: boolean;
    show_projects_count?: boolean;
    show_clients_count?: boolean;
    show_clients?: boolean;
    show_employees_count?: boolean;
    inviteExpiryPeriod?: number;
    fiscalStartDate?: Date;
    fiscalEndDate?: Date;
    registrationDate?: Date;
    futureDateAllowed?: boolean;
    /**
     * Indicates whether manual time entry is allowed for time tracking.
     *
     * @column
     * @default true
     * @type boolean
     */
    allowManualTime?: boolean;
    /**
     * Indicates whether modification of time entries is allowed for time tracking.
     *
     * @column
     * @default true
     * @type boolean
     */
    allowModifyTime?: boolean;
    /**
     * Indicates whether deletion of time entries is allowed for time tracking.
     *
     * @column
     * @default true
     * @type boolean
     */
    allowDeleteTime?: boolean;
    allowTrackInactivity?: boolean;
    inactivityTimeLimit?: number;
    activityProofDuration?: number;
    requireReason?: boolean;
    requireDescription?: boolean;
    requireProject?: boolean;
    requireTask?: boolean;
    requireClient?: boolean;
    timeFormat?: 12 | 24;
    separateInvoiceItemTaxAndDiscount?: boolean;
    website?: string;
    fiscalInformation?: string;
    currencyPosition?: string;
    discountAfterTax?: boolean;
    defaultStartTime?: string;
    defaultEndTime?: string;
    defaultInvoiceEstimateTerms?: string;
    convertAcceptedEstimates?: boolean;
    daysUntilDue?: number;
    isRemoveIdleTime?: boolean;
    allowScreenshotCapture?: boolean;
    /** Upwork Organization ID */
    upworkOrganizationId?: string;
    /** Upwork Organization Name */
    upworkOrganizationName?: string;
    /**
     * Indicates whether random screenshots are enabled. Defaults to false if not provided.
     */
    randomScreenshot?: boolean;
    /**
     * Indicates whether tracking is enabled during sleep.
     */
    trackOnSleep?: boolean;
    /**
     * Specifies the frequency of capturing screenshots. Defaults to 10 if not provided.
     */
    screenshotFrequency?: number;
    /**
     * Indicates whether a certain rule or behavior is enforced. Defaults to false if not provided.
     */
    enforced?: boolean;
    contact: IContact;
    contactId?: IContact['id'];
    /**
     * ImageAsset
     */
    image?: ImageAsset;
    imageId?: IImageAsset['id'];
    invoices?: IInvoice[];
    employees?: IEmployee[];
    deals?: IDeal[];
    awards?: IOrganizationAward[];
    languages?: IOrganizationLanguage[];
    featureOrganizations?: IFeatureOrganization[];
    payments?: IPayment[];
    organizationSprints?: IOrganizationSprint[];
    invoiceEstimateHistories?: IInvoiceEstimateHistory[];
    accountingTemplates?: IAccountingTemplate[];
    reportOrganizations?: IReportOrganization[];
    tags: ITag[];
    skills: ISkill[];
}
