"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomCandidateCriterionRating = exports.createDefaultCandidateCriterionRating = void 0;
const candidate_criterion_rating_entity_1 = require("./candidate-criterion-rating.entity");
const internal_1 = require("./../core/entities/internal");
const createDefaultCandidateCriterionRating = async (dataSource, tenant, organization, defaultCandidates) => {
    if (!defaultCandidates) {
        console.warn('Warning: defaultCandidates not found, default Criterion rating  will not be created');
        return;
    }
    let candidates = [];
    for (const defaultCandidate of defaultCandidates) {
        const { id: candidateId } = defaultCandidate;
        const candidateInterviews = await dataSource.manager.findBy(internal_1.CandidateInterview, {
            candidateId
        });
        for (const interview of candidateInterviews) {
            const { id: interviewId } = interview;
            const candidatesFeedbacks = await dataSource.manager.findBy(internal_1.CandidateFeedback, {
                candidateId
            });
            const candidatesPersonalQualities = await dataSource.manager.findBy(internal_1.CandidatePersonalQualities, {
                interviewId
            });
            const candidatesTechnologies = await dataSource.manager.findBy(internal_1.CandidateTechnologies, {
                interviewId
            });
            candidates = await dataOperation(dataSource, tenant, organization, candidates, candidatesFeedbacks, candidatesTechnologies, candidatesPersonalQualities);
        }
    }
    return candidates;
};
exports.createDefaultCandidateCriterionRating = createDefaultCandidateCriterionRating;
const createRandomCandidateCriterionRating = async (dataSource, tenants, tenantCandidatesMap) => {
    if (!tenantCandidatesMap) {
        console.warn('Warning: tenantCandidatesMap not found, Criterion rating  will not be created');
        return;
    }
    let candidates = [];
    for (const tenant of tenants) {
        const tenantCandidates = tenantCandidatesMap.get(tenant);
        for (const tenantCandidate of tenantCandidates) {
            const { id: candidateId } = tenantCandidate;
            const candidateInterviews = await dataSource.manager.findBy(internal_1.CandidateInterview, {
                candidateId: candidateId
            });
            for (const interview of candidateInterviews) {
                const { id: interviewId } = interview;
                const candidatesFeedbacks = await dataSource.manager.findBy(internal_1.CandidateFeedback, {
                    candidateId
                });
                const candidatesPersonalQualities = await dataSource.manager.findBy(internal_1.CandidatePersonalQualities, {
                    interviewId
                });
                const candidatesTechnologies = await dataSource.manager.findBy(internal_1.CandidateTechnologies, {
                    interviewId
                });
                candidates = await dataOperation(dataSource, tenant, interview.organization, candidates, candidatesFeedbacks, candidatesTechnologies, candidatesPersonalQualities);
            }
        }
    }
    return candidates;
};
exports.createRandomCandidateCriterionRating = createRandomCandidateCriterionRating;
const dataOperation = async (dataSource, tenant, organization, candidates, candidatesFeedbacks, candidatesTechnologies, candidatesPersonalQualities) => {
    for (const feedback of candidatesFeedbacks) {
        const candidate = new candidate_criterion_rating_entity_1.CandidateCriterionsRating();
        candidate.rating = Math.floor(Math.random() * 5) + 1;
        candidate.technologyId = candidatesTechnologies[0].id;
        candidate.personalQualityId = candidatesPersonalQualities[0].id;
        candidate.feedback = feedback;
        candidate.tenant = tenant;
        candidate.organization = organization;
        candidates.push(candidate);
    }
    await dataSource.manager.save(candidates);
    return candidates;
};
//# sourceMappingURL=candidate-criterion-rating.seed.js.map