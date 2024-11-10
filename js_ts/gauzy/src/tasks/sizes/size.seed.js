"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultSizes = void 0;
const index_1 = require("../../../plugins/config/dist/index");
const utils_1 = require("./../../core/seeds/utils");
const default_global_sizes_1 = require("./default-global-sizes");
const size_entity_1 = require("./size.entity");
const config = (0, index_1.getConfig)();
/**
 * Default global system sizes
 *
 * @param dataSource
 * @returns
 */
const createDefaultSizes = async (dataSource) => {
    await (0, utils_1.cleanAssets)(config, 'ever-icons/task-sizes');
    let sizes = [];
    for await (const size of default_global_sizes_1.DEFAULT_GLOBAL_SIZES) {
        sizes.push(new size_entity_1.TaskSize({
            ...size,
            icon: (0, utils_1.copyAssets)(size.icon, config)
        }));
    }
    return await dataSource.manager.save(sizes);
};
exports.createDefaultSizes = createDefaultSizes;
//# sourceMappingURL=size.seed.js.map