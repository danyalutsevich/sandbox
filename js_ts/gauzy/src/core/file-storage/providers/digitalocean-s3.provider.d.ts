/// <reference types="node" />
import { StorageEngine } from 'multer';
import { FileStorageOption, FileStorageProviderEnum, UploadedFile } from '../../../../plugins/contracts';
import { Provider } from './provider';
/**
 * Configuration interface for DigitalOcean storage.
 */
export interface IDigitalOceanProviderConfig {
    rootPath: string;
    digitalocean_access_key_id: string;
    digitalocean_secret_access_key: string;
    digitalocean_default_region: string;
    digitalocean_service_url: string;
    digitalocean_cdn_url: string;
    digitalocean_s3_bucket: string;
    digitalocean_s3_force_path_style: boolean;
}
export declare class DigitalOceanS3Provider extends Provider<DigitalOceanS3Provider> {
    readonly name = FileStorageProviderEnum.DIGITALOCEAN;
    instance: DigitalOceanS3Provider;
    config: IDigitalOceanProviderConfig;
    defaultConfig: IDigitalOceanProviderConfig;
    private readonly _detailedloggingEnabled;
    constructor();
    /**
     * Get the singleton instance of DigitalOceanS3Provider
     *
     * @returns {DigitalOceanS3Provider} The singleton instance
     */
    getProviderInstance(): DigitalOceanS3Provider;
    /**
     * Set DigitalOcean details based on the current request's tenantSettings.
     * If such settings does not have any DigitalOcean details, use the default configuration.
     * If they have DigitalOcean details, use them to override the default configuration.
     */
    private setDigitalOceanConfiguration;
    /**
     * Get a pre-signed URL for a given file URL.
     *
     * @param fileURL - The file URL for which to generate a pre-signed URL
     * @returns Pre-signed URL or null if the input is invalid
     */
    url(fileURL: string): Promise<string | null>;
    /**
     * Get the full path of the file in the storage.
     *
     * @param filePath - The file path to join with the root path
     * @returns Full path or null if filePath is falsy
     */
    path(filePath: string): string | null;
    /**
     * Create a Multer storage engine configured for AWS S3 (DigitalOcean).
     *
     * @param options - Configuration options for the storage engine
     * @returns A Multer storage engine
     */
    handler(options: FileStorageOption): StorageEngine;
    /**
     * Get a file from DigitalOcean storage.
     *
     * @param key - The key of the file to retrieve
     * @returns A Promise resolving to a Buffer containing the file data
     */
    getFile(key: string): Promise<Buffer | any>;
    /**
     * Upload a file to DigitalOcean storage.
     *
     * @param fileContent - The content of the file to upload
     * @param key - The key under which to store the file
     * @returns A Promise resolving to an UploadedFile, or undefined on error
     */
    putFile(fileContent: string, key?: string): Promise<UploadedFile>;
    /**
     * Delete a file from DigitalOcean storage.
     *
     * @param key - The key of the file to delete
     * @returns A Promise that resolves when the file is deleted successfully, or rejects with an error
     */
    deleteFile(key: string): Promise<Object | any>;
    /**
     * Get an AWS S3 instance configured with DigitalOcean details.
     *
     * @returns An AWS S3 instance or null in case of an error
     */
    private getDigitalOceanInstance;
    /**
     * Get the DigitalOcean bucket from the configuration.
     *
     * @returns The DigitalOcean bucket name or null if not configured
     */
    getDigitalOceanBucket(): string | null;
    /**
     * Map a partial UploadedFile object to include filename and URL.
     *
     * @param file - The partial UploadedFile object to map
     * @returns The mapped file object
     */
    mapUploadedFile(file: any): Promise<UploadedFile>;
}
