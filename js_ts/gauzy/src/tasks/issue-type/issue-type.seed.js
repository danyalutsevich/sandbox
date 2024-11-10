"use strict";
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
exports.createDefaultIssueTypes = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const image_size_1 = require("image-size");
const index_1 = require("../../../plugins/config/dist/index");
const contracts_1 = require("../../../plugins/contracts");
const internal_1 = require("./../../core/entities/internal");
const utils_1 = require("./../../core/seeds/utils");
const default_global_issue_types_1 = require("./default-global-issue-types");
const issue_type_entity_1 = require("./issue-type.entity");
const index_2 = require("../../../plugins/config/dist/index");
/**
 * Default global system issue types
 *
 * @param dataSource
 * @returns
 */
const createDefaultIssueTypes = async (dataSource) => {
    await (0, utils_1.cleanAssets)((0, index_1.getConfig)(), path.join('ever-icons', 'task-issue-types'));
    let issueTypes = [];
    try {
        for await (const issueType of default_global_issue_types_1.DEFAULT_GLOBAL_ISSUE_TYPES) {
            const iconPath = (0, utils_1.copyAssets)(issueType.icon, (0, index_1.getConfig)());
            const baseDir = index_2.environment.isElectron
                ? path.resolve(index_2.environment.gauzyUserPath, ...['public'])
                : (0, index_1.getConfig)().assetOptions.assetPublicPath ||
                    path.resolve(__dirname, '../../../', ...['apps', 'api', 'public']);
            const absoluteFilePath = path.join(baseDir, iconPath);
            const { height = 0, width = 0 } = (0, image_size_1.imageSize)(absoluteFilePath);
            const { size } = fs.statSync(absoluteFilePath);
            const icon = new internal_1.ImageAsset();
            icon.name = issueType.name;
            icon.url = iconPath;
            icon.storageProvider = contracts_1.FileStorageProviderEnum.LOCAL;
            icon.height = height;
            icon.width = width;
            icon.size = size;
            const image = await dataSource.manager.save(icon);
            issueTypes.push(new issue_type_entity_1.IssueType({
                ...issueType,
                icon: iconPath,
                image
            }));
        }
    }
    catch (error) {
        console.log('Error while moving task issue type icons', error);
    }
    return await dataSource.manager.save(issueTypes);
};
exports.createDefaultIssueTypes = createDefaultIssueTypes;
//# sourceMappingURL=issue-type.seed.js.map