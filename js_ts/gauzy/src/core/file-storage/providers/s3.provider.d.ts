/// <reference types="node" />
import { StorageEngine } from 'multer';
import { FileStorageOption, FileStorageProviderEnum, UploadedFile } from '../../../../plugins/contracts';
import { Provider } from './provider';
/**
 * Configuration interface for AWS S3 storage.
 */
export interface IS3ProviderConfig {
    rootPath: string;
    aws_access_key_id: string;
    aws_secret_access_key: string;
    aws_default_region: string;
    aws_bucket: string;
    aws_force_path_style: boolean;
}
export declare class S3Provider extends Provider<S3Provider> {
    instance: S3Provider;
    readonly name = FileStorageProviderEnum.S3;
    config: IS3ProviderConfig;
    defaultConfig: IS3ProviderConfig;
    private readonly _detailedloggingEnabled;
    constructor();
    /**
     * Get the singleton instance of S3Provider
     * @returns {S3Provider} The singleton instance
     */
    getProviderInstance(): S3Provider;
    /**
     * Sets the AWS S3 configuration based on the current request's tenant settings.
     * If tenant settings are available with valid AWS credentials, it updates the configuration.
     * If not, it uses the default configuration.
     */
    setAwsS3Configuration(): void;
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
     * Create a Multer storage engine configured for AWS S3.
     *
     * @param options - Configuration options for the storage engine
     * @returns A Multer storage engine
     */
    handler(options: FileStorageOption): StorageEngine;
    /**
     * Get a file from AWS S3 storage.
     *
     * @param key - The key of the file to retrieve
     * @returns A Promise resolving to a Buffer containing the file data
     */
    getFile(key: string): Promise<Buffer | any>;
    /**
     * Upload a file to AWS S3 storage.
     *
     * @param fileContent - The content of the file to upload
     * @param key - The key under which to store the file
     * @returns A Promise resolving to an UploadedFile, or undefined on error
     */
    putFile(fileContent: string, key?: string): Promise<UploadedFile>;
    /**
     * Delete a file from AWS S3 storage.
     *
     * @param key - The key of the file to delete
     * @returns A Promise that resolves when the file is deleted successfully, or rejects with an error
     */
    deleteFile(key: string): Promise<Object | any>;
    /**
     * Retrieves or creates an instance of the S3Client class based on the AWS S3 configuration.
     *
     * @returns An instance of the S3Client class or null if there is an error.
     */
    private getS3Instance;
    /**
     * Get the AWS S3 bucket from the configuration.
     *
     * @returns The AWS S3 bucket name or null if not configured
     */
    getS3Bucket(): string | null;
    /**
     * Map a partial UploadedFile object to include filename and URL.
     *
     * @param file - The partial UploadedFile object to map
     * @returns The mapped file object
     */
    mapUploadedFile(file: any): Promise<UploadedFile>;
}
