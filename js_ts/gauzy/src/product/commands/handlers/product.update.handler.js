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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductUpdateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const product_service_1 = require("../../../product/product.service");
const product_option_service_1 = require("../../../product-option/product-option.service");
const product_update_command_1 = require("../product.update.command");
const product_option_group_service_1 = require("product-option/product-option-group.service");
const core_1 = require("core");
let ProductUpdateHandler = exports.ProductUpdateHandler = class ProductUpdateHandler {
    productOptionService;
    productService;
    productOptionsGroupService;
    constructor(productOptionService, productService, productOptionsGroupService) {
        this.productOptionService = productOptionService;
        this.productService = productService;
        this.productOptionsGroupService = productOptionsGroupService;
    }
    async execute(command) {
        const { productUpdateRequest } = command;
        const optionDeleteInputs = productUpdateRequest.optionDeleteInputs;
        const optionGroupCreateInputs = productUpdateRequest.optionGroupCreateInputs;
        const optionGroupUpdateInputs = productUpdateRequest.optionGroupUpdateInputs;
        const optionGroupDeleteInputs = productUpdateRequest.optionGroupDeleteInputs;
        const product = await this.productService.findById(productUpdateRequest.id, { relations: ['optionGroups'] });
        /**
         * delete options
         */
        for await (const option of optionDeleteInputs) {
            await this.productOptionService.deleteOptionTranslationsBulk(option.translations);
        }
        await this.productOptionService.deleteBulk(optionDeleteInputs);
        /**
         * delete option groups
         */
        for await (const group of optionGroupDeleteInputs) {
            await this.productOptionsGroupService.deleteGroupTranslationsBulk(group.translations);
        }
        await this.productOptionsGroupService.deleteBulk(optionGroupDeleteInputs);
        /**
         * create new option group
         */
        const optionsGroupsCreate = await Promise.all(optionGroupCreateInputs.map(async (group) => {
            let newGroup = new core_1.ProductOptionGroup();
            newGroup.name = group.name;
            newGroup.translations = [];
            newGroup.options = [];
            /**
             * save group options with their translations
             */
            for await (const optionInput of group.options) {
                const option = Object.assign(new core_1.ProductOption(), {
                    ...optionInput
                });
                const optionsTranslationEntites = await Promise.all(option.translations.map((optionTranslation) => {
                    let optionTranslationEntity = Object.assign(new core_1.ProductOptionTranslation(), { ...optionTranslation });
                    return this.productOptionService.saveProductOptionTranslation(optionTranslationEntity);
                }));
                option.translations = optionsTranslationEntites;
                const optionEntity = await this.productOptionService.save(option);
                if (optionEntity) {
                    newGroup.options.push(optionEntity);
                }
            }
            /**
             * save group translations.
             */
            const groupTranslationsEntites = Promise.all(group.translations.map((groupTranslation) => {
                let groupTranslationObj = Object.assign(new core_1.ProductOptionGroupTranslation(), { ...groupTranslation });
                return this.productOptionsGroupService.createTranslation(groupTranslationObj);
            }));
            newGroup.translations = (await groupTranslationsEntites);
            return newGroup;
        }));
        /**
         * update product option groups
         */
        const optionGroupsUpdate = await Promise.all(optionGroupUpdateInputs.map(async (group) => {
            for await (let option of group.options) {
                let isNewOption = false;
                if (!option.id) {
                    option = Object.assign(new core_1.ProductOption(), {
                        ...option
                    });
                    isNewOption = true;
                }
                let existingOption = isNewOption
                    ? null
                    : await this.productOptionService.findOneByIdString(option.id);
                const optionsTranslationEntites = await Promise.all(option.translations.map(async (optionTranslation) => {
                    if (this.productOptionTranslationUpdated(existingOption, optionTranslation) ||
                        !optionTranslation.id) {
                        return this.productOptionService.saveProductOptionTranslation({
                            reference: option.id || null,
                            ...optionTranslation
                        });
                    }
                }));
                option.translations = option.translations.concat((await optionsTranslationEntites).filter((tr) => !!tr));
                const optionEntity = await this.productOptionService.save(option);
                if (optionEntity && isNewOption) {
                    group.options.push(optionEntity);
                }
            }
            /**
             * save group translations.
             */
            let existingGroup = await this.productOptionsGroupService.findOneByIdString(group.id);
            const groupTranslationsEntites = Promise.all(group.translations.map((groupTranslation) => {
                if (this.productOptionGroupTranslationUpdated(existingGroup, groupTranslation)) {
                    return this.productOptionsGroupService.createTranslation({
                        reference: group.id || null,
                        ...groupTranslation
                    });
                }
            }));
            group.translations = existingGroup.translations.concat((await groupTranslationsEntites).filter((tr) => !!tr));
            return group;
        }));
        let newProductOptions = await this.productOptionsGroupService.saveBulk(optionsGroupsCreate);
        await this.productOptionsGroupService.saveBulk(optionGroupsUpdate);
        product.optionGroups = product.optionGroups.concat(newProductOptions);
        product.productCategory = productUpdateRequest.category;
        product.productTypeId = productUpdateRequest.type;
        product.tags = productUpdateRequest.tags;
        const productTranslations = await Promise.all(productUpdateRequest.translations.map((optionTranslation) => {
            return this.productService.saveProductTranslation(optionTranslation);
        }));
        product.translations = productTranslations;
        const updatedProduct = await this.productService.saveProduct(product);
        return updatedProduct;
    }
    /**
     * check if product option translation has been changed and needs updating
     */
    productOptionTranslationUpdated(productOption, productOptionTranslation) {
        if (!productOption)
            return true;
        let currentTranslation = productOption.translations.find((translation) => translation.languageCode ==
            productOptionTranslation.languageCode);
        if (!currentTranslation)
            return true;
        if (currentTranslation.name !== productOptionTranslation.name ||
            currentTranslation.description !==
                productOptionTranslation.description) {
            return true;
        }
        return false;
    }
    /**
     * check if product option group translation has been changed and needs updating
     */
    productOptionGroupTranslationUpdated(optionGroup, optionGroupTranslation) {
        if (!optionGroup)
            return false;
        let currentTranslation = optionGroup.translations.find((translation) => translation.languageCode == optionGroupTranslation.languageCode);
        if (!currentTranslation)
            return true;
        if (currentTranslation.name !== optionGroupTranslation.name) {
            return true;
        }
        return false;
    }
};
exports.ProductUpdateHandler = ProductUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(product_update_command_1.ProductUpdateCommand),
    __metadata("design:paramtypes", [product_option_service_1.ProductOptionService,
        product_service_1.ProductService, typeof (_a = typeof product_option_group_service_1.ProductOptionGroupService !== "undefined" && product_option_group_service_1.ProductOptionGroupService) === "function" ? _a : Object])
], ProductUpdateHandler);
//# sourceMappingURL=product.update.handler.js.map