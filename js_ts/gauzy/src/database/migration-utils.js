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
exports.MigrationUtils = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const mkdirp_1 = require("mkdirp");
/**
 * Migration utils functions.
 * From https://github.com/typeorm/typeorm/blob/2bb0e398f922561f1cbb8ebbb19d20aa093e8bc2/src/commands/MigrationGenerateCommand.ts
 */
class MigrationUtils {
    /**
     * Creates directories recursively.
     */
    static createDirectories(directory) {
        return new Promise(async (resolve, reject) => {
            try {
                await (0, mkdirp_1.mkdirp)(directory);
                resolve();
            }
            catch (err) {
                return reject(err);
            }
        });
    }
    /**
     * Creates a file with the given content in the given path.
     */
    static async createFile(filePath, content, override = true) {
        await MigrationUtils.createDirectories(path.dirname(filePath));
        return new Promise((resolve, reject) => {
            if (override === false && fs.existsSync(filePath))
                return resolve();
            fs.writeFile(filePath, content, (err) => (err ? reject(err) : resolve()));
        });
    }
    /**
     * Reads everything from a given file and returns its content as a string.
     */
    static async readFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => (err ? fail(err) : resolve(data.toString())));
        });
    }
    static async fileExists(filePath) {
        return fs.existsSync(filePath);
    }
}
exports.MigrationUtils = MigrationUtils;
//# sourceMappingURL=migration-utils.js.map