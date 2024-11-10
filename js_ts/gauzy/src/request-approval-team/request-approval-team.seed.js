"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomRequestApprovalTeam = void 0;
const request_approval_team_entity_1 = require("./request-approval-team.entity");
const faker_1 = require("@faker-js/faker");
const internal_1 = require("./../core/entities/internal");
const createRandomRequestApprovalTeam = async (dataSource, tenants, tenantOrganizationsMap) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, Request Approval Team  will not be created');
        return;
    }
    const requestApprovalTeams = [];
    for await (const tenant of tenants) {
        const { id: tenantId } = tenant;
        const organizations = tenantOrganizationsMap.get(tenant);
        for await (const organization of organizations) {
            const { id: organizationId } = organization;
            const approvalPolicies = await dataSource.manager.find(internal_1.ApprovalPolicy, {
                where: {
                    organizationId,
                    tenantId
                }
            });
            const organizationTeams = await dataSource.manager.find(internal_1.OrganizationTeam, {
                where: {
                    organizationId,
                    tenantId
                }
            });
            for (const approvalPolicy of approvalPolicies) {
                const { id: approvalPolicyId } = approvalPolicy;
                const requestApprovals = await dataSource.manager.find(internal_1.RequestApproval, {
                    where: {
                        approvalPolicyId,
                        organizationId,
                        tenantId
                    }
                });
                for await (const requestApproval of requestApprovals) {
                    for await (const organizationTeam of organizationTeams) {
                        const requestApprovalTeam = new request_approval_team_entity_1.RequestApprovalTeam();
                        requestApprovalTeam.requestApproval = requestApproval;
                        requestApprovalTeam.team = organizationTeam;
                        requestApprovalTeam.tenant = tenant;
                        requestApprovalTeam.organization = organization;
                        requestApprovalTeam.status = faker_1.faker.number.int(3);
                        requestApprovalTeams.push(requestApprovalTeam);
                    }
                }
            }
        }
    }
    return await dataSource.manager.save(requestApprovalTeams);
};
exports.createRandomRequestApprovalTeam = createRandomRequestApprovalTeam;
//# sourceMappingURL=request-approval-team.seed.js.map