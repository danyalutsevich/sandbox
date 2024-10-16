"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomCandidateInterview = exports.createDefaultCandidateInterview = void 0;
const faker_1 = require("@faker-js/faker");
const internal_1 = require("./../core/entities/internal");
const createDefaultCandidateInterview = async (dataSource, tenant, organization, candidates) => {
    if (!candidates) {
        console.warn('Warning: Candidates not found, Default Candidate Interview will not be created');
        return;
    }
    let candidateInterviews = [];
    for (const tenantCandidate of candidates) {
        candidateInterviews = await dataOperation(dataSource, candidateInterviews, tenantCandidate, tenant, organization);
    }
    return candidateInterviews;
};
exports.createDefaultCandidateInterview = createDefaultCandidateInterview;
const createRandomCandidateInterview = async (dataSource, tenants, tenantCandidatesMap) => {
    if (!tenantCandidatesMap) {
        console.warn('Warning: tenantCandidatesMap not found, CandidateInterview will not be created');
        return;
    }
    let candidates = [];
    for (const tenant of tenants) {
        const { id: tenantId } = tenant;
        const organizations = await dataSource.manager.findBy(internal_1.Organization, {
            tenantId
        });
        const organization = faker_1.faker.helpers.arrayElement(organizations);
        const tenantCandidates = tenantCandidatesMap.get(tenant);
        for (const tenantCandidate of tenantCandidates) {
            candidates = await dataOperation(dataSource, candidates, tenantCandidate, tenant, organization);
        }
    }
    return candidates;
};
exports.createRandomCandidateInterview = createRandomCandidateInterview;
const dataOperation = async (dataSource, candidates, tenantCandidate, tenant, organization) => {
    for (let i = 0; i <= Math.floor(Math.random() * 3) + 1; i++) {
        const candidate = new internal_1.CandidateInterview();
        const interViewDate = faker_1.faker.date.past();
        candidate.title = faker_1.faker.person.jobArea();
        candidate.startTime = new Date(interViewDate.setHours(10));
        candidate.endTime = new Date(interViewDate.setHours(12));
        candidate.location = faker_1.faker.location.city();
        candidate.note = faker_1.faker.lorem.words();
        candidate.candidate = tenantCandidate;
        candidate.tenant = tenant;
        candidate.organization = organization;
        candidates.push(candidate);
    }
    await dataSource.manager.save(candidates);
    return candidates;
};
//# sourceMappingURL=candidate-interview.seed.js.map