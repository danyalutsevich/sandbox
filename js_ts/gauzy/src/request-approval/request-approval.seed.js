"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomRequestApproval = exports.createDefaultRequestApprovalEmployee = void 0;
const faker_1 = require("@faker-js/faker");
const request_approval_entity_1 = require("./request-approval.entity");
const request_approval_employee_entity_1 = require("../request-approval-employee/request-approval-employee.entity");
const approval_policy_entity_1 = require("../approval-policy/approval-policy.entity");
const approvalTypes = [
    'Business Trip',
    'Contract Approval',
    'Payment for Software',
    'Car Rental',
    'Job Referral Award',
    'Best Employee Award',
    'Christmas Bonus',
    'Payment for Hardware',
    'Payment for Service Provider',
    'Loyalty Rewards',
    'Bonus',
    'Holiday Stay',
    'Payment for Electric gadgets',
    'Health Meal'
];
const createDefaultRequestApprovalEmployee = async (dataSource, defaultData) => {
    const requestApprovals = [];
    if (!defaultData.approvalPolicies) {
        console.warn('Warning: Approval Policies not found, Request Approval Employee  will not be created');
        return;
    }
    for await (const org of defaultData.orgs) {
        const requestApproval = new request_approval_entity_1.RequestApproval();
        requestApproval.name = faker_1.faker.helpers.arrayElement(approvalTypes);
        requestApproval.status = faker_1.faker.number.int({ min: 1, max: 3 });
        requestApproval.approvalPolicy = faker_1.faker.helpers.arrayElement(defaultData.approvalPolicies);
        requestApproval.min_count = faker_1.faker.number.int({ min: 1, max: 56 });
        requestApproval.createdBy = faker_1.faker.helpers.arrayElement(defaultData.employees).id;
        const requestApprovalEmployees = [];
        for await (const employee of faker_1.faker.helpers.arrayElements(defaultData.employees, 5)) {
            const defaultRequestApprovalEmployee = new request_approval_employee_entity_1.RequestApprovalEmployee();
            defaultRequestApprovalEmployee.requestApprovalId = faker_1.faker.helpers.arrayElement(defaultData.approvalPolicies).id;
            defaultRequestApprovalEmployee.employee = employee;
            defaultRequestApprovalEmployee.status = faker_1.faker.number.int(99);
            defaultRequestApprovalEmployee.tenant = org.tenant;
            defaultRequestApprovalEmployee.organization = org;
            requestApprovalEmployees.push(defaultRequestApprovalEmployee);
        }
        requestApproval.employeeApprovals = requestApprovalEmployees;
        requestApproval.tenant = org.tenant;
        requestApproval.organization = org;
        requestApprovals.push(requestApproval);
    }
    await dataSource.manager.save(requestApprovals);
};
exports.createDefaultRequestApprovalEmployee = createDefaultRequestApprovalEmployee;
const createRandomRequestApproval = async (dataSource, tenants, tenantOrganizationsMap, organizationEmployeesMap, noOfRequestsPerOrganizations) => {
    const requestApprovals = [];
    for await (const tenant of tenants || []) {
        const { id: tenantId } = tenant;
        const organizations = tenantOrganizationsMap.get(tenant);
        for await (const organization of organizations) {
            const employees = organizationEmployeesMap.get(organization);
            const policies = await dataSource.manager.find(approval_policy_entity_1.ApprovalPolicy, {
                where: {
                    tenantId,
                    organizationId: organization.id
                }
            });
            for (let i = 0; i < noOfRequestsPerOrganizations; i++) {
                const tenantPolicy = faker_1.faker.helpers.arrayElement(policies);
                const specificEmployees = employees
                    .sort(() => Math.random() - Math.random())
                    .slice(0, 3);
                const requestApproval = new request_approval_entity_1.RequestApproval();
                requestApproval.name = faker_1.faker.helpers.arrayElement(approvalTypes);
                requestApproval.status = faker_1.faker.number.int({ min: 1, max: 3 });
                requestApproval.approvalPolicy = tenantPolicy;
                requestApproval.min_count = faker_1.faker.number.int({ min: 1, max: 56 });
                requestApproval.createdBy = faker_1.faker.helpers.arrayElement(specificEmployees).id;
                const requestApprovalEmployees = [];
                for await (const employee of specificEmployees) {
                    const raEmployees = new request_approval_employee_entity_1.RequestApprovalEmployee();
                    raEmployees.employee = employee;
                    raEmployees.tenant = tenant;
                    raEmployees.organization = organization;
                    raEmployees.status = requestApproval.status;
                    requestApprovalEmployees.push(raEmployees);
                }
                requestApproval.employeeApprovals = requestApprovalEmployees;
                requestApproval.tenant = tenant;
                requestApproval.organization = organization;
                requestApprovals.push(requestApproval);
            }
        }
    }
    await dataSource
        .createQueryBuilder()
        .insert()
        .into(request_approval_entity_1.RequestApproval)
        .values(requestApprovals)
        .execute();
};
exports.createRandomRequestApproval = createRandomRequestApproval;
//# sourceMappingURL=request-approval.seed.js.map