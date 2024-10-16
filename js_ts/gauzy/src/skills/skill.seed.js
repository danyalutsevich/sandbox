"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultSkills = void 0;
const faker_1 = require("@faker-js/faker");
const default_skills_1 = require("./default-skills");
const skill_entity_1 = require("./skill.entity");
const createDefaultSkills = async (dataSource, tenant, organization) => {
    try {
        const skills = [];
        for (const name of default_skills_1.DEFAULT_SKILLS) {
            const skill = new skill_entity_1.Skill();
            skill.name = name;
            skill.tenant = tenant;
            skill.organization = organization;
            skill.description = '';
            skill.color = faker_1.faker.internet.color();
            skills.push(skill);
        }
        return await dataSource.manager.save(skills);
    }
    catch (error) {
        console.log({ error });
    }
};
exports.createDefaultSkills = createDefaultSkills;
//# sourceMappingURL=skill.seed.js.map