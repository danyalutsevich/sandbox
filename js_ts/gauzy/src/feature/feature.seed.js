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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomFeatureToggle = exports.createDefaultFeatureToggle = void 0;
const chalk = __importStar(require("chalk"));
const fs_1 = require("fs");
const path = __importStar(require("path"));
const rimraf_1 = __importDefault(require("rimraf"));
const index_1 = require("../../plugins/config/dist/index");
const default_features_1 = require("./default-features");
const feature_organization_entity_1 = require("./feature-organization.entity");
const feature_entity_1 = require("./feature.entity");
const createDefaultFeatureToggle = async (dataSource, config, tenant) => {
    await cleanFeature(dataSource, config);
    for await (const item of default_features_1.DEFAULT_FEATURES) {
        const feature = await createFeature(item, tenant, config);
        const parent = await dataSource.manager.save(feature);
        const { children = [] } = item;
        if (children.length > 0) {
            const featureChildren = [];
            for await (const child of children) {
                const childFeature = await createFeature(child, tenant, config);
                childFeature.parent = parent;
                featureChildren.push(childFeature);
            }
            await dataSource.manager.save(featureChildren);
        }
    }
    return await dataSource.getRepository(feature_entity_1.Feature).find();
};
exports.createDefaultFeatureToggle = createDefaultFeatureToggle;
const createRandomFeatureToggle = async (dataSource, tenants) => {
    const features = await dataSource.getRepository(feature_entity_1.Feature).find();
    const featureOrganizations = [];
    for await (const feature of features) {
        for await (const tenant of tenants) {
            const { isEnabled } = feature;
            const featureOrganization = new feature_organization_entity_1.FeatureOrganization({
                isEnabled,
                tenant,
                feature
            });
            featureOrganizations.push(featureOrganization);
        }
    }
    await dataSource.manager.save(featureOrganizations);
    return features;
};
exports.createRandomFeatureToggle = createRandomFeatureToggle;
async function createFeature(item, tenant, config) {
    const { name, code, description, image, link, isEnabled, status, icon } = item;
    const feature = new feature_entity_1.Feature({
        name,
        code,
        description,
        image: copyImage(image, config),
        link,
        status,
        icon,
        featureOrganizations: [
            new feature_organization_entity_1.FeatureOrganization({
                isEnabled,
                tenant
            })
        ]
    });
    return feature;
}
async function cleanFeature(dataSource, config) {
    switch (config.dbConnectionOptions.type) {
        case index_1.DatabaseTypeEnum.sqlite:
        case index_1.DatabaseTypeEnum.betterSqlite3:
            await dataSource.query('DELETE FROM feature');
            await dataSource.query('DELETE FROM feature_organization');
            break;
        case index_1.DatabaseTypeEnum.postgres:
            await dataSource.query('TRUNCATE TABLE feature RESTART IDENTITY CASCADE');
            await dataSource.query('TRUNCATE TABLE feature_organization RESTART IDENTITY CASCADE');
            break;
        case index_1.DatabaseTypeEnum.mysql:
            // -- disable foreign_key_checks to avoid query failing when there is a foreign key in the table
            await dataSource.query('SET foreign_key_checks = 0;');
            await dataSource.query('DELETE FROM feature;');
            await dataSource.query('DELETE FROM feature_organization;');
            await dataSource.query('SET foreign_key_checks = 1;');
            break;
        default:
            throw Error(`
				cannot clean feature, feature_organization tables due to unsupported database type:
				${config.dbConnectionOptions.type}
			`);
    }
    console.log(chalk.green(`CLEANING UP FEATURE IMAGES...`));
    await new Promise((resolve, reject) => {
        const destDir = 'features';
        const configService = new index_1.ConfigService();
        let dir;
        if (index_1.environment.isElectron) {
            dir = path.resolve(index_1.environment.gauzyUserPath, ...['public', destDir]);
        }
        else {
            dir = path.join(configService.assetOptions.assetPublicPath, destDir);
        }
        // delete old generated feature image
        (0, rimraf_1.default)(`${dir}/!(rimraf|.gitkeep)`, (error) => {
            if (error) {
                console.log(chalk.red(`Error cleaning up feature images: ${error.message}`));
                reject(error);
            }
            else {
                console.log(chalk.green(`CLEANED UP FEATURE IMAGES`));
                resolve(null);
            }
        });
    });
}
function copyImage(fileName, config) {
    try {
        const destDir = 'features';
        let dir;
        let baseDir;
        if (index_1.environment.isElectron) {
            dir = path.resolve(index_1.environment.gauzySeedPath, destDir);
            baseDir = path.resolve(index_1.environment.gauzyUserPath, ...['public']);
        }
        else {
            if (config.assetOptions.assetPath) {
                dir = path.join(config.assetOptions.assetPath, ...['seed', destDir]);
            }
            else {
                dir = path.resolve(__dirname, '../../../', ...['apps', 'api', 'src', 'assets', 'seed', destDir]);
            }
            if (config.assetOptions.assetPublicPath) {
                baseDir = config.assetOptions.assetPublicPath;
            }
            else {
                baseDir = path.resolve(__dirname, '../../../', ...['apps', 'api', 'public']);
            }
        }
        const finalDir = path.join(baseDir, destDir);
        (0, fs_1.mkdirSync)(finalDir, { recursive: true });
        const destFilePath = path.join(destDir, fileName);
        (0, fs_1.copyFileSync)(path.join(dir, fileName), path.join(baseDir, destFilePath));
        return destFilePath;
    }
    catch (err) {
        console.log(err);
    }
}
//# sourceMappingURL=feature.seed.js.map