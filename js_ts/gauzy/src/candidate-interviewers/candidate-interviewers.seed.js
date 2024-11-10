"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomCandidateInterviewers = exports.createDefaultCandidateInterviewers = void 0;
const faker_1 = require("@faker-js/faker");
const internal_1 = require("./../core/entities/internal");
const createDefaultCandidateInterviewers = async (dataSource, tenant, organization, defaultEmployees, defaultCandidates) => {
    if (!defaultEmployees) {
        console.warn('Warning: defaultEmployees not found, Default CandidateInterviewers will not be created');
        return;
    }
    if (!defaultCandidates) {
        console.warn('Warning: defaultCandidates not found, Default Candidate Interviewers will not be created');
        return;
    }
    let candidates = [];
    for (const candidate of defaultCandidates) {
        const { id: candidateId } = candidate;
        const candidateInterviews = await dataSource.manager.findBy(internal_1.CandidateInterview, {
            candidateId
        });
        candidates = await dataOperation(dataSource, tenant, organization, candidates, candidateInterviews, defaultEmployees);
    }
    return candidates;
};
exports.createDefaultCandidateInterviewers = createDefaultCandidateInterviewers;
const createRandomCandidateInterviewers = async (dataSource, tenants, tenantOrganizationsMap, organizationEmployeesMap, tenantCandidatesMap) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, CandidateInterviewers will not be created');
        return;
    }
    if (!tenantCandidatesMap) {
        console.warn('Warning: tenantCandidatesMap not found, CandidateInterviewers will not be created');
        return;
    }
    let candidates = [];
    for (const tenant of tenants) {
        const tenantCandidates = tenantCandidatesMap.get(tenant);
        for (const tenantCandidate of tenantCandidates) {
            const tenantEmployees = organizationEmployeesMap.get(tenantCandidate.organization);
            const { id: candidateId } = tenantCandidate;
            const candidateInterviews = await dataSource.manager.findBy(internal_1.CandidateInterview, {
                candidateId
            });
            candidates = await dataOperation(dataSource, tenant, tenantCandidate.organization, candidates, candidateInterviews, tenantEmployees);
        }
    }
    return candidates;
};
exports.createRandomCandidateInterviewers = createRandomCandidateInterviewers;
const dataOperation = async (dataSource, tenant, organization, candidates, candidateInterviews, tenantEmployees) => {
    for (const interview of candidateInterviews) {
        const candidate = new internal_1.CandidateInterviewers();
        candidate.interviewId = interview.id;
        candidate.employeeId = faker_1.faker.helpers.arrayElement(tenantEmployees).id;
        candidate.tenant = tenant;
        candidate.organization = organization;
        candidates.push(candidate);
    }
    await dataSource.manager.save(candidates);
    return candidates;
};
//# sourceMappingURL=candidate-interviewers.seed.js.map