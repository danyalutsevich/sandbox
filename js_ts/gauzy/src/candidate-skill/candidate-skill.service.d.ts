import { TenantAwareCrudService } from './../core/crud';
import { TypeOrmCandidateSkillRepository } from './repository/type-orm-candidate-skill.repository';
import { MikroOrmCandidateSkillRepository } from './repository/mikro-orm-candidate-skill.repository';
import { CandidateSkill } from './candidate-skill.entity';
export declare class CandidateSkillService extends TenantAwareCrudService<CandidateSkill> {
    constructor(typeOrmCandidateSkillRepository: TypeOrmCandidateSkillRepository, mikroOrmCandidateSkillRepository: MikroOrmCandidateSkillRepository);
}
