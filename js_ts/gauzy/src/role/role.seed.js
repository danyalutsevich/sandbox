"use strict";
// Modified code from https://github.com/alexitaylor/angular-graphql-nestjs-postgres-starter-kit.
// MIT License, see https://github.com/alexitaylor/angular-graphql-nestjs-postgres-starter-kit/blob/master/LICENSE
// Copyright (c) 2019 Alexi Taylor
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoles = void 0;
const role_entity_1 = require("./role.entity");
const index_1 = require("../../plugins/contracts/dist/index");
const createRoles = async (dataSource, tenants) => {
    try {
        const roles = [];
        for (const tenant of tenants) {
            for (const name of Object.values(index_1.RolesEnum)) {
                const role = new role_entity_1.Role();
                role.name = name;
                role.tenant = tenant;
                role.isSystem = index_1.SYSTEM_DEFAULT_ROLES.includes(name);
                roles.push(role);
            }
        }
        return await dataSource.manager.save(roles);
    }
    catch (error) {
        console.log({ error });
    }
};
exports.createRoles = createRoles;
//# sourceMappingURL=role.seed.js.map