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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crud_1 = require("./../core/crud");
const product_entity_1 = require("./product.entity");
const product_translation_entity_1 = require("./product-translation.entity");
const type_orm_product_repository_1 = require("./repository/type-orm-product.repository");
const mikro_orm_product_repository_1 = require("./repository/mikro-orm-product.repository");
const mikro_orm_product_translation_repository_1 = require("./repository/mikro-orm-product-translation.repository");
const type_orm_product_translation_repository_1 = require("./repository/type-orm-product-translation.repository");
let ProductService = exports.ProductService = class ProductService extends crud_1.TenantAwareCrudService {
    typeOrmProductTranslationRepository;
    propsTranslate = [
        {
            prop: 'root',
            propsTranslate: [
                { key: 'name', alias: 'name' },
                { key: 'description', alias: 'description' }
            ]
        },
        {
            prop: 'productCategory',
            propsTranslate: [{ key: 'name', alias: 'productCategory' }]
        },
        {
            prop: 'productType',
            propsTranslate: [{ key: 'name', alias: 'productType' }]
        },
        {
            prop: 'description',
            propsTranslate: [{ key: 'description', alias: 'description' }]
        }
    ];
    constructor(typeOrmProductRepository, mikroOrmProductRepository, typeOrmProductTranslationRepository, mikroOrmProductTranslationRepository) {
        super(typeOrmProductRepository, mikroOrmProductRepository);
        this.typeOrmProductTranslationRepository = typeOrmProductTranslationRepository;
    }
    async pagination(filter, language) {
        if ('where' in filter) {
            const { where } = filter;
            if ('languageCode' in where) {
                const { languageCode } = where;
                language = languageCode;
                delete where['languageCode'];
            }
        }
        const { items, total } = await super.paginate(filter);
        return await this.mapTranslatedProducts(items, language).then((items) => {
            return { items, total };
        });
    }
    async findProducts(input, language) {
        const { relations = [], findInput } = input;
        const { items, total } = await this.findAll({
            where: {
                ...findInput
            },
            relations
        });
        return await this.mapTranslatedProducts(items, language).then((items) => {
            return { items, total };
        });
    }
    async findAllProducts(langCode, relations, findInput, options = { page: 1, limit: 10 }) {
        const [items, total] = await this.typeOrmRepository.findAndCount({
            // skip: (options.page - 1) * options.limit,
            // take: options.limit,
            relations: relations,
            where: {
                ...findInput
            }
        });
        return await this.mapTranslatedProducts(items, langCode).then((items) => {
            return { items, total };
        });
    }
    async findByIdTranslated(langCode, id, relations) {
        return await this.findOneByOptions({
            where: { id: id },
            relations: relations
        }).then((result) => {
            if (result) {
                return result.translateNested(langCode, this.propsTranslate);
            }
            return result;
        });
    }
    async findById(id, options) {
        return await this.findOneByIdString(id, options);
    }
    async saveProduct(productRequest) {
        let res = await this.create(productRequest);
        return await this.findOneByIdString(res.id, {
            relations: ['variants', 'optionGroups', 'productType', 'productCategory', 'tags', 'gallery']
        });
    }
    async addGalleryImages(productId, images) {
        try {
            let product = await this.findOneByIdString(productId, {
                relations: ['gallery']
            });
            product.gallery = product.gallery.concat(images);
            return await this.typeOrmRepository.save(product);
        }
        catch (err) {
            throw new common_1.BadRequestException(err);
        }
    }
    async setAsFeatured(productId, image) {
        try {
            let product = await this.findOneByIdString(productId);
            product.featuredImage = image;
            return await this.typeOrmRepository.save(product);
        }
        catch (err) {
            throw new common_1.BadRequestException(err);
        }
    }
    async deleteGalleryImage(productId, imageId) {
        try {
            let product = await this.findOneByIdString(productId, {
                relations: ['gallery', 'variants']
            });
            if (product.variants.find((variant) => variant.image.id == imageId)) {
                throw new common_1.HttpException('Image is used in product variants', common_1.HttpStatus.BAD_REQUEST);
            }
            product.gallery = product.gallery.filter((image) => image.id !== imageId);
            return await this.typeOrmRepository.save(product);
        }
        catch (err) {
            throw new common_1.BadRequestException(err);
        }
    }
    async deleteFeaturedImage(productId) {
        try {
            let product = await this.findOneByIdString(productId);
            product.featuredImage = null;
            return await this.typeOrmRepository.save(product);
        }
        catch (err) {
            throw new common_1.BadRequestException(err);
        }
    }
    async saveProductTranslation(productTranslation) {
        return await this.typeOrmProductTranslationRepository.save(productTranslation);
    }
    async mapTranslatedProducts(items, languageCode) {
        if (languageCode) {
            return Promise.all(items.map((product) => Object.assign({}, product, product.translateNested(languageCode, this.propsTranslate))));
        }
        else {
            return items;
        }
    }
};
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(product_translation_entity_1.ProductTranslation)),
    __metadata("design:paramtypes", [type_orm_product_repository_1.TypeOrmProductRepository,
        mikro_orm_product_repository_1.MikroOrmProductRepository,
        type_orm_product_translation_repository_1.TypeOrmProductTranslationRepository,
        mikro_orm_product_translation_repository_1.MikroOrmProductTranslationRepository])
], ProductService);
//# sourceMappingURL=product.service.js.map