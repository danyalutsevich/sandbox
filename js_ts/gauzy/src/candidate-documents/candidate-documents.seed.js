"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomCandidateDocuments = exports.createCandidateDocuments = void 0;
const faker_1 = require("@faker-js/faker");
const internal_1 = require("./../core/entities/internal");
const default_candidate_documents_1 = require("./default-candidate-documents");
const createCandidateDocuments = async (dataSource, tenant, candidates, organization) => {
    if (!candidates) {
        console.warn('Warning: candidates not found, CandidateDocuments will not be created');
        return;
    }
    let defaultCandidateDocuments = [];
    for (const candidate of candidates) {
        const { id: organizationId } = organization;
        const { id: tenantId } = tenant;
        const { id: candidateId } = candidate;
        const documents = default_candidate_documents_1.DEFAULT_CANDIDATE_DOCUMENTS.map((document) => ({
            name: document.name,
            documentUrl: document.documentUrl,
            candidateId: candidateId,
            tenantId: tenantId,
            organizationId: organizationId
        }));
        defaultCandidateDocuments = [
            ...defaultCandidateDocuments,
            ...documents
        ];
    }
    await insertCandidateDocuments(dataSource, defaultCandidateDocuments);
    return defaultCandidateDocuments;
};
exports.createCandidateDocuments = createCandidateDocuments;
const createRandomCandidateDocuments = async (dataSource, tenants, tenantCandidatesMap) => {
    if (!tenantCandidatesMap) {
        console.warn('Warning: tenantCandidatesMap not found, CandidateDocuments will not be created');
        return;
    }
    let candidateDocuments = [];
    const candidateDocumentsMap = new Map();
    for await (const tenant of tenants || []) {
        const { id: tenantId } = tenant;
        const organizations = await dataSource.manager.findBy(internal_1.Organization, {
            tenantId: tenantId
        });
        const candidates = tenantCandidatesMap.get(tenant);
        for (const candidate of candidates || []) {
            const { id: candidateId } = candidate;
            const documents = default_candidate_documents_1.DEFAULT_CANDIDATE_DOCUMENTS.map((document) => ({
                name: document.name,
                documentUrl: document.documentUrl,
                candidateId: candidateId,
                organization: faker_1.faker.helpers.arrayElement(organizations),
                tenantId: tenantId
            }));
            candidateDocumentsMap.set(candidate, documents);
            candidateDocuments = [...candidateDocuments, ...documents];
        }
    }
    await insertCandidateDocuments(dataSource, candidateDocuments);
    return candidateDocumentsMap;
};
exports.createRandomCandidateDocuments = createRandomCandidateDocuments;
const insertCandidateDocuments = async (dataSource, candidateDocuments) => {
    await dataSource
        .createQueryBuilder()
        .insert()
        .into(internal_1.CandidateDocument)
        .values(candidateDocuments)
        .execute();
};
//# sourceMappingURL=candidate-documents.seed.js.map