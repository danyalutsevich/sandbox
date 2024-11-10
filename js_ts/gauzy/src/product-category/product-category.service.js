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
exports.ProductCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crud_1 = require("./../core/crud");
const product_category_entity_1 = require("./product-category.entity");
const type_orm_product_category_repository_1 = require("./repository/type-orm-product-category.repository");
const mikro_orm_product_category_repository_1 = require("./repository/mikro-orm-product-category.repository");
let ProductCategoryService = exports.ProductCategoryService = class ProductCategoryService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmProductCategoryRepository, mikroOrmProductCategoryRepository) {
        super(typeOrmProductCategoryRepository, mikroOrmProductCategoryRepository);
    }
    /**
     * GET product categories using pagination
     *
     * @param options
     * @param language
     * @returns
     */
    async pagination(options, language) {
        const { items, total } = await super.paginate(options);
        return await this.mapTranslatedProductCategories(items, language).then((items) => {
            return { items, total };
        });
    }
    /**
     * UPDATE product category
     *
     * @param id
     * @param entity
     * @returns
     */
    async updateProductCategory(id, entity) {
        try {
            await this.typeOrmRepository.delete(id);
            return this.typeOrmRepository.save(entity);
        }
        catch (err) {
            throw new common_1.BadRequestException(err);
        }
    }
    /**
     * GET all product categories
     *
     * @param input
     * @param language
     * @returns
     */
    async findProductCategories(options, language) {
        const { relations = [], where } = options;
        const { items, total } = await this.findAll({
            where,
            relations
        });
        return await this.mapTranslatedProductCategories(items, language).then((items) => {
            return { items, total };
        });
    }
    /**
     * MAP product category translations
     *
     * @param items
     * @param languageCode
     * @returns
     */
    async mapTranslatedProductCategories(items, languageCode) {
        if (languageCode) {
            return Promise.all(items.map((category) => Object.assign({}, category, category.translate(languageCode))));
        }
        else {
            return items;
        }
    }
    /**
     * MAP product category translations
     *
     * @param type
     * @param languageCode
     * @returns
     */
    async mapTranslatedProductType(type, languageCode) {
        try {
            if (languageCode) {
                return Object.assign({}, type, type.translate(languageCode));
            }
            else {
                return type;
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.ProductCategoryService = ProductCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_category_entity_1.ProductCategory)),
    __metadata("design:paramtypes", [type_orm_product_category_repository_1.TypeOrmProductCategoryRepository,
        mikro_orm_product_category_repository_1.MikroOrmProductCategoryRepository])
], ProductCategoryService);
//# sourceMappingURL=product-category.service.js.map