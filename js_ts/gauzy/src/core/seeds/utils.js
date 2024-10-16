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
exports.getEmailWithPostfix = exports.cleanAssets = exports.copyAssets = void 0;
const index_1 = require("../../../plugins/config/dist/index");
const chalk_1 = __importDefault(require("chalk"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const rimraf_1 = __importDefault(require("rimraf"));
/**
 * Copy ever icons
 *
 * @param fileName
 * @param config
 * @returns
 */
function copyAssets(filename, config, destDir = 'ever-icons') {
    try {
        const dir = index_1.environment.isElectron
            ? path.join(index_1.environment.gauzySeedPath, destDir)
            : path.join(config.assetOptions.assetPath, ...['seed', destDir]) ||
                path.resolve(__dirname, '../../../', ...['apps', 'api', 'src', 'assets', 'seed', destDir]);
        const baseDir = index_1.environment.isElectron
            ? path.resolve(index_1.environment.gauzyUserPath, ...['public'])
            : config.assetOptions.assetPublicPath || path.resolve(__dirname, '../../../', ...['apps', 'api', 'public']);
        const filepath = filename.replace(/\\/g, '/');
        // create folders all the way down
        const folders = filepath.split('/').slice(0, -1); // remove last item, filename
        folders.reduce((acc, folder) => {
            const folderPath = path.join(acc, folder);
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }
            return folderPath;
        }, path.join(baseDir, destDir));
        // copy files from source to destination folder
        const destFilePath = path.join(destDir, filename);
        fs.copyFileSync(path.join(dir, filename), path.join(baseDir, destFilePath));
        return destFilePath;
    }
    catch (error) {
        console.log('Error while copy ever icons for seeder', error);
    }
}
exports.copyAssets = copyAssets;
/**
 * Clean old ever icons
 *
 * @param config
 * @param destDir
 */
async function cleanAssets(config, destDir) {
    console.log(chalk_1.default.green(`CLEANING UP SEED ASSETS FOR ${destDir}`));
    try {
        const dir = index_1.environment.isElectron
            ? path.resolve(index_1.environment.gauzyUserPath, ...['public', destDir])
            : path.join(config.assetOptions.assetPublicPath, destDir);
        // delete old generated ever icons
        await new Promise((resolve, reject) => {
            // Update rimraf usage
            (0, rimraf_1.default)(dir, (err) => {
                if (err) {
                    console.error('Error while cleaning up ever icons', err);
                    reject(err);
                }
                else {
                    console.log(chalk_1.default.green(`CLEANED UP SEED ASSETS`));
                    resolve();
                }
            });
        });
    }
    catch (error) {
        console.error('Error while cleaning up ever icons', error);
    }
}
exports.cleanAssets = cleanAssets;
/**
 * Takes an email string, converts it to lowercase, and appends a postfix "_ever_testing" before the "@" symbol.
 *
 * @param email The email address to modify.
 * @param postfix The postfix to append (default is "_ever_testing").
 * @returns The modified email address with the postfix appended before the "@" symbol.
 */
function getEmailWithPostfix(email, postfix = '_ever_testing') {
    const atIndex = email.indexOf('@');
    if (atIndex === -1) {
        // If "@" symbol not found, return original email
        return email;
    }
    const localPart = email.slice(0, atIndex); // Extract local part before "@"
    const domainPart = email.slice(atIndex); // Extract domain part including "@"
    const lowercaseLocalPart = localPart.toLowerCase();
    return lowercaseLocalPart + postfix + domainPart;
}
exports.getEmailWithPostfix = getEmailWithPostfix;
//# sourceMappingURL=utils.js.map