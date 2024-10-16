"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultPriorities = void 0;
const index_1 = require("../../../plugins/config/dist/index");
const utils_1 = require("./../../core/seeds/utils");
const default_global_priorities_1 = require("./default-global-priorities");
const priority_entity_1 = require("./priority.entity");
const config = (0, index_1.getConfig)();
/**
 * Default global system priority
 *
 * @param dataSource
 * @returns
 */
const createDefaultPriorities = async (dataSource) => {
    await (0, utils_1.cleanAssets)(config, 'ever-icons/task-priorities');
    let priorities = [];
    for await (const priority of default_global_priorities_1.DEFAULT_GLOBAL_PRIORITIES) {
        priorities.push(new priority_entity_1.TaskPriority({
            ...priority,
            icon: (0, utils_1.copyAssets)(priority.icon, config)
        }));
    }
    return await dataSource.manager.save(priorities);
};
exports.createDefaultPriorities = createDefaultPriorities;
//# sourceMappingURL=priority.seed.js.map