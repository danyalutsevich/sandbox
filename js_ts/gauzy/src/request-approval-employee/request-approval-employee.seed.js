"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomRequestApprovalEmployee = void 0;
const faker_1 = require("@faker-js/faker");
const request_approval_employee_entity_1 = require("./request-approval-employee.entity");
const internal_1 = require("./../core/entities/internal");
const createRandomRequestApprovalEmployee = async (dataSource, tenants, tenantOrganizationsMap, organizationEmployeesMap) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, Request Approval Employee  will not be created');
        return;
    }
    if (!organizationEmployeesMap) {
        console.warn('Warning: organizationEmployeesMap not found, Request Approval Employee  will not be created');
        return;
    }
    for await (const tenant of tenants) {
        const { id: tenantId } = tenant;
        const tenantOrgs = tenantOrganizationsMap.get(tenant);
        for (const tenantOrg of tenantOrgs) {
            const { id: organizationId } = tenantOrg;
            const approvalPolicies = await dataSource.manager.find(internal_1.ApprovalPolicy, { where: { tenantId, organizationId } });
            const tenantEmployees = organizationEmployeesMap.get(tenantOrg);
            for (const tenantEmployee of tenantEmployees) {
                const requestApprovalEmployees = [];
                for (const approvalPolicy of approvalPolicies) {
                    const requestApprovals = await dataSource.manager.find(internal_1.RequestApproval, {
                        where: { approvalPolicyId: approvalPolicy.id }
                    });
                    for (const requestApproval of requestApprovals) {
                        const requestApprovalEmployee = new request_approval_employee_entity_1.RequestApprovalEmployee();
                        requestApprovalEmployee.requestApprovalId =
                            requestApproval.id;
                        requestApprovalEmployee.requestApproval = requestApproval;
                        // requestApprovalEmployee.employeeId = tenantEmployee.id;
                        requestApprovalEmployee.employee = tenantEmployee;
                        requestApprovalEmployee.status = faker_1.faker.number.int(99);
                        requestApprovalEmployee.tenant = tenant;
                        requestApprovalEmployee.organization = tenantOrg;
                        requestApprovalEmployees.push(requestApprovalEmployee);
                    }
                }
                await dataSource.manager.save(requestApprovalEmployees);
            }
        }
    }
};
exports.createRandomRequestApprovalEmployee = createRandomRequestApprovalEmployee;
//# sourceMappingURL=request-approval-employee.seed.js.map