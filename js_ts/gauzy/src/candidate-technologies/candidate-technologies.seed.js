"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomCandidateTechnologies = exports.createDefaultCandidateTechnologies = void 0;
const faker_1 = require("@faker-js/faker");
const candidate_technologies_entity_1 = require("./candidate-technologies.entity");
const internal_1 = require("./../core/entities/internal");
const createDefaultCandidateTechnologies = async (dataSource, tenant, organization, defaultCandidates) => {
    if (!defaultCandidates) {
        console.warn('Warning: defaultCandidates not found, Default Candidate Feedbacks will not be created');
        return;
    }
    let candidates = [];
    for (const tenantCandidate of defaultCandidates) {
        const { id: candidateId } = tenantCandidate;
        const candidateInterviews = await dataSource.manager.findBy(internal_1.CandidateInterview, {
            candidateId
        });
        candidates = await dataOperation(dataSource, tenant, organization, candidates, candidateInterviews);
    }
    return candidates;
};
exports.createDefaultCandidateTechnologies = createDefaultCandidateTechnologies;
const createRandomCandidateTechnologies = async (dataSource, tenants, tenantCandidatesMap) => {
    if (!tenantCandidatesMap) {
        console.warn('Warning: tenantCandidatesMap not found, CandidateFeedbacks will not be created');
        return;
    }
    let candidates = [];
    for (const tenant of tenants) {
        const tenantCandidates = tenantCandidatesMap.get(tenant);
        for (const tenantCandidate of tenantCandidates) {
            const { id: candidateId } = tenantCandidate;
            const candidateInterviews = await dataSource.manager.findBy(internal_1.CandidateInterview, {
                candidateId
            });
            candidates = await dataOperation(dataSource, tenant, tenantCandidate.organization, candidates, candidateInterviews);
        }
    }
    return candidates;
};
exports.createRandomCandidateTechnologies = createRandomCandidateTechnologies;
const dataOperation = async (dataSource, tenant, organization, candidates, candidateInterviews) => {
    for (const interview of candidateInterviews) {
        const candidate = new candidate_technologies_entity_1.CandidateTechnologies();
        candidate.name = faker_1.faker.person.jobArea();
        candidate.interviewId = interview.id;
        candidate.rating = Math.floor(Math.random() * 5) + 1;
        candidate.tenant = tenant;
        candidate.organization = organization;
        candidates.push(candidate);
    }
    await dataSource.manager.save(candidates);
    return candidates;
};
//# sourceMappingURL=candidate-technologies.seed.js.map