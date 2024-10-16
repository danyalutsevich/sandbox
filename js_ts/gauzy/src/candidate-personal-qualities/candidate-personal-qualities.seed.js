"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomCandidatePersonalQualities = exports.createDefaultCandidatePersonalQualities = void 0;
const faker_1 = require("@faker-js/faker");
const candidate_personal_qualities_entity_1 = require("./candidate-personal-qualities.entity");
const candidate_interview_entity_1 = require("../candidate-interview/candidate-interview.entity");
const createDefaultCandidatePersonalQualities = async (dataSource, tenant, organization, defaultCandidates) => {
    if (!defaultCandidates) {
        console.warn('Warning: defaultCandidates not found, default Candidate Personal Qualities will not be created');
        return;
    }
    let candidates = [];
    for (const tenantCandidate of defaultCandidates) {
        const { id: candidateId } = tenantCandidate;
        const candidateInterviews = await dataSource.manager.findBy(candidate_interview_entity_1.CandidateInterview, {
            candidateId
        });
        candidates = await dataOperation(dataSource, tenant, organization, candidates, candidateInterviews);
    }
    return candidates;
};
exports.createDefaultCandidatePersonalQualities = createDefaultCandidatePersonalQualities;
const createRandomCandidatePersonalQualities = async (dataSource, tenants, tenantCandidatesMap) => {
    if (!tenantCandidatesMap) {
        console.warn('Warning: tenantCandidatesMap not found, CandidatePersonalQualities will not be created');
        return;
    }
    let candidates = [];
    for (const tenant of tenants) {
        const tenantCandidates = tenantCandidatesMap.get(tenant);
        for (const tenantCandidate of tenantCandidates) {
            const { id: candidateId } = tenantCandidate;
            const candidateInterviews = await dataSource.manager.findBy(candidate_interview_entity_1.CandidateInterview, {
                candidateId
            });
            candidates = await dataOperation(dataSource, tenant, tenantCandidate.organization, candidates, candidateInterviews);
        }
    }
    return candidates;
};
exports.createRandomCandidatePersonalQualities = createRandomCandidatePersonalQualities;
const dataOperation = async (dataSource, tenant, organization, candidates, candidateInterviews) => {
    for (const interview of candidateInterviews) {
        const candidate = new candidate_personal_qualities_entity_1.CandidatePersonalQualities();
        candidate.name = faker_1.faker.person.jobArea();
        candidate.interviewId = interview.id;
        candidate.rating = Math.floor(Math.random() * 5) + 1;
        candidate.interview = interview;
        candidate.tenant = tenant;
        candidate.organization = organization;
        candidates.push(candidate);
    }
    await dataSource.manager.save(candidates);
    return candidates;
};
//# sourceMappingURL=candidate-personal-qualities.seed.js.map