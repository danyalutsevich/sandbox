import { ICandidate, ICandidateInterview, ICandidateSource, PayPeriodEnum, ICandidateEducation, ICandidateExperience, ICandidateFeedback, ICandidateDocument, CandidateStatusEnum, ICandidateSkill, IOrganizationPosition, IOrganizationEmploymentType, IOrganizationDepartment, IContact, ITag, IUser, IEmployee, ID } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class Candidate extends TenantOrganizationBaseEntity implements ICandidate {
    rating?: number;
    valueDate?: Date;
    appliedDate?: Date;
    hiredDate?: Date;
    status?: CandidateStatusEnum;
    rejectDate?: Date;
    candidateLevel?: string;
    reWeeklyLimit?: number;
    billRateCurrency?: string;
    billRateValue?: number;
    minimumBillingRate?: number;
    payPeriod?: PayPeriodEnum;
    cvUrl?: string;
    /** Additional virtual columns */
    ratings?: number;
    alreadyHired?: boolean;
    /**
     * Contact
     */
    contact?: IContact;
    contactId?: ID;
    organizationPosition?: IOrganizationPosition;
    organizationPositionId?: ID;
    source?: ICandidateSource;
    sourceId?: ID;
    /**
     * User
     */
    user: IUser;
    userId: ID;
    /**
     * Employee
     */
    employee?: IEmployee;
    employeeId?: ID;
    /**
     * Represents a one-to-many relationship between the Candidate and CandidateEducation entities.
     * Each candidate can have multiple educations associated with them.
     * When a candidate is deleted, the related education entries are set to NULL.
     */
    educations?: ICandidateEducation[];
    /**
     * Represents a one-to-many relationship between the Candidate and CandidateInterview entities.
     * Each candidate can have multiple interviews associated with them.
     * When a candidate is deleted, the related interview entries are set to NULL.
     */
    interview?: ICandidateInterview[];
    /**
     * Represents a one-to-many relationship between the Candidate and CandidateExperience entities.
     * Each candidate can have multiple experiences associated with them.
     * When a candidate is deleted, the related experience entries are set to NULL.
     */
    experience?: ICandidateExperience[];
    /**
     * Represents a one-to-many relationship between the Candidate and CandidateSkill entities.
     * Each candidate can have multiple skills associated with them.
     * When a candidate is deleted, the related skill entries are set to NULL.
     */
    skills?: ICandidateSkill[];
    /**
     * Represents a one-to-many relationship between the Candidate and CandidateDocument entities.
     * Each candidate can have multiple documents associated with them.
     * When a candidate is deleted, the related document entries are set to NULL.
     */
    documents?: ICandidateDocument[];
    /**
     * Represents a one-to-many relationship between the Candidate and CandidateFeedback entities.
     * Each candidate can have multiple feedbacks associated with them.
     * When a candidate is deleted, the related feedback entries are set to NULL.
     */
    feedbacks?: ICandidateFeedback[];
    tags: ITag[];
    /**
     * Organization Departments
     */
    organizationDepartments?: IOrganizationDepartment[];
    /**
     * Organization Employment Types
     */
    organizationEmploymentTypes?: IOrganizationEmploymentType[];
}
