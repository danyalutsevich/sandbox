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
exports.LocalProvider = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = __importDefault(require("multer"));
const fs = __importStar(require("fs"));
const path_1 = require("path");
const moment_1 = __importDefault(require("moment"));
const contracts_1 = require("../../../../plugins/contracts");
const config_1 = require("../../../../plugins/config");
const provider_1 = require("./provider");
const config = (0, config_1.getConfig)();
const apiPublicPath = (0, path_1.resolve)(process.cwd(), 'apps', 'api', 'public');
/**
 *
 */
class LocalProvider extends provider_1.Provider {
    instance;
    name = contracts_1.FileStorageProviderEnum.LOCAL;
    config = {
        rootPath: (config_1.environment.isElectron ? (0, path_1.resolve)(config_1.environment.gauzyUserPath, 'public') : config.assetOptions.assetPublicPath) || apiPublicPath,
        baseUrl: config_1.environment.baseUrl
    };
    /**
     * Get the singleton instance of LocalProvider
     * @returns {LocalProvider} The singleton instance
     */
    getProviderInstance() {
        if (!this.instance) {
            this.instance = new LocalProvider();
        }
        return this.instance;
    }
    /**
     * Generates a URL for a given file URL.
     * If the file URL is already an external URL (starts with 'http'), returns the original URL.
     * If the file URL is relative, constructs a URL using the 'public' directory and the base URL from the configuration.
     *
     * @param fileURL - The file URL for which to generate a URL.
     * @returns A Promise resolving to a string representing the generated URL.
     */
    async url(fileURL) {
        // If the file URL is already an external URL, return the original URL
        if (!fileURL || fileURL.startsWith('http')) {
            return fileURL;
        }
        // If the file URL is relative, construct a URL using the 'public' directory and the base URL from the configuration
        return new URL((0, path_1.join)('public', fileURL), this.config.baseUrl).toString();
    }
    /**
     * Gets the full path of the file storage by joining the root path with the provided file path.
     *
     * @param filePath - The file path for which to get the full path.
     * @returns The full path of the file storage or null if the file path is falsy.
     */
    path(filePath) {
        // If the file path is truthy, join it with the root path; otherwise, return null
        return filePath ? (0, path_1.join)(this.config.rootPath, filePath) : null;
    }
    /**
     * Creates and returns a multer storage engine based on the provided options.
     *
     * @param options - The options for configuring the multer storage engine.
     * @returns A multer storage engine.
     */
    handler(options) {
        const { dest, filename, prefix = 'file' } = options;
        try {
            return multer_1.default.diskStorage({
                destination: (_req, file, callback) => {
                    // A string or function that determines the destination path for uploaded
                    const dir = dest instanceof Function ? dest(file) : dest;
                    // Ensure the destination directory exists, create if not
                    const fullPath = (0, path_1.join)(this.config.rootPath, dir);
                    fs.mkdirSync(fullPath, { recursive: true });
                    callback(null, fullPath);
                },
                filename: (_req, file, callback) => {
                    // A file extension, or filename extension, is a suffix at the end of a file
                    const extension = file.originalname.split('.').pop();
                    /**
                     * A function that determines the name of the uploaded file.
                     * Simplified and optimized filename assignment
                     */
                    let fileName = filename
                        ? typeof filename === 'string'
                            ? filename
                            : filename(file, extension)
                        : `${prefix}-${(0, moment_1.default)().unix()}-${parseInt('' + Math.random() * 1000, 10)}.${extension}`;
                    callback(null, fileName);
                }
            });
        }
        catch (error) {
            console.error(`Error while creating multer disk storage:`, error);
            return null;
        }
    }
    /**
     * Reads the content of the file asynchronously and returns a Promise resolving to a Buffer.
     *
     * @param file - The file path.
     * @returns A Promise resolving to a Buffer containing the file data.
     */
    async getFile(file) {
        try {
            return await fs.promises.readFile(this.path(file));
        }
        catch (error) {
            console.error(`Error while reading file "${file}":`, error);
        }
    }
    /**
     * Writes the file content to the specified path asynchronously and returns a Promise resolving to an UploadedFile.
     *
     * @param fileContent - The content of the file.
     * @param path - The path where the file will be stored.
     * @returns A Promise resolving to an UploadedFile.
     */
    async putFile(fileContent, path = '') {
        try {
            const fullPath = (0, path_1.join)(this.config.rootPath, path);
            await fs.promises.writeFile(fullPath, fileContent);
            const stats = await fs.promises.stat(fullPath);
            const baseName = (0, path_1.basename)(path);
            const file = {
                originalname: baseName,
                size: stats.size,
                filename: baseName,
                path: fullPath // Full path of the file
            };
            return await this.mapUploadedFile(file);
        }
        catch (error) {
            console.error(`Error while putting file at path "${path}":`, error);
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST, {
                description: `Error while putting file at path "${path}":`
            });
        }
    }
    /**
     * Deletes the file asynchronously.
     *
     * @param file - The file path.
     * @returns A Promise that resolves when the file is deleted successfully.
     */
    async deleteFile(file) {
        try {
            const filePath = this.path(file);
            // Check if the file exists before attempting to delete
            if (fs.existsSync(filePath)) {
                return fs.unlinkSync(filePath);
            }
        }
        catch (error) {
            console.error(`Error while deleting file "${file}":`, error);
            throw error; // Rethrow the error to let the calling code handle it
        }
    }
    /**
     * Map a partial UploadedFile object to include filename and URL.
     *
     * @param file - The partial UploadedFile object to map
     * @returns The mapped file object
     */
    async mapUploadedFile(file) {
        const separator = process.platform === 'win32' ? '\\' : '/';
        if (file.path) {
            file.key = file.path.replace(`${this.config.rootPath}${separator}`, '');
        }
        file.url = await this.url(file.key);
        return file;
    }
}
exports.LocalProvider = LocalProvider;
//# sourceMappingURL=local.provider.js.map