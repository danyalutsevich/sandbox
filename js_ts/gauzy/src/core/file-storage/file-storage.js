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
exports.FileStorage = void 0;
const contracts_1 = require("../../../plugins/contracts");
const config_1 = require("../../../plugins/config");
const common_1 = require("../../../plugins/common");
const Providers = __importStar(require("./providers"));
const context_1 = require("./../../core/context");
const isDebug = false;
let debugProvider;
if (isDebug) {
    debugProvider = new Providers.DebugProvider();
}
class FileStorage {
    providers = {};
    config = {
        dest: ''
    };
    _fileStorageProviderDefault;
    /**
     *
     * @param option
     */
    constructor(option) {
        if (!isDebug) {
            if (!this._fileStorageProviderDefault) {
                this._fileStorageProviderDefault = config_1.environment.fileSystem.name.toUpperCase() || contracts_1.FileStorageProviderEnum.LOCAL;
            }
            this.initProvider();
            this.setConfig(option);
        }
        else {
            console.log('FileStorage constructor called');
        }
    }
    /**
     * Set configuration for FileStorage.
     * @param partialConfig - Partial configuration options.
     * @returns Current instance of FileStorage.
     */
    setConfig(config = {}) {
        this.config = {
            ...this.config,
            ...config
        };
        // Use a more specific check for config.provider
        if ((0, common_1.isEmpty)(config.provider)) {
            this.getProvider();
        }
        return this;
    }
    /**
     * Set the file storage provider for FileStorage.
     * @param providerName - The name of the file storage provider.
     * @returns Current instance of FileStorage.
     */
    setProvider(providerName) {
        if (!isDebug) {
            const providers = Object.values(contracts_1.FileStorageProviderEnum);
            if ((0, common_1.isEmpty)(providerName)) {
                const request = context_1.RequestContext.currentRequest();
                if (request && (0, common_1.isNotEmpty)(request['tenantSettings'])) {
                    const provider = request['tenantSettings']['fileStorageProvider'];
                    if ((0, common_1.isEmpty)(provider) || !providers.includes(provider)) {
                        this.config.provider = this._fileStorageProviderDefault;
                    }
                    else {
                        this.config.provider = provider.toUpperCase();
                    }
                }
                else {
                    this.config.provider = this._fileStorageProviderDefault;
                }
            }
            else {
                if (providers.includes(providerName)) {
                    this.config.provider = providerName.toUpperCase();
                }
                else {
                    this.config.provider = contracts_1.FileStorageProviderEnum.LOCAL;
                }
            }
        }
        else {
            console.log('FileStorage setProvider called with providerName:', providerName);
        }
        return this;
    }
    /**
     * Set the file storage provider using the specified provider name and retrieve the provider instance.
     * @param providerName - The name of the file storage provider.
     * @returns The file storage provider instance.
     */
    getProvider(providerName) {
        this.setProvider(providerName);
        return this.getProviderInstance();
    }
    /**
     * Create an instance of the file storage provider based on the specified options.
     * @param option - Configuration options for file storage.
     * @returns The file storage provider instance.
     * @throws InvalidProviderError if the specified provider is not valid.
     */
    storage(option) {
        this.setConfig(option);
        if (this.config.provider && this.providers[this.config.provider]) {
            try {
                return this.providers[this.config.provider].handler(this.config);
            }
            catch (error) {
                console.error(`Error while get Multer file storage provider: ${error.message}`, error);
                return null;
            }
        }
        else {
            const providers = Object.values(contracts_1.FileStorageProviderEnum).join(', ');
            console.warn(`Provider "${this.config.provider}" is not valid. Provider must be ${providers}`);
            return null;
        }
    }
    /**
     * Retrieve an instance of the file storage provider based on the current configuration.
     * @returns The file storage provider instance.
     * @throws Error if the specified provider is not found or if there is no provider configured.
     */
    getProviderInstance() {
        if (!isDebug) {
            if (this.config.provider && this.config.provider in this.providers) {
                return this.providers[this.config.provider].getProviderInstance();
            }
            else {
                const providers = Object.values(contracts_1.FileStorageProviderEnum).join(', ');
                console.warn(`Invalid or missing file storage provider. Valid providers are: ${providers}`);
                return null;
            }
        }
        else {
            console.log('FileStorage getProviderInstance called');
            return debugProvider;
        }
    }
    /**
     * Initialize provider instances based on the Providers object.
     */
    initProvider() {
        if (!isDebug) {
            for (const key in Providers) {
                if (Object.prototype.hasOwnProperty.call(Providers, key)) {
                    const className = Providers[key];
                    if (className.instance === undefined) {
                        const provider = new className();
                        this.providers[provider.name] = provider;
                        className.instance = provider;
                    }
                    else {
                        this.providers[className.instance.name] = className.instance;
                    }
                }
            }
        }
        else {
            console.log('FileStorage initProvider called');
        }
    }
}
exports.FileStorage = FileStorage;
//# sourceMappingURL=file-storage.js.map