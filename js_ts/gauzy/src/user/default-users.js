"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_ADMINS = exports.DEFAULT_SUPER_ADMINS = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/config/dist/index");
exports.DEFAULT_SUPER_ADMINS = [
    {
        email: `${index_2.environment.demoCredentialConfig.superAdminEmail}`,
        password: `${index_2.environment.demoCredentialConfig.superAdminPassword}`,
        firstName: 'Super',
        lastName: 'Admin',
        imageUrl: 'assets/images/avatars/avatar-default.svg',
        preferredLanguage: index_1.LanguagesEnum.ENGLISH,
        preferredComponentLayout: index_1.ComponentLayoutStyleEnum.TABLE
    }
];
exports.DEFAULT_ADMINS = [
    {
        email: `${index_2.environment.demoCredentialConfig.adminEmail}`,
        password: `${index_2.environment.demoCredentialConfig.adminPassword}`,
        firstName: 'Local',
        lastName: 'Admin',
        imageUrl: 'assets/images/avatars/avatar-default.svg',
        preferredLanguage: index_1.LanguagesEnum.ENGLISH,
        preferredComponentLayout: index_1.ComponentLayoutStyleEnum.TABLE
    }
];
//# sourceMappingURL=default-users.js.map