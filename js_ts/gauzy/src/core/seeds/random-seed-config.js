"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomSeedConfig = void 0;
exports.randomSeedConfig = {
    tenants: parseInt(process.env.DB_SEED_RANDOM_TENANT) || 5,
    superAdminPerTenant: 1,
    adminPerOrganization: 1,
    organizationsPerTenant: 2,
    employeesPerOrganization: 5,
    candidatesPerOrganization: 2,
    managersPerOrganization: 2,
    dataEntriesPerOrganization: 4,
    viewersPerOrganization: 4,
    projectsPerOrganization: 30,
    emailsPerOrganization: 30,
    invitePerOrganization: 30,
    requestApprovalPerOrganization: 20,
    employeeTimeOffPerOrganization: 10,
    equipmentPerTenant: 20,
    equipmentSharingPerTenant: 20,
    proposalsSharingPerOrganizations: 30,
    contacts: 50,
    noOfHelpCenterArticle: 10,
    availabilitySlotsPerOrganization: 50,
    noOfTimesheetPerEmployee: 10,
    noOfTimeLogsPerTimeSheet: 5,
    noOfScreenshotPerTimeSlot: 2,
    numberOfOptionPerProduct: 5,
    numberOfOptionGroupPerProduct: 5,
    numberOfVariantPerProduct: 5,
    numberOfInvoicePerOrganization: 50,
    numberOfInvoiceItemPerInvoice: 10,
    numberOfInvoiceHistoryPerInvoice: 5,
    noOfRandomContacts: 10,
    noOfContactsPerOrganization: 10, // number of random organization contact
};
//# sourceMappingURL=random-seed-config.js.map