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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageAssetController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const uuid_1 = require("uuid");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const Jimp = __importStar(require("jimp"));
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const file_storage_1 = require("./../core/file-storage");
const interceptors_1 = require("./../core/interceptors");
const context_1 = require("./../core/context");
const utils_1 = require("./../core/utils");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const pipes_1 = require("./../shared/pipes");
const commands_1 = require("./commands");
const image_asset_entity_1 = require("./image-asset.entity");
const image_asset_service_1 = require("./image-asset.service");
const dto_1 = require("./dto");
let ImageAssetController = exports.ImageAssetController = class ImageAssetController extends crud_1.CrudController {
    _commandBus;
    _imageAssetService;
    constructor(_commandBus, _imageAssetService) {
        super(_imageAssetService);
        this._commandBus = _commandBus;
        this._imageAssetService = _imageAssetService;
    }
    /**
     * Upload image asset on specific tenant file storage
     *
     * @param entity
     * @returns
     */
    async upload(file, entity) {
        const provider = new file_storage_1.FileStorage().getProvider();
        let thumbnail;
        try {
            const fileContent = await provider.getFile(file.key);
            const inputFile = await (0, utils_1.tempFile)('media-asset-thumb');
            const outputFile = await (0, utils_1.tempFile)('media-asset-thumb');
            await fs.promises.writeFile(inputFile, fileContent);
            const image = await Jimp.read(inputFile);
            // we are using Jimp.AUTO for height instead of hardcode (e.g. 150px)
            image.resize(250, Jimp.AUTO);
            await image.writeAsync(outputFile);
            const data = await fs.promises.readFile(outputFile);
            try {
                await fs.promises.unlink(inputFile);
                await fs.promises.unlink(outputFile);
            }
            catch (error) {
                console.error('Error while unlinking temp files:', error);
            }
            const thumbName = `thumb-${file.filename}`;
            const thumbDir = path.dirname(file.key);
            // Replace double backslashes with single forward slashes
            const fullPath = path.join(thumbDir, thumbName).replace(/\\/g, '/');
            thumbnail = await provider.putFile(data, fullPath);
        }
        catch (error) {
            console.error('Error while uploading media asset into file storage provider:', error);
        }
        return await this._commandBus.execute(new commands_1.ImageAssetCreateCommand({
            ...entity,
            name: file.filename,
            url: file.key,
            thumb: thumbnail ? thumbnail.key : null,
            size: file.size,
            storageProvider: provider.name
        }));
    }
    /**
     * GET image assets counts
     *
     * @param filter
     * @returns
     */
    async getCount(options) {
        return await this._imageAssetService.countBy(options);
    }
    /**
     * GET image assets by pagination
     *
     * @param filter
     * @returns
     */
    async pagination(params) {
        return await this._imageAssetService.paginate(params);
    }
    /**
     * GET image assets
     *
     * @param data
     * @returns
     */
    async findAll(params) {
        return await this._imageAssetService.findAll(params);
    }
    /**
     * GET image assets by id
     *
     * @param id
     * @returns
     */
    async findById(id) {
        return await this._imageAssetService.findOneByIdString(id);
    }
    /**
     * CREATE new image asset
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return await this._imageAssetService.create(entity);
    }
    /**
     * DELETE image assets
     *
     * @param id
     * @returns
     */
    async delete(id) {
        return await this._imageAssetService.deleteAsset(id);
    }
};
__decorate([
    (0, common_1.Post)('upload/:folder'),
    (0, common_1.UseInterceptors)((0, interceptors_1.LazyFileInterceptor)('file', {
        storage: (ctx) => {
            const request = ctx.switchToHttp().getRequest();
            const folder = request?.params?.folder || 'image_assets';
            // Define the base directory for storing media
            const baseDirectory = path.join('uploads', folder);
            // Generate unique sub directories based on the current tenant
            const subDirectory = path.join(context_1.RequestContext.currentTenantId() || (0, uuid_1.v4)());
            return new file_storage_1.FileStorage().storage({
                dest: () => path.join(baseDirectory, subDirectory)
            });
        }
    })),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, file_storage_1.UploadedFileStorage)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UploadImageAsset]),
    __metadata("design:returntype", Promise)
], ImageAssetController.prototype, "upload", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all image assets counts in the same tenant' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found image assets count'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.MEDIA_GALLERY_VIEW),
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImageAssetController.prototype, "getCount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all image assets in the same tenant using pagination.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found image assets in the tenant',
        type: image_asset_entity_1.ImageAsset
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.MEDIA_GALLERY_VIEW),
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], ImageAssetController.prototype, "pagination", null);
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.MEDIA_GALLERY_VIEW),
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], ImageAssetController.prototype, "findAll", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.MEDIA_GALLERY_VIEW),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImageAssetController.prototype, "findById", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [image_asset_entity_1.ImageAsset]),
    __metadata("design:returntype", Promise)
], ImageAssetController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT, index_1.PermissionsEnum.MEDIA_GALLERY_DELETE),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImageAssetController.prototype, "delete", null);
exports.ImageAssetController = ImageAssetController = __decorate([
    (0, swagger_1.ApiTags)('ImageAsset'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT, index_1.PermissionsEnum.MEDIA_GALLERY_ADD),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus, image_asset_service_1.ImageAssetService])
], ImageAssetController);
//# sourceMappingURL=image-asset.controller.js.map