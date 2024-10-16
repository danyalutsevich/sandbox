import { Skill } from './skill.entity';
import { TenantAwareCrudService } from './../core/crud';
import { MikroOrmSkillRepository } from './repository/mikro-orm-skill.repository';
import { TypeOrmSkillRepository } from './repository/type-orm-skill.repository';
export declare class SkillService extends TenantAwareCrudService<Skill> {
    constructor(typeOrmSkillRepository: TypeOrmSkillRepository, mikroOrmSkillRepository: MikroOrmSkillRepository);
    /**
     *
     * @param name
     * @returns
     */
    findOneByName(name: string): Promise<Skill>;
}
