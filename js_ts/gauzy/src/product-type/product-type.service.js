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
exports.ProductTypeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crud_1 = require("./../core/crud");
const product_type_entity_1 = require("./product-type.entity");
const mikro_orm_product_type_repository_1 = require("./repository/mikro-orm-product-type.repository");
const type_orm_product_type_repository_1 = require("./repository/type-orm-product-type.repository");
let ProductTypeService = exports.ProductTypeService = class ProductTypeService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmProductTypeRepository, mikroOrmProductTypeRepository) {
        super(typeOrmProductTypeRepository, mikroOrmProductTypeRepository);
    }
    /**
     * GET product types using pagination
     *
     * @param options
     * @param language
     * @returns
     */
    async pagination(options, language) {
        const { items, total } = await super.paginate(options);
        return await this.mapTranslatedProductTypes(items, language).then((items) => {
            return { items, total };
        });
    }
    /**
     * UPDATE product type
     *
     * @param id
     * @param entity
     * @returns
     */
    async updateProductType(id, entity) {
        try {
            await this.typeOrmRepository.delete(id);
            return this.typeOrmRepository.save(entity);
        }
        catch (err) {
            throw new common_1.BadRequestException(err);
        }
    }
    /**
     * GET all product types
     *
     * @param options
     * @param language
     * @returns
     */
    async findProductTypes(options, language) {
        const { relations = [], where } = options;
        const { items, total } = await this.findAll({
            where,
            relations
        });
        return await this.mapTranslatedProductTypes(items, language).then((items) => {
            return { items, total };
        });
    }
    /**
     * MAP product types translations
     *
     * @param items
     * @param languageCode
     * @returns
     */
    async mapTranslatedProductTypes(items, languageCode) {
        if (languageCode) {
            return Promise.all(items.map((type) => Object.assign({}, type, type.translate(languageCode))));
        }
        else {
            return items;
        }
    }
    /**
     * MAP product type translations
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
exports.ProductTypeService = ProductTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_type_entity_1.ProductType)),
    __metadata("design:paramtypes", [type_orm_product_type_repository_1.TypeOrmProductTypeRepository,
        mikro_orm_product_type_repository_1.MikroOrmProductTypeRepository])
], ProductTypeService);
//# sourceMappingURL=product-type.service.js.map