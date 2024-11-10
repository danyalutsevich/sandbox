"use strict";
// Modified code from https://github.com/alexitaylor/angular-graphql-nestjs-postgres-starter-kit.
// MIT License, see https://github.com/alexitaylor/angular-graphql-nestjs-postgres-starter-kit/blob/master/LICENSE
// Copyright (c) 2019 Alexi Taylor
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomUsers = exports.createDefaultUsers = exports.createRandomSuperAdminUsers = exports.createDefaultEmployeesUsers = exports.createDefaultAdminUsers = void 0;
const bcrypt = __importStar(require("bcrypt"));
const index_1 = require("../../plugins/config/dist/index");
const faker_1 = require("@faker-js/faker");
const index_2 = require("../../plugins/contracts/dist/index");
const utils_1 = require("../core/seeds/utils");
const user_entity_1 = require("./user.entity");
const core_1 = require("../core");
const default_employees_1 = require("../employee/default-employees");
const default_candidates_1 = require("../candidate/default-candidates");
const default_users_1 = require("./default-users");
const createDefaultAdminUsers = async (dataSource, tenant) => {
    // Super Admin Users
    const _defaultSuperAdminUsers = seedSuperAdminUsers(dataSource, tenant);
    // Admin Users
    const _defaultAdminUsers = seedAdminUsers(dataSource, tenant);
    const [defaultSuperAdminUsers, defaultAdminUsers] = await Promise.all([
        _defaultSuperAdminUsers,
        _defaultAdminUsers
    ]);
    await insertUsers(dataSource, [
        ...defaultSuperAdminUsers,
        ...defaultAdminUsers
    ]);
    return {
        defaultSuperAdminUsers,
        defaultAdminUsers
    };
};
exports.createDefaultAdminUsers = createDefaultAdminUsers;
const createDefaultEmployeesUsers = async (dataSource, tenant) => {
    // Employee Users
    const _defaultEmployeeUsers = seedDefaultEmployeeUsers(dataSource, tenant, default_employees_1.DEFAULT_EMPLOYEES);
    const [defaultEmployeeUsers] = await Promise.all([_defaultEmployeeUsers]);
    await insertUsers(dataSource, [...defaultEmployeeUsers]);
    return {
        defaultEmployeeUsers
    };
};
exports.createDefaultEmployeesUsers = createDefaultEmployeesUsers;
const createRandomSuperAdminUsers = async (dataSource, tenants, noOfSuperAdmins) => {
    const tenantSuperAdminsMap = new Map();
    const superAdmins = [];
    for await (const tenant of tenants) {
        const { id: tenantId } = tenant;
        const superAdminRole = await dataSource.manager.findOneBy(core_1.Role, {
            tenantId,
            name: index_2.RolesEnum.SUPER_ADMIN
        });
        const tenantSuperAdmins = [];
        // Generate random super admins
        for (let i = 0; i < noOfSuperAdmins; i++) {
            const superAdminUser = await generateRandomUser(superAdminRole, tenant);
            tenantSuperAdmins.push(superAdminUser);
            superAdmins.push(superAdminUser);
            console.log(superAdminUser);
        }
        tenantSuperAdminsMap.set(tenant, tenantSuperAdmins);
    }
    await insertUsers(dataSource, superAdmins);
    return tenantSuperAdminsMap;
};
exports.createRandomSuperAdminUsers = createRandomSuperAdminUsers;
const createDefaultUsers = async (dataSource, tenant) => {
    const _defaultEverEmployeeUsers = seedDefaultEmployeeUsers(dataSource, tenant, default_employees_1.DEFAULT_EVER_EMPLOYEES);
    const _defaultCandidateUsers = seedDefaultCandidateUsers(dataSource, tenant);
    const [defaultEverEmployeeUsers, defaultCandidateUsers] = await Promise.all([
        _defaultEverEmployeeUsers,
        _defaultCandidateUsers
    ]);
    await insertUsers(dataSource, [
        ...defaultEverEmployeeUsers,
        ...defaultCandidateUsers
    ]);
    return {
        defaultEverEmployeeUsers,
        defaultCandidateUsers
    };
};
exports.createDefaultUsers = createDefaultUsers;
const createRandomUsers = async (dataSource, tenants, adminPerOrganization, organizationsPerTenant, employeesPerOrganization, candidatesPerOrganization, managersPerOrganization, dataEntriesPerOrganization, viewersPerOrganization) => {
    const randomTenantUsers = new Map();
    for (const tenant of tenants) {
        const _adminUsers = seedRandomUsers(dataSource, index_2.RolesEnum.ADMIN, tenant, organizationsPerTenant * adminPerOrganization //Because we want to seed at least one admin per organization
        );
        const _employeeUsers = seedRandomUsers(dataSource, index_2.RolesEnum.EMPLOYEE, tenant, employeesPerOrganization * organizationsPerTenant);
        const _candidateUsers = seedRandomUsers(dataSource, index_2.RolesEnum.CANDIDATE, tenant, candidatesPerOrganization * organizationsPerTenant);
        const _managerUsers = seedRandomUsers(dataSource, index_2.RolesEnum.MANAGER, tenant, managersPerOrganization * organizationsPerTenant);
        const _dataEntryUsers = seedRandomUsers(dataSource, index_2.RolesEnum.DATA_ENTRY, tenant, dataEntriesPerOrganization * organizationsPerTenant);
        const _viewerUsers = seedRandomUsers(dataSource, index_2.RolesEnum.VIEWER, tenant, viewersPerOrganization * organizationsPerTenant);
        const [promiseAdminUsers, promiseEmployeeUsers, promiseCandidateUsers, promiseManagerUsers, promiseDataEntryUsers, promiseViewerUsers] = await Promise.all([
            _adminUsers,
            _employeeUsers,
            _candidateUsers,
            _managerUsers,
            _dataEntryUsers,
            _viewerUsers
        ]);
        const adminUsers = await insertUsers(dataSource, [
            ...promiseAdminUsers
        ]);
        const employeeUsers = await insertUsers(dataSource, [
            ...promiseEmployeeUsers
        ]);
        const candidateUsers = await insertUsers(dataSource, [
            ...promiseCandidateUsers
        ]);
        await insertUsers(dataSource, [
            ...promiseManagerUsers,
            ...promiseDataEntryUsers,
            ...promiseViewerUsers
        ]);
        randomTenantUsers.set(tenant, {
            adminUsers,
            employeeUsers,
            candidateUsers
        });
    }
    return randomTenantUsers;
};
exports.createRandomUsers = createRandomUsers;
const seedSuperAdminUsers = async (dataSource, tenant) => {
    const superAdmins = [];
    const { id: tenantId } = tenant;
    const superAdminRole = await dataSource.manager.findOneBy(core_1.Role, {
        tenantId,
        name: index_2.RolesEnum.SUPER_ADMIN
    });
    // Generate default super admins
    for (const superAdmin of default_users_1.DEFAULT_SUPER_ADMINS) {
        const superAdminUser = generateDefaultUser(superAdmin, superAdminRole, tenant);
        superAdmins.push(superAdminUser);
    }
    return Promise.all(superAdmins);
};
const seedAdminUsers = async (dataSource, tenant) => {
    const admins = [];
    const { id: tenantId } = tenant;
    const adminRole = await dataSource.manager.findOneBy(core_1.Role, {
        tenantId,
        name: index_2.RolesEnum.ADMIN
    });
    // Generate default admins
    for (const admin of default_users_1.DEFAULT_ADMINS) {
        const adminUser = generateDefaultUser(admin, adminRole, tenant);
        admins.push(adminUser);
    }
    return Promise.all(admins);
};
const seedDefaultEmployeeUsers = async (dataSource, tenant, employees) => {
    const { id: tenantId } = tenant;
    const employeeRole = await dataSource.manager.findOneBy(core_1.Role, {
        tenantId,
        name: index_2.RolesEnum.EMPLOYEE
    });
    const defaultUsers = [];
    // Generate default users
    for (const employee of employees) {
        const user = generateDefaultUser(employee, employeeRole, tenant);
        defaultUsers.push(user);
    }
    return Promise.all(defaultUsers);
};
const seedRandomUsers = async (dataSource, roleEnum, tenant, maxUserCount) => {
    const { id: tenantId } = tenant;
    const role = await dataSource.manager.findOneBy(core_1.Role, {
        tenantId,
        name: roleEnum
    });
    const randomUsers = [];
    let user;
    // Generate 50 random users
    for (let i = 0; i < maxUserCount; i++) {
        user = generateRandomUser(role, tenant);
        randomUsers.push(user);
    }
    return Promise.all(randomUsers);
};
const seedDefaultCandidateUsers = async (dataSource, tenant) => {
    const { id: tenantId } = tenant;
    const candidateRole = await dataSource.manager.findOneBy(core_1.Role, {
        tenantId,
        name: index_2.RolesEnum.CANDIDATE
    });
    const defaultCandidates = default_candidates_1.DEFAULT_CANDIDATES;
    const defaultCandidateUsers = [];
    let user;
    // Generate default candidate users
    for (const candidate of defaultCandidates) {
        user = generateDefaultUser(candidate, candidateRole, tenant);
        defaultCandidateUsers.push(user);
    }
    return Promise.all(defaultCandidateUsers);
};
const generateDefaultUser = async (defaultUser, role, tenant) => {
    const user = new user_entity_1.User();
    const { firstName, lastName, email, imageUrl, preferredLanguage, preferredComponentLayout = index_2.ComponentLayoutStyleEnum.TABLE } = defaultUser;
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.role = role;
    user.imageUrl = (0, core_1.getUserDummyImage)(user);
    user.imageUrl = imageUrl;
    user.tenant = tenant;
    user.preferredLanguage = preferredLanguage;
    user.preferredComponentLayout = preferredComponentLayout;
    user.emailVerifiedAt = new Date();
    user.hash = await bcrypt.hash(defaultUser.password, index_1.environment.USER_PASSWORD_BCRYPT_SALT_ROUNDS);
    return user;
};
const generateRandomUser = async (role, tenant) => {
    const firstName = faker_1.faker.person.firstName();
    const lastName = faker_1.faker.person.lastName();
    const username = faker_1.faker.internet.userName(firstName, lastName);
    const email = (0, utils_1.getEmailWithPostfix)(faker_1.faker.internet.exampleEmail(firstName, lastName));
    const avatar = faker_1.faker.image.avatar();
    const user = new user_entity_1.User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.email = email;
    user.role = role;
    user.imageUrl = avatar;
    user.tenant = tenant;
    user.preferredLanguage = getRandomLanguage();
    user.emailVerifiedAt = new Date();
    user.hash = await bcrypt.hash('123456', index_1.environment.USER_PASSWORD_BCRYPT_SALT_ROUNDS);
    return user;
};
/**
 * Get a randomly selected language from the LanguagesEnum.
 * @returns {LanguagesEnum} A randomly selected language.
 */
function getRandomLanguage() {
    const languages = Object.values(index_2.LanguagesEnum);
    const index = Math.floor(Math.random() * languages.length);
    return languages[index];
}
const insertUsers = async (dataSource, users) => {
    return await dataSource.manager.save(users);
};
//# sourceMappingURL=user.seed.js.map