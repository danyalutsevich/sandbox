"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const organization_create_handler_1 = require("./organization.create.handler");
const organization_update_handler_1 = require("./organization.update.handler");
exports.CommandHandlers = [
    organization_create_handler_1.OrganizationCreateHandler,
    organization_update_handler_1.OrganizationUpdateHandler
];
//# sourceMappingURL=index.js.map