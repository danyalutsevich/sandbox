"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISSUE_TIED_ENTITIES = exports.DEFAULT_ENTITY_SETTINGS = void 0;
const contracts_1 = require("../../../plugins/contracts");
exports.DEFAULT_ENTITY_SETTINGS = [
    {
        entity: contracts_1.IntegrationEntity.ISSUE,
        sync: true
    }
];
exports.ISSUE_TIED_ENTITIES = [
    {
        entity: contracts_1.IntegrationEntity.LABEL,
        sync: true
    }
];
//# sourceMappingURL=github-entity-settings.js.map