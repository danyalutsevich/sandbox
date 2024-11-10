import { ICandidateInterviewersDeleteInput, ICandidateInterviewersCreateInput } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { TypeOrmCandidateInterviewersRepository } from './repository/type-orm-candidate-interviewers.repository';
import { MikroOrmCandidateInterviewersRepository } from './repository/mikro-orm-candidate-interviewers.repository';
import { CandidateInterviewers } from './candidate-interviewers.entity';
export declare class CandidateInterviewersService extends TenantAwareCrudService<CandidateInterviewers> {
    constructor(typeOrmCandidateInterviewersRepository: TypeOrmCandidateInterviewersRepository, mikroOrmCandidateInterviewersRepository: MikroOrmCandidateInterviewersRepository);
    /**
     *
     * @param interviewId
     * @returns
     */
    getInterviewersByInterviewId(interviewId: string): Promise<CandidateInterviewers[]>;
    /**
     *
     * @param employeeId
     * @returns
     */
    getInterviewersByEmployeeId(employeeId: ICandidateInterviewersDeleteInput): Promise<any>;
    /**
     *
     * @param ids
     * @returns
     */
    deleteBulk(ids: string[]): Promise<import("typeorm").DeleteResult>;
    /**
     *
     * @param createInput
     * @returns
     */
    createBulk(createInput: ICandidateInterviewersCreateInput[]): Promise<(ICandidateInterviewersCreateInput & CandidateInterviewers)[]>;
}
