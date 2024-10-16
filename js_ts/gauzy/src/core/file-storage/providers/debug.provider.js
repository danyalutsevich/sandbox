"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugProvider = void 0;
const path_1 = require("path");
const config_1 = require("../../../../plugins/config");
const provider_1 = require("./provider");
const config = (0, config_1.getConfig)();
const apiPublicPath = (0, path_1.resolve)(process.cwd(), 'apps', 'api', 'public');
/**
 *
 */
class DebugProvider extends provider_1.Provider {
    instance;
    name = 'DEBUG';
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
            this.instance = new DebugProvider();
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
        return null;
    }
    /**
     * Reads the content of the file asynchronously and returns a Promise resolving to a Buffer.
     *
     * @param file - The file path.
     * @returns A Promise resolving to a Buffer containing the file data.
     */
    async getFile(file) {
        return null;
    }
    /**
     * Writes the file content to the specified path asynchronously and returns a Promise resolving to an UploadedFile.
     *
     * @param fileContent - The content of the file.
     * @param path - The path where the file will be stored.
     * @returns A Promise resolving to an UploadedFile.
     */
    async putFile(fileContent, path = '') {
        return null;
    }
    /**
     * Deletes the file asynchronously.
     *
     * @param file - The file path.
     * @returns A Promise that resolves when the file is deleted successfully.
     */
    async deleteFile(file) {
        return null;
    }
    /**
     * Map a partial UploadedFile object to include filename and URL.
     *
     * @param file - The partial UploadedFile object to map
     * @returns The mapped file object
     */
    async mapUploadedFile(file) {
        return null;
    }
}
exports.DebugProvider = DebugProvider;
//# sourceMappingURL=debug.provider.js.map