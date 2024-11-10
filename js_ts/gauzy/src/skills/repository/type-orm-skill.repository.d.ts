import { Repository } from 'typeorm';
import { Skill } from '../skill.entity';
export declare class TypeOrmSkillRepository extends Repository<Skill> {
    readonly repository: Repository<Skill>;
    constructor(repository: Repository<Skill>);
}
