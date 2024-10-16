"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomCandidateEducations = exports.createCandidateEducations = void 0;
const faker_1 = require("@faker-js/faker");
const default_candidate_educations_1 = require("./default-candidate-educations");
const internal_1 = require("./../core/entities/internal");
const createCandidateEducations = async (dataSource, tenant, candidates) => {
    if (!candidates) {
        console.warn('Warning: candidates not found, CandidateEducation will not be created');
        return;
    }
    let defaultCandidateEducation = [];
    for (const candidate of candidates) {
        const { id: candidateId } = candidate;
        const educations = default_candidate_educations_1.DEFAULT_CANDIDATE_EDUCATIONS.map((education) => ({
            schoolName: education.schoolName,
            degree: education.degree,
            completionDate: education.completionDate,
            field: education.field,
            candidateId: candidateId,
            organization: candidate.organization,
            tenant: tenant,
            notes: faker_1.faker.lorem.sentence()
        }));
        defaultCandidateEducation = [
            ...defaultCandidateEducation,
            ...educations
        ];
    }
    await insertCandidateEducations(dataSource, defaultCandidateEducation);
    return defaultCandidateEducation;
};
exports.createCandidateEducations = createCandidateEducations;
const createRandomCandidateEducations = async (dataSource, tenants, tenantCandidatesMap) => {
    if (!tenantCandidatesMap) {
        console.warn('Warning: tenantCandidatesMap not found, CandidateEducation will not be created');
        return;
    }
    let candidateEducation = [];
    const candidateEducationsMap = new Map();
    for await (const tenant of tenants || []) {
        const { id: tenantId } = tenant;
        const organizations = await dataSource.manager.findBy(internal_1.Organization, {
            tenantId
        });
        const candidates = tenantCandidatesMap.get(tenant);
        for (const candidate of candidates) {
            const { id: candidateId } = candidate;
            const educations = default_candidate_educations_1.DEFAULT_CANDIDATE_EDUCATIONS.map((education) => ({
                schoolName: education.schoolName,
                degree: education.degree,
                completionDate: education.completionDate,
                field: education.field,
                candidateId: candidateId,
                organization: faker_1.faker.helpers.arrayElement(organizations),
                tenantId: tenantId,
                notes: faker_1.faker.lorem.sentence()
            }));
            candidateEducationsMap.set(candidate, educations);
            candidateEducation = [
                ...default_candidate_educations_1.DEFAULT_CANDIDATE_EDUCATIONS,
                ...educations
            ];
        }
    }
    await insertCandidateEducations(dataSource, candidateEducation);
    return candidateEducationsMap;
};
exports.createRandomCandidateEducations = createRandomCandidateEducations;
const insertCandidateEducations = async (dataSource, educations) => {
    await dataSource
        .createQueryBuilder()
        .insert()
        .into(internal_1.CandidateEducation)
        .values(educations)
        .execute();
};
//# sourceMappingURL=candidate-education.seed.js.map