"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_ORGANIZATION_TEAMS = void 0;
const index_1 = require("../../plugins/config/dist/index");
exports.DEFAULT_ORGANIZATION_TEAMS = [
    {
        name: 'Employees',
        defaultMembers: [
            `${index_1.environment.demoCredentialConfig.superAdminEmail}`,
            'ruslan@example-ever.co',
            'alish@example-ever.co',
            'julia@example-ever.co'
        ],
        manager: ['ruslan@example-ever.co']
    },
    {
        name: 'Contractors',
        defaultMembers: [
            'ckhandla94@gmail.com'
        ],
        manager: ['ruslan@example-ever.co']
    },
    {
        name: 'Designers',
        defaultMembers: ['julia@example-ever.co'],
        manager: []
    },
    {
        name: 'QA',
        defaultMembers: ['julia@example-ever.co'],
        manager: []
    },
    {
        name: 'Default Team',
        defaultMembers: [index_1.environment.demoCredentialConfig.employeeEmail],
        manager: [index_1.environment.demoCredentialConfig.superAdminEmail]
    }
];
//# sourceMappingURL=default-organization-teams.js.map