"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomOrganizationDocuments = exports.createOrganizationDocuments = void 0;
const organization_document_entity_1 = require("./organization-document.entity");
const createOrganizationDocuments = async (dataSource, tenant, organizations) => {
    const documents = [];
    for await (const organization of organizations) {
        const requestPaidDaysOff = new organization_document_entity_1.OrganizationDocument({
            name: 'Paid Days off Request',
            organization,
            tenant,
            documentUrl: `http://res.cloudinary.com/evereq/image/upload/v1595424362/everbie-products-images/qanadywgn3gxte7kwtwu.pdf`
        });
        const requestUnpaidDaysOff = new organization_document_entity_1.OrganizationDocument({
            name: 'Unpaid Days off Request',
            organization,
            tenant,
            documentUrl: `http://res.cloudinary.com/evereq/image/upload/v1595506200/everbie-products-images/am3ujibzu660swicfcsw.pdf`
        });
        documents.push(requestPaidDaysOff);
        documents.push(requestUnpaidDaysOff);
    }
    return await dataSource.manager.save(documents);
};
exports.createOrganizationDocuments = createOrganizationDocuments;
const createRandomOrganizationDocuments = async (dataSource, tenants, tenantOrganizationsMap) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, Organization Documents will not be created');
        return;
    }
    for await (const tenant of tenants) {
        const organizations = tenantOrganizationsMap.get(tenant);
        await (0, exports.createOrganizationDocuments)(dataSource, tenant, organizations);
    }
};
exports.createRandomOrganizationDocuments = createRandomOrganizationDocuments;
//# sourceMappingURL=organization-document.seed.js.map