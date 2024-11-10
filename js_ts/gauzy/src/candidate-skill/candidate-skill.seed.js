"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomCandidateSkills = exports.createCandidateSkills = void 0;
const faker_1 = require("@faker-js/faker");
const candidate_skill_entity_1 = require("./candidate-skill.entity");
const organization_entity_1 = require("../organization/organization.entity");
const default_candidate_skills_1 = require("./default-candidate-skills");
const createCandidateSkills = async (dataSource, tenant, candidates, organization) => {
    if (!candidates) {
        console.warn('Warning: candidates not found, CandidateSkills will not be created');
        return;
    }
    let defaultCandidateSkills = [];
    for (const candidate of candidates) {
        const skills = default_candidate_skills_1.DEFAULT_CANDIDATE_SKILLS.map((skill) => ({
            name: skill.name,
            candidateId: candidate.id,
            ...{ organization, tenant }
        }));
        defaultCandidateSkills = [...defaultCandidateSkills, ...skills];
    }
    await insertCandidateSkills(dataSource, defaultCandidateSkills);
    return defaultCandidateSkills;
};
exports.createCandidateSkills = createCandidateSkills;
const createRandomCandidateSkills = async (dataSource, tenants, tenantCandidatesMap) => {
    if (!tenantCandidatesMap) {
        console.warn('Warning: tenantCandidatesMap not found, CandidateSkills will not be created');
        return;
    }
    let candidateSkills = [];
    const candidateSkillsMap = new Map();
    for await (const tenant of tenants || []) {
        const { id: tenantId } = tenant;
        const organizations = await dataSource.manager.findBy(organization_entity_1.Organization, {
            tenantId
        });
        const candidates = tenantCandidatesMap.get(tenant);
        for (const candidate of candidates) {
            const skills = default_candidate_skills_1.DEFAULT_CANDIDATE_SKILLS.map((skill) => ({
                name: skill.name,
                candidateId: candidate.id,
                organization: faker_1.faker.helpers.arrayElement(organizations),
                tenant: tenant
            }));
            candidateSkillsMap.set(candidate, skills);
            candidateSkills = [...candidateSkills, ...skills];
        }
    }
    await insertCandidateSkills(dataSource, candidateSkills);
    return candidateSkillsMap;
};
exports.createRandomCandidateSkills = createRandomCandidateSkills;
const insertCandidateSkills = async (dataSource, candidateSkills) => {
    await dataSource
        .createQueryBuilder()
        .insert()
        .into(candidate_skill_entity_1.CandidateSkill)
        .values(candidateSkills)
        .execute();
};
//# sourceMappingURL=candidate-skill.seed.js.map