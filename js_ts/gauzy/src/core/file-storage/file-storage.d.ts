import { FileStorageOption, FileStorageProvider } from '../../../plugins/contracts';
import { Provider } from './providers/provider';
export declare class FileStorage {
    providers: {
        [key: string]: Provider<any>;
    };
    config: FileStorageOption;
    private _fileStorageProviderDefault;
    /**
     *
     * @param option
     */
    constructor(option?: FileStorageOption);
    /**
     * Set configuration for FileStorage.
     * @param partialConfig - Partial configuration options.
     * @returns Current instance of FileStorage.
     */
    setConfig(config?: Partial<FileStorageOption>): this;
    /**
     * Set the file storage provider for FileStorage.
     * @param providerName - The name of the file storage provider.
     * @returns Current instance of FileStorage.
     */
    setProvider(providerName: FileStorageProvider): this;
    /**
     * Set the file storage provider using the specified provider name and retrieve the provider instance.
     * @param providerName - The name of the file storage provider.
     * @returns The file storage provider instance.
     */
    getProvider(providerName?: FileStorageProvider): Provider<any>;
    /**
     * Create an instance of the file storage provider based on the specified options.
     * @param option - Configuration options for file storage.
     * @returns The file storage provider instance.
     * @throws InvalidProviderError if the specified provider is not valid.
     */
    storage(option?: FileStorageOption): import("multer").StorageEngine;
    /**
     * Retrieve an instance of the file storage provider based on the current configuration.
     * @returns The file storage provider instance.
     * @throws Error if the specified provider is not found or if there is no provider configured.
     */
    getProviderInstance(): Provider<any>;
    /**
     * Initialize provider instances based on the Providers object.
     */
    initProvider(): void;
}
