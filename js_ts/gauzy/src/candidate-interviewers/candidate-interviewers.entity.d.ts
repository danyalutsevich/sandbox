import { ICandidateInterviewers, ICandidateInterview, IEmployee } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class CandidateInterviewers extends TenantOrganizationBaseEntity implements ICandidateInterviewers {
    interview: ICandidateInterview;
    interviewId: string;
    employee: IEmployee;
    employeeId: string;
}
