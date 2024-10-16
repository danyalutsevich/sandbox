/// <reference types="node" />
import * as multer from 'multer';
import { FileStorageOption, UploadedFile } from '../../../../plugins/contracts';
import { Provider } from './provider';
/**
 *
 */
export declare class DebugProvider extends Provider<DebugProvider> {
    instance: DebugProvider;
    readonly name = "DEBUG";
    config: {
        rootPath: string;
        baseUrl: string;
    };
    /**
     * Get the singleton instance of LocalProvider
     * @returns {LocalProvider} The singleton instance
     */
    getProviderInstance(): DebugProvider;
    /**
     * Generates a URL for a given file URL.
     * If the file URL is already an external URL (starts with 'http'), returns the original URL.
     * If the file URL is relative, constructs a URL using the 'public' directory and the base URL from the configuration.
     *
     * @param fileURL - The file URL for which to generate a URL.
     * @returns A Promise resolving to a string representing the generated URL.
     */
    url(fileURL: string): Promise<string>;
    /**
     * Gets the full path of the file storage by joining the root path with the provided file path.
     *
     * @param filePath - The file path for which to get the full path.
     * @returns The full path of the file storage or null if the file path is falsy.
     */
    path(filePath: string): string | null;
    /**
     * Creates and returns a multer storage engine based on the provided options.
     *
     * @param options - The options for configuring the multer storage engine.
     * @returns A multer storage engine.
     */
    handler(options: FileStorageOption): multer.StorageEngine;
    /**
     * Reads the content of the file asynchronously and returns a Promise resolving to a Buffer.
     *
     * @param file - The file path.
     * @returns A Promise resolving to a Buffer containing the file data.
     */
    getFile(file: string): Promise<Buffer | any>;
    /**
     * Writes the file content to the specified path asynchronously and returns a Promise resolving to an UploadedFile.
     *
     * @param fileContent - The content of the file.
     * @param path - The path where the file will be stored.
     * @returns A Promise resolving to an UploadedFile.
     */
    putFile(fileContent: any, path?: string): Promise<UploadedFile>;
    /**
     * Deletes the file asynchronously.
     *
     * @param file - The file path.
     * @returns A Promise that resolves when the file is deleted successfully.
     */
    deleteFile(file: string): Promise<void>;
    /**
     * Map a partial UploadedFile object to include filename and URL.
     *
     * @param file - The partial UploadedFile object to map
     * @returns The mapped file object
     */
    mapUploadedFile(file: any): Promise<UploadedFile>;
}
