"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomCandidates = exports.createDefaultCandidates = void 0;
const internal_1 = require("./../core/entities/internal");
const createDefaultCandidates = async (dataSource, tenant, organization, users) => {
    const candidates = [];
    for await (const user of users) {
        const candidate = new internal_1.Candidate();
        candidate.organization = organization;
        candidate.user = user;
        candidate.isArchived = false;
        candidate.tenant = tenant;
        candidates.push(candidate);
    }
    return await insertCandidates(dataSource, candidates);
};
exports.createDefaultCandidates = createDefaultCandidates;
const createRandomCandidates = async (dataSource, tenants, tenantOrganizationsMap, tenantUsersMap, candidatesPerOrganization) => {
    const candidateMap = new Map();
    for await (const tenant of tenants) {
        const candidates = [];
        const randomUsers = tenantUsersMap.get(tenant).candidateUsers;
        const randomOrgs = tenantOrganizationsMap.get(tenant);
        const insertCandidatesInToOrganization = async (quantity, organization) => {
            for (let index = 0; index < quantity; index++) {
                const candidate = new internal_1.Candidate();
                candidate.tenant = tenant;
                candidate.organization = organization;
                candidate.isArchived = false;
                candidate.user = randomUsers.pop();
                if (candidate.user) {
                    candidates.push(candidate);
                }
            }
            await insertCandidates(dataSource, candidates);
        };
        for await (const org of randomOrgs) {
            if (randomUsers.length) {
                await insertCandidatesInToOrganization(candidatesPerOrganization, org);
            }
        }
        candidateMap.set(tenant, candidates);
    }
    return candidateMap;
};
exports.createRandomCandidates = createRandomCandidates;
const insertCandidates = async (dataSource, candidates) => {
    return await dataSource.manager.save(candidates);
};
//# sourceMappingURL=candidate.seed.js.map