"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultStatuses = void 0;
const index_1 = require("../../../plugins/config/dist/index");
const utils_1 = require("./../../core/seeds/utils");
const default_global_statuses_1 = require("./default-global-statuses");
const status_entity_1 = require("./status.entity");
const config = (0, index_1.getConfig)();
/**
 * Default global system status
 *
 * @param dataSource
 * @returns
 */
const createDefaultStatuses = async (dataSource) => {
    await (0, utils_1.cleanAssets)(config, 'ever-icons/task-statuses');
    let statuses = [];
    for await (const status of default_global_statuses_1.DEFAULT_GLOBAL_STATUSES) {
        statuses.push(new status_entity_1.TaskStatus({
            ...status,
            icon: (0, utils_1.copyAssets)(status.icon, config)
        }));
    }
    return await dataSource.manager.save(statuses);
};
exports.createDefaultStatuses = createDefaultStatuses;
//# sourceMappingURL=status.seed.js.map