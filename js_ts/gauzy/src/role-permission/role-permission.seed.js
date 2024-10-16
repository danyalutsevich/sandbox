"use strict";
// Modified code from https://github.com/alexitaylor/angular-graphql-nestjs-postgres-starter-kit.
// MIT License, see https://github.com/alexitaylor/angular-graphql-nestjs-postgres-starter-kit/blob/master/LICENSE
// Copyright (c) 2019 Alexi Taylor
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRolePermissions = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/config/dist/index");
const default_role_permissions_1 = require("./default-role-permissions");
const role_permission_entity_1 = require("./role-permission.entity");
const createRolePermissions = async (dataSource, roles, tenants) => {
    // removed permissions for all users in DEMO mode
    const deniedPermissions = [index_1.PermissionsEnum.ACCESS_DELETE_ACCOUNT, index_1.PermissionsEnum.ACCESS_DELETE_ALL_DATA];
    for (const tenant of tenants) {
        const rolePermissions = [];
        default_role_permissions_1.DEFAULT_ROLE_PERMISSIONS.forEach(({ role: roleEnum, defaultEnabledPermissions }) => {
            const role = roles.find((dbRole) => dbRole.name === roleEnum && dbRole.tenant.name === tenant.name);
            if (role) {
                const permissions = Object.values(index_1.PermissionsEnum).filter((permission) => index_2.environment.demo ? !deniedPermissions.includes(permission) : true);
                for (const permission of permissions) {
                    const rolePermission = new role_permission_entity_1.RolePermission();
                    rolePermission.role = role;
                    rolePermission.permission = permission;
                    rolePermission.enabled = defaultEnabledPermissions.includes(permission);
                    rolePermission.tenant = tenant;
                    rolePermissions.push(rolePermission);
                }
            }
        });
        await dataSource.manager.save(rolePermissions);
    }
};
exports.createRolePermissions = createRolePermissions;
//# sourceMappingURL=role-permission.seed.js.map