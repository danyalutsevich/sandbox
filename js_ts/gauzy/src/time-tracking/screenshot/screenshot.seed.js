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
exports.createRandomScreenshot = void 0;
const faker_1 = require("@faker-js/faker");
const index_1 = require("../../../plugins/config/dist/index");
const contracts_1 = require("../../../plugins/contracts");
const fs_1 = require("fs");
const moment_1 = __importDefault(require("moment"));
const path = __importStar(require("path"));
const internal_1 = require("../../core/entities/internal");
const random_seed_config_1 = require("./../../core/seeds/random-seed-config");
const activity_seed_1 = require("./../activity/activity.seed");
let fileList = [];
const createRandomScreenshot = async (config, tenantId, organizationId, startedAt, stoppedAt) => {
    const destDirName = 'screenshots';
    let dir;
    let baseDir;
    if (index_1.environment.isElectron) {
        dir = path.join(index_1.environment.gauzySeedPath, destDirName);
        baseDir = path.join(path.resolve(index_1.environment.gauzyUserPath));
    }
    else {
        if (config.assetOptions.assetPath) {
            dir = path.join(config.assetOptions.assetPath, ...['seed', destDirName]);
        }
        else {
            dir = path.resolve(__dirname, '../../../', ...['apps', 'api', 'src', 'assets', 'seed', destDirName]);
        }
        if (config.assetOptions.assetPublicPath) {
            baseDir = path.join(config.assetOptions.assetPublicPath, '../');
        }
        else {
            baseDir = path.resolve(__dirname, '../../../', ...['apps', 'api']);
        }
    }
    // console.log('SCREENSHOT SEED -> dir: ' + dir);
    // console.log('SCREENSHOT SEED -> baseDir: ' + baseDir);
    const fileDir = path.join(destDirName, (0, moment_1.default)().format('YYYY/MM/DD'), tenantId);
    const destDir = path.join('public', fileDir);
    const finalDir = path.join(baseDir, destDir);
    // console.log('SCREENSHOT SEED -> finalDir: ' + finalDir);
    (0, fs_1.mkdirSync)(finalDir, { recursive: true });
    await getList(dir);
    const screenshots = [];
    for (let index = 0; index < random_seed_config_1.randomSeedConfig.noOfScreenshotPerTimeSlot; index++) {
        const sourceFile = faker_1.faker.helpers.arrayElement(fileList);
        const sourceName = 'screenshot-' + (0, moment_1.default)().unix() + faker_1.faker.number.int(999) + '.png';
        const destFile = path.join(destDir, sourceName);
        const sourceFilePath = path.join(dir, sourceFile);
        const destFilePath = path.join(baseDir, destFile);
        (0, fs_1.copyFileSync)(sourceFilePath, destFilePath);
        const file = path.join(fileDir, sourceName);
        const screenshot = new internal_1.Screenshot();
        screenshot.tenantId = tenantId;
        screenshot.organizationId = organizationId;
        screenshot.fullUrl = file;
        screenshot.file = file;
        screenshot.thumb = file;
        screenshot.thumbUrl = file;
        screenshot.recordedAt = faker_1.faker.date.between({ from: startedAt, to: stoppedAt });
        screenshot.storageProvider = contracts_1.FileStorageProviderEnum.LOCAL;
        screenshot.isWorkRelated = faker_1.faker.helpers.arrayElement([true, false]);
        screenshot.apps = faker_1.faker.helpers.arrayElements(activity_seed_1.AppsNames, 2);
        screenshot.description = faker_1.faker.lorem.sentences({ min: 1, max: 3 });
        screenshots.push(screenshot);
    }
    return screenshots;
};
exports.createRandomScreenshot = createRandomScreenshot;
const getList = (dir) => {
    return new Promise((resolve, reject) => {
        (0, fs_1.readdir)(dir, (err, items) => {
            if (err) {
                reject();
            }
            else {
                fileList = items;
                resolve(items);
            }
        });
    });
};
//# sourceMappingURL=screenshot.seed.js.map