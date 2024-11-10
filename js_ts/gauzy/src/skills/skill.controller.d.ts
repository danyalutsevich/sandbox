import { CrudController } from './../core/crud';
import { Skill } from './skill.entity';
import { SkillService } from './skill.service';
export declare class SkillController extends CrudController<Skill> {
    private readonly skillService;
    constructor(skillService: SkillService);
    findByName(name: string): Promise<Skill>;
}
