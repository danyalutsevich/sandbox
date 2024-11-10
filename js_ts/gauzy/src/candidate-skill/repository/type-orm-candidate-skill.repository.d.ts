import { Repository } from 'typeorm';
import { CandidateSkill } from '../candidate-skill.entity';
export declare class TypeOrmCandidateSkillRepository extends Repository<CandidateSkill> {
    readonly repository: Repository<CandidateSkill>;
    constructor(repository: Repository<CandidateSkill>);
}
