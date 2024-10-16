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
exports.ImageAssetService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const context_1 = require("./../core/context");
const crud_1 = require("./../core/crud");
const mikro_orm_image_asset_repository_1 = require("./repository/mikro-orm-image-asset.repository");
const type_orm_image_asset_repository_1 = require("./repository/type-orm-image-asset.repository");
const image_asset_entity_1 = require("./image-asset.entity");
let ImageAssetService = exports.ImageAssetService = class ImageAssetService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmImageAssetRepository, mikroOrmImageAssetRepository) {
        super(typeOrmImageAssetRepository, mikroOrmImageAssetRepository);
    }
    /**
     * Create image asset
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        const user = context_1.RequestContext.currentUser();
        try {
            return await super.create(entity);
        }
        catch (error) {
            console.log(`Error while creating image assets for user (${user.name})`, error);
            throw new common_1.BadRequestException(error);
        }
    }
    async deleteAsset(imageId) {
        let result = await this.typeOrmRepository.findOne({
            where: { id: imageId },
            relations: ['productGallery', 'productFeaturedImage']
        });
        if (result && (result.productGallery.length || result.productFeaturedImage.length)) {
            throw new common_1.HttpException('Image is under use', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.typeOrmRepository.remove(result);
    }
};
exports.ImageAssetService = ImageAssetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(image_asset_entity_1.ImageAsset)),
    __metadata("design:paramtypes", [type_orm_image_asset_repository_1.TypeOrmImageAssetRepository,
        mikro_orm_image_asset_repository_1.MikroOrmImageAssetRepository])
], ImageAssetService);
//# sourceMappingURL=image-asset.service.js.map