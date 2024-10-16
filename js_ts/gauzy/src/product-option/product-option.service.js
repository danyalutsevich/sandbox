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
exports.ProductOptionService = void 0;
const common_1 = require("@nestjs/common");
const crud_1 = require("./../core/crud");
const internal_1 = require("./../core/entities/internal");
const typeorm_1 = require("@nestjs/typeorm");
const product_option_entity_1 = require("./product-option.entity");
const type_orm_product_option_repository_1 = require("./repository/type-orm-product-option.repository");
const mikro_orm_product_option_repository_1 = require("./repository/mikro-orm-product-option.repository");
const mikro_orm_product_option_translation_repository_1 = require("./repository/mikro-orm-product-option-translation.repository");
const type_orm_product_option_translation_repository_1 = require("./repository/type-orm-product-option-translation.repository");
let ProductOptionService = exports.ProductOptionService = class ProductOptionService extends crud_1.TenantAwareCrudService {
    typeOrmProductOptionTranslationRepository;
    constructor(typeOrmProductOptionRepository, mikroOrmProductOptionRepository, typeOrmProductOptionTranslationRepository, mikroOrmProductOptionTranslationRepository) {
        super(typeOrmProductOptionRepository, mikroOrmProductOptionRepository);
        this.typeOrmProductOptionTranslationRepository = typeOrmProductOptionTranslationRepository;
    }
    async saveProductOptionTranslations(translationsInput) {
        return this.typeOrmProductOptionTranslationRepository.save(translationsInput);
    }
    async saveProductOptionTranslation(translationInput) {
        return this.typeOrmProductOptionTranslationRepository.save(translationInput);
    }
    async save(productOptionInput) {
        return this.typeOrmRepository.save(productOptionInput);
    }
    async saveBulk(productOptionsInput) {
        return this.typeOrmRepository.save(productOptionsInput);
    }
    async deleteBulk(productOptionsInput) {
        return this.typeOrmRepository.remove(productOptionsInput);
    }
    async deleteOptionTranslationsBulk(productOptionTranslationsInput) {
        return this.typeOrmProductOptionTranslationRepository.remove(productOptionTranslationsInput);
    }
};
exports.ProductOptionService = ProductOptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_option_entity_1.ProductOption)),
    __param(2, (0, typeorm_1.InjectRepository)(internal_1.ProductOptionTranslation)),
    __metadata("design:paramtypes", [type_orm_product_option_repository_1.TypeOrmProductOptionRepository,
        mikro_orm_product_option_repository_1.MikroOrmProductOptionRepository,
        type_orm_product_option_translation_repository_1.TypeOrmProductOptionTranslationRepository,
        mikro_orm_product_option_translation_repository_1.MikroOrmProductOptionTranslationRepository])
], ProductOptionService);
//# sourceMappingURL=product-option.service.js.map