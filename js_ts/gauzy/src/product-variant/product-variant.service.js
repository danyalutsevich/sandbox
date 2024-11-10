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
exports.ProductVariantService = void 0;
const crud_1 = require("./../core/crud");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_variant_entity_1 = require("./product-variant.entity");
const mikro_orm_product_variant_repository_1 = require("./repository/mikro-orm-product-variant.repository");
const type_orm_product_variant_repository_1 = require("./repository/type-orm-product-variant.repository");
let ProductVariantService = exports.ProductVariantService = class ProductVariantService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmProductVariantRepository, mikroOrmProductVariantRepository) {
        super(typeOrmProductVariantRepository, mikroOrmProductVariantRepository);
    }
    async findAllProductVariants() {
        const total = await this.typeOrmRepository.count();
        const items = await this.typeOrmRepository.find({
            relations: ['settings', 'price', 'image']
        });
        return { items, total };
    }
    async findAllVariantsByProductId(productId) {
        const total = await this.typeOrmRepository.count();
        const items = await this.typeOrmRepository.find({
            relations: ['image'],
            where: { productId: productId }
        });
        return { items, total };
    }
    async findOne(id) {
        return await this.typeOrmRepository.findOne({
            where: {
                id: id
            },
            relations: {
                setting: true,
                price: true,
                image: true
            }
        });
    }
    async createBulk(productVariants) {
        return this.typeOrmRepository.save(productVariants);
    }
    async createVariant(productVariant) {
        return this.typeOrmRepository.save(productVariant);
    }
    async updateVariant(productVariant) {
        return this.typeOrmRepository.save(productVariant);
    }
    async deleteMany(productVariants) {
        return this.typeOrmRepository.remove(productVariants);
    }
    async deleteFeaturedImage(id) {
        try {
            let variant = await this.typeOrmRepository.findOneBy({
                id
            });
            variant.image = null;
            return await this.typeOrmRepository.save(variant);
        }
        catch (err) {
            throw new common_1.BadRequestException(err);
        }
    }
};
exports.ProductVariantService = ProductVariantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_variant_entity_1.ProductVariant)),
    __metadata("design:paramtypes", [type_orm_product_variant_repository_1.TypeOrmProductVariantRepository,
        mikro_orm_product_variant_repository_1.MikroOrmProductVariantRepository])
], ProductVariantService);
//# sourceMappingURL=product-variant.service.js.map