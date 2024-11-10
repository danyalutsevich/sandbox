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
exports.ProductOptionGroupService = void 0;
const common_1 = require("@nestjs/common");
const internal_1 = require("./../core/entities/internal");
const crud_1 = require("./../core/crud");
const typeorm_1 = require("@nestjs/typeorm");
const product_option_group_entity_1 = require("./product-option-group.entity");
const mikro_orm_product_option_group_repository_1 = require("./repository/mikro-orm-product-option-group.repository");
const type_orm_product_option_group_repository_1 = require("./repository/type-orm-product-option-group.repository");
const mikro_orm_product_option_group_translation_repository_1 = require("./repository/mikro-orm-product-option-group-translation.repository");
const type_orm_product_option_group_translation_repository_1 = require("./repository/type-orm-product-option-group-translation.repository");
let ProductOptionGroupService = exports.ProductOptionGroupService = class ProductOptionGroupService extends crud_1.TenantAwareCrudService {
    typeOrmProductOptionGroupTranslationRepository;
    constructor(typeOrmProductOptionGroupRepository, mikroOrmProductOptionGroupRepository, typeOrmProductOptionGroupTranslationRepository, mikroOrmProductOptionGroupTranslationRepository) {
        super(typeOrmProductOptionGroupRepository, mikroOrmProductOptionGroupRepository);
        this.typeOrmProductOptionGroupTranslationRepository = typeOrmProductOptionGroupTranslationRepository;
    }
    async create(productOptionsGroupInput) {
        return this.typeOrmRepository.save(productOptionsGroupInput);
    }
    async createBulk(productOptionsGroupInput) {
        return this.typeOrmRepository.save(productOptionsGroupInput);
    }
    async saveBulk(productOptionsGroupInput) {
        return this.typeOrmRepository.save(productOptionsGroupInput);
    }
    async deleteBulk(productOptionGroupsInput) {
        return this.typeOrmRepository.remove(productOptionGroupsInput);
    }
    async createTranslations(optionGroupTranslations) {
        return this.typeOrmProductOptionGroupTranslationRepository.save(optionGroupTranslations);
    }
    async createTranslation(optionGroupTranslation) {
        return this.typeOrmProductOptionGroupTranslationRepository.save(optionGroupTranslation);
    }
    async deleteGroupTranslationsBulk(productOptionGroupTranslationsInput) {
        return this.typeOrmProductOptionGroupTranslationRepository.remove(productOptionGroupTranslationsInput);
    }
};
exports.ProductOptionGroupService = ProductOptionGroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_option_group_entity_1.ProductOptionGroup)),
    __param(2, (0, typeorm_1.InjectRepository)(internal_1.ProductOptionGroupTranslation)),
    __metadata("design:paramtypes", [type_orm_product_option_group_repository_1.TypeOrmProductOptionGroupRepository,
        mikro_orm_product_option_group_repository_1.MikroOrmProductOptionGroupRepository,
        type_orm_product_option_group_translation_repository_1.TypeOrmProductOptionGroupTranslationRepository,
        mikro_orm_product_option_group_translation_repository_1.MikroOrmProductOptionGroupTranslationRepository])
], ProductOptionGroupService);
//# sourceMappingURL=product-option-group.service.js.map