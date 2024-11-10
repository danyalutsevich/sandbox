/// <reference types="node" />
import * as multer from 'multer';
import { FileStorageOption, FileStorageProviderEnum, FileSystem, UploadedFile } from '../../../../plugins/contracts';
import { ICloudinaryConfig } from '../../../../plugins/common';
import { Provider } from './provider';
export declare class CloudinaryProvider extends Provider<CloudinaryProvider> {
    instance: CloudinaryProvider;
    readonly name = FileStorageProviderEnum.CLOUDINARY;
    config: ICloudinaryConfig & FileSystem;
    private readonly _detailedloggingEnabled;
    constructor();
    /**
     * Get the singleton instance of CloudinaryProvider
     * @returns {CloudinaryProvider} The singleton instance
     */
    getProviderInstance(): CloudinaryProvider;
    /**
     * Retrieves and configures a Cloudinary instance based on the provided configuration.
     * The configuration includes cloud_name, api_key, api_secret, and secure settings.
     *
     * @returns ConfigOptions | undefined - The Cloudinary configuration object or undefined in case of an error.
     */
    private getCloudinaryInstance;
    /**
     * Sets default Cloudinary configuration values based on environment settings.
     * This function initializes the configuration object with values such as rootPath, baseUrl,
     * cloud_name, api_key, api_secret, and secure, using the provided environment configuration.
     */
    setDefaultConfiguration(): void;
    /**
     * Sets Cloudinary configuration by updating the existing configuration with values from the current request's tenant settings.
     * The function uses default values and trims/validates the obtained settings before updating the configuration.
     */
    setCloudinaryConfiguration(): void;
    /**
     * Multer storage engine handler for Cloudinary.
     *
     * @param options - File storage options, including destination, filename, and prefix
     * @returns multer.StorageEngine - Configured Cloudinary storage engine
     */
    handler(options: FileStorageOption): multer.StorageEngine;
    /**
     * Generates a complete URL for a file based on the provided file URL.
     *
     * @param fileURL - The file URL to generate a complete URL for
     * @returns Promise<string | null> - A promise resolving to the complete URL or null if input is invalid
     */
    url(fileURL: string): Promise<string | null>;
    /**
     * Generates a complete path or URL for a file based on the provided file path.
     *
     * @param filePath - The file path to generate a complete path or URL for
     * @returns string | null - The complete path or URL, or null if the input is invalid
     */
    path(filePath: string): string | null;
    /**
     * Retrieves a file from Cloudinary and returns it as a Buffer.
     *
     * @param file - The file identifier
     * @returns Promise<Buffer | any> - A promise resolving to the file content as a Buffer, or any if an error occurs
     */
    getFile(file: string): Promise<Buffer | any>;
    /**
     * Uploads a file to Cloudinary and returns information about the uploaded file.
     *
     * @param file - The file to be uploaded
     * @param path - The destination path for the uploaded file (default: '')
     * @returns Promise<UploadedFile> - A promise resolving to information about the uploaded file
     */
    putFile(file: any, path?: string): Promise<UploadedFile>;
    /**
     * Deletes a file from Cloudinary.
     *
     * @param file - The identifier of the file to delete
     * @returns Promise<void> - A promise indicating the success or failure of the deletion operation
     */
    deleteFile(file: string): Promise<void>;
    /**
     * Map uploaded file for cloudinary provider
     *
     * @param file
     * @returns
     */
    mapUploadedFile(file: any): Promise<UploadedFile>;
}
