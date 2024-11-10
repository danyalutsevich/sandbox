"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigitalOceanS3Provider = void 0;
const common_1 = require("@nestjs/common");
const multer_s3_1 = __importDefault(require("multer-s3"));
const path_1 = require("path");
const moment_1 = __importDefault(require("moment"));
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const config_1 = require("../../../../plugins/config");
const contracts_1 = require("../../../../plugins/contracts");
const common_2 = require("../../../../plugins/common");
const provider_1 = require("./provider");
const context_1 = require("../../context");
/**
 * Digital Ocean Configuration
 */
const { digitalOcean } = config_1.environment;
class DigitalOceanS3Provider extends provider_1.Provider {
    name = contracts_1.FileStorageProviderEnum.DIGITALOCEAN;
    instance;
    config;
    defaultConfig;
    _detailedloggingEnabled = false;
    constructor() {
        super();
        this.config = this.defaultConfig = {
            rootPath: '',
            digitalocean_access_key_id: digitalOcean.accessKeyId,
            digitalocean_secret_access_key: digitalOcean.secretAccessKey,
            digitalocean_default_region: digitalOcean.region,
            digitalocean_service_url: digitalOcean.serviceUrl,
            digitalocean_cdn_url: digitalOcean.cdnUrl,
            digitalocean_s3_bucket: digitalOcean.s3.bucket,
            digitalocean_s3_force_path_style: digitalOcean.s3.forcePathStyle,
        };
    }
    /**
     * Get the singleton instance of DigitalOceanS3Provider
     *
     * @returns {DigitalOceanS3Provider} The singleton instance
     */
    getProviderInstance() {
        if (!this.instance) {
            this.instance = new DigitalOceanS3Provider();
        }
        this.setDigitalOceanConfiguration();
        return this.instance;
    }
    /**
     * Set DigitalOcean details based on the current request's tenantSettings.
     * If such settings does not have any DigitalOcean details, use the default configuration.
     * If they have DigitalOcean details, use them to override the default configuration.
     */
    setDigitalOceanConfiguration() {
        // Use the default configuration as a starting point
        this.config = {
            ...this.defaultConfig
        };
        if (this._detailedloggingEnabled) {
            console.log(`setDigitalOceanConfiguration this config value: ${JSON.stringify(this.config)}`);
        }
        try {
            const request = context_1.RequestContext.currentRequest();
            if (request) {
                const settings = request['tenantSettings'];
                if (settings) {
                    if (this._detailedloggingEnabled) {
                        console.log(`setDigitalOceanConfiguration Tenant Settings Value: ${JSON.stringify(settings)}`);
                    }
                    if ((0, common_2.trimAndGetValue)(settings.digitalocean_access_key_id)) {
                        this.config.digitalocean_access_key_id = (0, common_2.trimAndGetValue)(settings.digitalocean_access_key_id);
                        if (this._detailedloggingEnabled) {
                            console.log(`setDigitalOceanConfiguration this.config.digitalocean_access_key_id value: ${this.config.digitalocean_access_key_id}`);
                        }
                    }
                    if ((0, common_2.trimAndGetValue)(settings.digitalocean_secret_access_key)) {
                        this.config.digitalocean_secret_access_key = (0, common_2.trimAndGetValue)(settings.digitalocean_secret_access_key);
                        if (this._detailedloggingEnabled) {
                            console.log(`setDigitalOceanConfiguration this.config.digitalocean_secret_access_key value: ${this.config.digitalocean_secret_access_key}`);
                        }
                    }
                    if ((0, common_2.trimAndGetValue)(settings.digitalocean_service_url)) {
                        this.config.digitalocean_service_url = (0, common_2.addHttpsPrefix)((0, common_2.trimAndGetValue)(settings.digitalocean_service_url));
                        if (this._detailedloggingEnabled) {
                            console.log('setDigitalOceanConfiguration this.config.digitalocean_service_url value: ', this.config.digitalocean_service_url);
                        }
                    }
                    if ((0, common_2.trimAndGetValue)(settings.digitalocean_default_region)) {
                        this.config.digitalocean_default_region = (0, common_2.trimAndGetValue)(settings.digitalocean_default_region);
                        if (this._detailedloggingEnabled) {
                            console.log('setDigitalOceanConfiguration this.config.digitalocean_default_region value: ', this.config.digitalocean_default_region);
                        }
                    }
                    if ((0, common_2.trimAndGetValue)(settings.digitalocean_s3_bucket)) {
                        this.config.digitalocean_s3_bucket = (0, common_2.trimAndGetValue)(settings.digitalocean_s3_bucket);
                        if (this._detailedloggingEnabled) {
                            console.log('setDigitalOceanConfiguration this.config.digitalocean_s3_bucket value: ', this.config.digitalocean_s3_bucket);
                        }
                    }
                    // Assuming trimAndGetValue() function trims and retrieves the value from settings
                    const forcePathStyle = (0, common_2.trimAndGetValue)(settings.digitalocean_s3_force_path_style);
                    this.config.digitalocean_s3_force_path_style = forcePathStyle === 'true' || forcePathStyle === '1';
                    if (this._detailedloggingEnabled) {
                        console.log('setDigitalOceanConfiguration this.config.digitalocean_s3_force_path_style value: ', this.config.digitalocean_s3_force_path_style);
                    }
                }
            }
        }
        catch (error) {
            console.error('Error while setting DigitalOcean configuration. Default configuration will be used', error);
        }
    }
    /**
     * Get a pre-signed URL for a given file URL.
     *
     * @param fileURL - The file URL for which to generate a pre-signed URL
     * @returns Pre-signed URL or null if the input is invalid
     */
    async url(fileURL) {
        if (!fileURL || fileURL.startsWith('http')) {
            return fileURL;
        }
        try {
            const s3Client = this.getDigitalOceanInstance();
            if (s3Client) {
                const signedUrl = await (0, s3_request_presigner_1.getSignedUrl)(s3Client, new client_s3_1.GetObjectCommand({
                    Bucket: this.getDigitalOceanBucket(),
                    Key: fileURL
                }), {
                    expiresIn: 3600
                });
                return signedUrl;
            }
            else {
                console.error('Error while retrieving signed URL: s3Client is null');
                return null;
            }
        }
        catch (error) {
            console.error('Error while retrieving signed URL:', error);
            return null;
        }
    }
    /**
     * Get the full path of the file in the storage.
     *
     * @param filePath - The file path to join with the root path
     * @returns Full path or null if filePath is falsy
     */
    path(filePath) {
        return filePath ? (0, path_1.join)(this.config.rootPath, filePath) : null;
    }
    /**
     * Create a Multer storage engine configured for AWS S3 (DigitalOcean).
     *
     * @param options - Configuration options for the storage engine
     * @returns A Multer storage engine
     */
    handler(options) {
        const { dest, filename, prefix = 'file' } = options;
        try {
            const s3Client = this.getDigitalOceanInstance();
            if (s3Client) {
                return (0, multer_s3_1.default)({
                    s3: s3Client,
                    bucket: (_req, _file, callback) => {
                        callback(null, this.getDigitalOceanBucket());
                    },
                    metadata: function (_req, _file, callback) {
                        callback(null, { fieldName: _file.fieldname });
                    },
                    key: (_req, file, callback) => {
                        // A string or function that determines the destination path for uploaded
                        const destination = dest instanceof Function ? dest(file) : dest;
                        // A file extension, or filename extension, is a suffix at the end of a file.
                        const extension = file.originalname.split('.').pop();
                        // A function that determines the name of the uploaded file.
                        let fileName;
                        if (filename) {
                            fileName = typeof filename === 'string' ? filename : filename(file, extension);
                        }
                        else {
                            fileName = `${prefix}-${(0, moment_1.default)().unix()}-${parseInt('' + Math.random() * 1000, 10)}.${extension}`;
                        }
                        // Replace double backslashes with single forward slashes
                        const fullPath = (0, path_1.join)(destination, fileName).replace(/\\/g, '/');
                        callback(null, fullPath);
                    }
                });
            }
            else {
                console.error('Error while retrieving Multer for DigitalOcean: s3Client is null');
                return null;
            }
        }
        catch (error) {
            console.error('Error while retrieving Multer for DigitalOcean:', error);
            return null;
        }
    }
    /**
     * Get a file from DigitalOcean storage.
     *
     * @param key - The key of the file to retrieve
     * @returns A Promise resolving to a Buffer containing the file data
     */
    async getFile(key) {
        try {
            const s3Client = this.getDigitalOceanInstance();
            if (s3Client) {
                // Input parameters when using the GetObjectCommand to retrieve an object from DigitalOcean storage.
                const command = new client_s3_1.GetObjectCommand({
                    Bucket: this.getDigitalOceanBucket(),
                    Key: key // The key (path) of the object to retrieve from the bucket.
                });
                /**
                 * Send a GetObjectCommand to DigitalOcean to retrieve an object
                 */
                const data = await s3Client.send(command);
                return data.Body;
            }
            else {
                console.error('Error while retrieving signed URL: s3Client is null');
            }
        }
        catch (error) {
            console.error(`Error while fetching file with key '${key}':`, error);
        }
    }
    /**
     * Upload a file to DigitalOcean storage.
     *
     * @param fileContent - The content of the file to upload
     * @param key - The key under which to store the file
     * @returns A Promise resolving to an UploadedFile, or undefined on error
     */
    async putFile(fileContent, key = '') {
        try {
            // Replace double backslashes with single forward slashes
            key = key.replace(/\\/g, '/');
            const s3Client = this.getDigitalOceanInstance();
            if (s3Client) {
                const filename = (0, path_1.basename)(key);
                // Input parameters for the PutObjectCommand when uploading a file to DigitalOcean storage.
                const putObjectCommand = new client_s3_1.PutObjectCommand({
                    Bucket: this.getDigitalOceanBucket(),
                    Body: fileContent,
                    Key: key,
                    ContentDisposition: `inline; ${filename}`,
                    ContentType: 'image'
                });
                /**
                 * Send a PutObjectCommand to DigitalOcean to upload the object
                 */
                await s3Client.send(putObjectCommand);
                // Input parameters for the HeadObjectCommand when retrieving metadata about an object in DigitalOcean storage.
                const headObjectCommand = new client_s3_1.HeadObjectCommand({
                    Key: key,
                    Bucket: this.getDigitalOceanBucket() // The name of the bucket where the object is stored.
                });
                // Send a HeadObjectCommand to DigitalOcean to retrieve ContentLength property metadata
                const { ContentLength } = await s3Client.send(headObjectCommand);
                const file = {
                    originalname: filename,
                    size: ContentLength,
                    filename: filename,
                    path: key,
                    key: key // Full path of the file
                };
                return await this.mapUploadedFile(file);
            }
            else {
                console.warn('Error while retrieving signed URL: s3Client is null');
            }
        }
        catch (error) {
            console.error('Error while put file for DigitalOcean provider', error);
        }
    }
    /**
     * Delete a file from DigitalOcean storage.
     *
     * @param key - The key of the file to delete
     * @returns A Promise that resolves when the file is deleted successfully, or rejects with an error
     */
    async deleteFile(key) {
        try {
            const s3Client = this.getDigitalOceanInstance();
            if (s3Client) {
                // Input parameters when using the DeleteObjectCommand to delete an object from DigitalOcean storage.
                const command = new client_s3_1.DeleteObjectCommand({
                    Bucket: this.getDigitalOceanBucket(),
                    Key: key // The key (path) of the object to delete from the bucket.
                });
                /**
                 * Send a DeleteObjectCommand to DigitalOcean to delete an object
                 */
                const data = await s3Client.send(command);
                return new Object({
                    status: common_1.HttpStatus.OK,
                    message: `file with key: ${key} is successfully deleted`,
                    data
                });
            }
            else {
                console.warn('Error while retrieving signed URL: s3Client is null');
            }
        }
        catch (error) {
            console.error(`Error while deleting file with key '${key}':`, error);
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST, {
                description: `Error while deleting file with key: '${key}'`
            });
        }
    }
    /**
     * Get an AWS S3 instance configured with DigitalOcean details.
     *
     * @returns An AWS S3 instance or null in case of an error
     */
    getDigitalOceanInstance() {
        try {
            this.setDigitalOceanConfiguration();
            if (this.config && this.config.digitalocean_access_key_id && this.config.digitalocean_secret_access_key) {
                const endpoint = (0, common_2.addHttpsPrefix)(this.config.digitalocean_service_url);
                const s3Client = new client_s3_1.S3Client({
                    /**
                     * Whether to force path style URLs for S3 objects
                     * (e.g., https://s3.amazonaws.com/<bucketName>/<key> instead of https://<bucketName>.s3.amazonaws.com/<key>
                     */
                    forcePathStyle: this.config.digitalocean_s3_force_path_style || true,
                    endpoint,
                    region: this.config.digitalocean_default_region || 'us-east-1',
                    credentials: {
                        accessKeyId: this.config.digitalocean_access_key_id,
                        secretAccessKey: this.config.digitalocean_secret_access_key
                    },
                });
                return s3Client;
            }
            else {
                console.warn(`Can't retrieve ${contracts_1.FileStorageProviderEnum.DIGITALOCEAN} instance for tenant: this.config.digitalocean_service_url, digitalocean_access_key_id or digitalocean_secret_access_key undefined in that tenant settings`);
                return null;
            }
        }
        catch (error) {
            console.error(`Error while retrieving ${contracts_1.FileStorageProviderEnum.DIGITALOCEAN} instance:`, error);
            return null;
        }
    }
    /**
     * Get the DigitalOcean bucket from the configuration.
     *
     * @returns The DigitalOcean bucket name or null if not configured
     */
    getDigitalOceanBucket() {
        this.setDigitalOceanConfiguration();
        return this.config.digitalocean_s3_bucket || null;
    }
    /**
     * Map a partial UploadedFile object to include filename and URL.
     *
     * @param file - The partial UploadedFile object to map
     * @returns The mapped file object
     */
    async mapUploadedFile(file) {
        file.filename = file.originalname;
        file.url = await this.url(file.key); // file.location;
        return file;
    }
}
exports.DigitalOceanS3Provider = DigitalOceanS3Provider;
//# sourceMappingURL=digitalocean-s3.provider.js.map