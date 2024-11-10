"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryHandlers = void 0;
const find_public_clients_by_organization_handler_1 = require("./find-public-clients-by-organization.handler");
const find_public_organization_handler_1 = require("./find-public-organization.handler");
exports.QueryHandlers = [
    find_public_clients_by_organization_handler_1.FindPublicClientsByOrganizationHandler,
    find_public_organization_handler_1.FindPublicOrganizationHandler
];
//# sourceMappingURL=index.js.map