"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomCandidateExperience = void 0;
const faker_1 = require("@faker-js/faker");
const candidate_experience_entity_1 = require("./candidate-experience.entity");
const organization_entity_1 = require("../organization/organization.entity");
const createRandomCandidateExperience = async (dataSource, tenants, tenantCandidatesMap) => {
    if (!tenantCandidatesMap) {
        console.warn('Warning: tenantCandidatesMap not found, CandidateExperience will not be created');
        return;
    }
    const candidateExperiences = [];
    for (const tenant of tenants) {
        const { id: tenantId } = tenant;
        const tenantCandidates = tenantCandidatesMap.get(tenant);
        const organizations = await dataSource.manager.findBy(organization_entity_1.Organization, {
            tenantId
        });
        for (const tenantCandidate of tenantCandidates) {
            for (let i = 0; i <= Math.floor(Math.random() * 3) + 1; i++) {
                const candidateExperience = new candidate_experience_entity_1.CandidateExperience();
                let getExperience = (faker_1.faker.date.past().getDate() -
                    faker_1.faker.date.past().getDate()) /
                    30 +
                    faker_1.faker.date.past().getMonth() -
                    faker_1.faker.date.past().getMonth() +
                    12 *
                        (faker_1.faker.date.past().getFullYear() -
                            faker_1.faker.date.past().getFullYear());
                getExperience = Number(getExperience.toFixed(2));
                const val = Math.abs(getExperience);
                candidateExperience.occupation = faker_1.faker.person.jobArea();
                candidateExperience.organization = faker_1.faker.helpers.arrayElement(organizations);
                candidateExperience.duration =
                    val.toString().split('.')[0].toString() + ' months';
                candidateExperience.description = faker_1.faker.lorem.words();
                candidateExperience.candidateId = tenantCandidate.id;
                candidateExperience.candidate = tenantCandidate;
                candidateExperience.tenant = tenant;
                candidateExperiences.push(candidateExperience);
            }
        }
    }
    return await insertRandomCandidateExperience(dataSource, candidateExperiences);
};
exports.createRandomCandidateExperience = createRandomCandidateExperience;
const insertRandomCandidateExperience = async (dataSource, candidateExperiences) => {
    return await dataSource.manager.save(candidateExperiences);
};
//# sourceMappingURL=candidate-experience.seed.js.map