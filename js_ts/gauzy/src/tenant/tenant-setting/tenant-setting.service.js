"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantSettingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const underscore_1 = require("underscore");
const client_s3_1 = require("@aws-sdk/client-s3");
const tenant_setting_entity_1 = require("./tenant-setting.entity");
const crud_1 = require("./../../core/crud");
const type_orm_tenant_setting_repository_1 = require("./repository/type-orm-tenant-setting.repository");
const mikro_orm_tenant_setting_repository_1 = require("./repository/mikro-orm-tenant-setting.repository");
const utils_1 = require("core/utils");
let TenantSettingService = exports.TenantSettingService = class TenantSettingService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmTenantSettingRepository, mikroOrmTenantSettingRepository) {
        super(typeOrmTenantSettingRepository, mikroOrmTenantSettingRepository);
    }
    /**
     *
     * @param request
     * @returns
     */
    async get(request) {
        let settings;
        switch (this.ormType) {
            case utils_1.MultiORMEnum.MikroORM:
                const { where, mikroOptions } = (0, utils_1.parseTypeORMFindToMikroOrm)(request);
                const items = await this.mikroOrmRepository.find(where, mikroOptions);
                settings = items.map((entity) => this.serialize(entity));
                break;
            case utils_1.MultiORMEnum.TypeORM:
                settings = await await this.typeOrmRepository.find(request);
                break;
            default:
                throw new Error(`Not implemented for ${this.ormType}`);
        }
        return (0, underscore_1.object)((0, underscore_1.pluck)(settings, 'name'), (0, underscore_1.pluck)(settings, 'value'));
    }
    /**
     *
     * @param input
     * @param tenantId
     * @returns
     */
    async saveSettings(input, tenantId) {
        const settingsName = (0, underscore_1.keys)(input);
        const settings = await this.typeOrmRepository.find({
            where: {
                name: (0, typeorm_2.In)(settingsName),
                tenantId
            }
        });
        const settingsByName = (0, underscore_1.indexBy)(settings, 'name');
        const saveInput = [];
        for (const key in input) {
            if (Object.prototype.hasOwnProperty.call(input, key)) {
                const setting = settingsByName[key];
                if (setting !== undefined) {
                    setting.value = input[key];
                    saveInput.push(setting);
                }
                else {
                    saveInput.push(new tenant_setting_entity_1.TenantSetting({
                        value: input[key],
                        name: key,
                        tenantId
                    }));
                }
            }
        }
        await this.typeOrmRepository.save(saveInput);
        return (0, underscore_1.object)((0, underscore_1.pluck)(saveInput, 'name'), (0, underscore_1.pluck)(saveInput, 'value'));
    }
    /**
     * Verify Wasabi Configuration
     * @param entity - Configuration details for Wasabi
     * @returns Promise containing the verification status
     */
    async verifyWasabiConfiguration(entity) {
        // Validate the input data (You can use class-validator for validation)
        if (!entity.wasabi_aws_access_key_id || !entity.wasabi_aws_secret_access_key) {
            throw new common_1.HttpException('Please include the required parameters as some are missing in your request.', common_1.HttpStatus.BAD_REQUEST);
        }
        // Create S3 wasabi endpoint
        const endpoint = entity.wasabi_aws_service_url;
        // Create S3 wasabi region
        const region = entity.wasabi_aws_default_region;
        // Create S3 client service object
        const s3Client = new client_s3_1.S3Client({
            credentials: {
                accessKeyId: entity.wasabi_aws_access_key_id,
                secretAccessKey: entity.wasabi_aws_secret_access_key
            },
            region,
            endpoint,
            /**
             * Whether to force path style URLs for S3 objects
             * (e.g., https://s3.amazonaws.com/<bucketName>/<key> instead of https://<bucketName>.s3.amazonaws.com/<key>
             */
            forcePathStyle: entity.wasabi_aws_force_path_style
        });
        // Create the parameters for calling createBucket
        const params = {
            Bucket: entity.wasabi_aws_bucket
        };
        try {
            // call S3 to create the bucket
            const data = await s3Client.send(new client_s3_1.CreateBucketCommand(params));
            return new Object({
                status: common_1.HttpStatus.CREATED,
                message: `${entity.wasabi_aws_bucket} is created successfully in ${entity.wasabi_aws_default_region}`,
                data
            });
        }
        catch (error) {
            console.log('Error while creating wasabi bucket: %s', params.Bucket);
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST, {
                description: `Error while creating wasabi bucket: ${params.Bucket}`
            });
        }
    }
};
exports.TenantSettingService = TenantSettingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tenant_setting_entity_1.TenantSetting)),
    __metadata("design:paramtypes", [type_orm_tenant_setting_repository_1.TypeOrmTenantSettingRepository,
        mikro_orm_tenant_setting_repository_1.MikroOrmTenantSettingRepository])
], TenantSettingService);
//# sourceMappingURL=tenant-setting.service.js.map