/// <reference types="node" />
import { StorageEngine } from 'multer';
import { FileStorageOption, FileStorageProviderEnum, UploadedFile } from '../../../../plugins/contracts';
import { Provider } from './provider';
/**
 * Configuration interface for Wasabi storage.
 */
export interface IWasabiProviderConfig {
    rootPath: string;
    wasabi_aws_access_key_id: string;
    wasabi_aws_secret_access_key: string;
    wasabi_aws_default_region: string;
    wasabi_aws_service_url: string;
    wasabi_aws_bucket: string;
    wasabi_aws_force_path_style: boolean;
}
/**
 * Interface representing the mapping between a Wasabi region and its associated service URL.
 */
export interface IWasabiRegionServiceURL {
    region: string;
    serviceUrl: string;
}
export declare class WasabiS3Provider extends Provider<WasabiS3Provider> {
    instance: WasabiS3Provider;
    readonly name = FileStorageProviderEnum.WASABI;
    config: IWasabiProviderConfig;
    defaultConfig: IWasabiProviderConfig;
    private readonly _detailedloggingEnabled;
    constructor();
    /**
     * Get the singleton instance of WasabiS3Provider
     * @returns {WasabiS3Provider} The singleton instance
     */
    getProviderInstance(): WasabiS3Provider;
    /**
     * Set Wasabi details based on the current request's tenantSettings.
     * If such settings does not have any Wasabi details, use the default configuration.
     * If they have Wasabi details, use them to override the default configuration.
     */
    private setWasabiConfiguration;
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
     * Create a Multer storage engine configured for AWS S3 (Wasabi).
     *
     * @param options - Configuration options for the storage engine
     * @returns A Multer storage engine
     */
    handler(options: FileStorageOption): StorageEngine;
    /**
     * Get a file from Wasabi storage.
     *
     * @param key - The key of the file to retrieve
     * @returns A Promise resolving to a Buffer containing the file data
     */
    getFile(key: string): Promise<Buffer | any>;
    /**
     * Upload a file to Wasabi storage.
     *
     * @param fileContent - The content of the file to upload
     * @param key - The key under which to store the file
     * @returns A Promise resolving to an UploadedFile, or undefined on error
     */
    putFile(fileContent: string, key?: string): Promise<UploadedFile>;
    /**
     * Delete a file from Wasabi storage.
     *
     * @param key - The key of the file to delete
     * @returns A Promise that resolves when the file is deleted successfully, or rejects with an error
     */
    deleteFile(key: string): Promise<Object | any>;
    /**
     * Get an AWS S3 instance configured with Wasabi details.
     *
     * @returns An AWS S3 instance or null in case of an error
     */
    private getWasabiInstance;
    /**
     * Get the Wasabi bucket from the configuration.
     *
     * @returns The Wasabi bucket name or null if not configured
     */
    getWasabiBucket(): string | null;
    /**
     * Map a partial UploadedFile object to include filename and URL.
     *
     * @param file - The partial UploadedFile object to map
     * @returns The mapped file object
     */
    mapUploadedFile(file: any): Promise<UploadedFile>;
    /**
     * Mapped default Wasabi service URLs
     *
     * @param region - Wasabi region
     * @param serviceUrl - Wasabi service URL
     * @returns { wasabi_aws_default_region: string, wasabi_aws_service_url: string }
     */
    private _mapDefaultWasabiServiceUrl;
}
