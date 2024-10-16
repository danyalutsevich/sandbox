"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomCandidateFeedbacks = exports.createCandidateFeedbacks = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const faker_1 = require("@faker-js/faker");
const default_candidate_feedbacks_1 = require("./default-candidate-feedbacks");
const internal_1 = require("./../core/entities/internal");
const createCandidateFeedbacks = async (dataSource, tenant, organization, candidates) => {
    let candidateFeedbacksMap = new Map();
    if (!candidates) {
        console.warn('Warning: candidates not found, CandidateFeedbacks will not be created');
        return;
    }
    candidateFeedbacksMap = await dataOperation(dataSource, tenant, organization, [], candidateFeedbacksMap, candidates);
    return candidateFeedbacksMap;
};
exports.createCandidateFeedbacks = createCandidateFeedbacks;
const createRandomCandidateFeedbacks = async (dataSource, tenants, tenantCandidatesMap) => {
    if (!tenantCandidatesMap) {
        console.warn('Warning: tenantCandidatesMap not found, CandidateFeedbacks will not be created');
        return;
    }
    const candidateFeedbacks = [];
    let candidateFeedbacksMap = new Map();
    for (const tenant of tenants) {
        const { id: tenantId } = tenant;
        const organizations = await dataSource.manager.findBy(internal_1.Organization, {
            tenantId
        });
        const organization = faker_1.faker.helpers.arrayElement(organizations);
        const candidates = tenantCandidatesMap.get(tenant);
        candidateFeedbacksMap = await dataOperation(dataSource, tenant, organization, candidateFeedbacks, candidateFeedbacksMap, candidates);
    }
    return candidateFeedbacksMap;
};
exports.createRandomCandidateFeedbacks = createRandomCandidateFeedbacks;
const insertCandidateFeedbacks = async (dataSource, candidateFeedbacks) => {
    await dataSource
        .createQueryBuilder()
        .insert()
        .into(internal_1.CandidateFeedback)
        .values(candidateFeedbacks)
        .execute();
};
const dataOperation = async (dataSource, tenant, organization, candidateFeedbacks, candidateFeedbacksMap, candidates) => {
    for (const candidate of candidates) {
        const { id: candidateId } = candidate;
        const candidateInterviews = await dataSource.manager.findBy(internal_1.CandidateInterview, {
            candidateId
        });
        const interview = faker_1.faker.helpers.arrayElement(candidateInterviews);
        const feedbacks = default_candidate_feedbacks_1.DEFAULT_CANDIDATE_FEEDBACKS.map((feedback) => ({
            description: feedback.description,
            rating: feedback.rating,
            candidateId: candidate.id,
            interviewId: interview.id,
            tenant: tenant,
            organization: organization,
            status: faker_1.faker.helpers.arrayElement(Object.keys(index_1.CandidateStatusEnum))
        }));
        candidateFeedbacksMap.set(candidate, feedbacks);
        candidateFeedbacks = [...candidateFeedbacks, ...feedbacks];
    }
    await insertCandidateFeedbacks(dataSource, candidateFeedbacks);
    return candidateFeedbacksMap;
};
//# sourceMappingURL=candidate-feedbacks.seed.js.map