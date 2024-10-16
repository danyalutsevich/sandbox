"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomCandidateSources = exports.createCandidateSources = void 0;
const default_candidate_sources_1 = require("./default-candidate-sources");
const internal_1 = require("./../core/entities/internal");
const createCandidateSources = async (dataSource, tenant, candidates, organization) => {
    if (!candidates) {
        console.warn('Warning: candidates not found, CandidateSources will not be created');
        return;
    }
    let defaultCandidateSources = [];
    for (const candidate of candidates) {
        const rand = Math.floor(Math.random() * default_candidate_sources_1.DEFAULT_CANDIDATE_SOURCES.length);
        const sources = {
            name: default_candidate_sources_1.DEFAULT_CANDIDATE_SOURCES[rand].name,
            candidateId: candidate.id,
            ...{ organization, tenant }
        };
        defaultCandidateSources = [...defaultCandidateSources, sources];
    }
    await insertCandidateSources(dataSource, defaultCandidateSources);
    return defaultCandidateSources;
};
exports.createCandidateSources = createCandidateSources;
const createRandomCandidateSources = async (dataSource, tenants, tenantCandidatesMap) => {
    if (!tenantCandidatesMap) {
        console.warn('Warning: tenantCandidatesMap not found, CandidateSources will not be created');
        return;
    }
    let candidateSources = [];
    const candidateSourcesMap = new Map();
    for (const tenant of tenants) {
        const candidates = tenantCandidatesMap.get(tenant);
        const rand = Math.floor(Math.random() * default_candidate_sources_1.DEFAULT_CANDIDATE_SOURCES.length);
        for (const candidate of candidates) {
            const sources = {
                name: default_candidate_sources_1.DEFAULT_CANDIDATE_SOURCES[rand].name,
                candidateId: candidate.id,
                ...{ organization: candidate.organization, tenant }
            };
            candidateSourcesMap.set(candidate, sources);
            candidateSources = [...candidateSources, sources];
        }
    }
    await insertCandidateSources(dataSource, candidateSources);
    return candidateSourcesMap;
};
exports.createRandomCandidateSources = createRandomCandidateSources;
const insertCandidateSources = async (dataSource, candidateSources) => {
    await dataSource
        .createQueryBuilder()
        .insert()
        .into(internal_1.CandidateSource)
        .values(candidateSources)
        .execute();
};
//# sourceMappingURL=candidate-source.seed.js.map