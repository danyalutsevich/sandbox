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
exports.ProductCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const product_service_1 = require("../../../product/product.service");
const product_create_command_1 = require("../product.create.command");
const product_option_service_1 = require("../../../product-option/product-option.service");
const product_entity_1 = require("../../product.entity");
const core_1 = require("core");
const product_option_group_service_1 = require("product-option/product-option-group.service");
let ProductCreateHandler = exports.ProductCreateHandler = class ProductCreateHandler {
    productOptionService;
    productService;
    productOptionsGroupService;
    constructor(productOptionService, productService, productOptionsGroupService) {
        this.productOptionService = productOptionService;
        this.productService = productService;
        this.productOptionsGroupService = productOptionsGroupService;
    }
    async execute(command) {
        const { productInput } = command;
        const optionGroupsUpdate = productInput.optionGroupCreateInputs;
        const product = Object.assign(new product_entity_1.Product(), { ...productInput });
        const optionsGroupsCreate = await Promise.all(optionGroupsUpdate.map(async (group) => {
            let newGroup = new core_1.ProductOptionGroup();
            newGroup.name = group.name;
            newGroup.translations = [];
            newGroup.options = [];
            // save group options with their translations
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
            //save group translations
            const groupTranslationsEntites = Promise.all(group.translations.map((groupTranslation) => {
                let groupTranslationObj = Object.assign(new core_1.ProductOptionGroupTranslation(), { ...groupTranslation });
                return this.productOptionsGroupService.createTranslation(groupTranslationObj);
            }));
            newGroup.translations = await groupTranslationsEntites;
            return newGroup;
        }));
        product.optionGroups = await this.productOptionsGroupService.saveBulk(optionsGroupsCreate);
        const updatedProduct = await this.productService.saveProduct(product);
        return updatedProduct;
    }
};
exports.ProductCreateHandler = ProductCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(product_create_command_1.ProductCreateCommand),
    __metadata("design:paramtypes", [product_option_service_1.ProductOptionService,
        product_service_1.ProductService, typeof (_a = typeof product_option_group_service_1.ProductOptionGroupService !== "undefined" && product_option_group_service_1.ProductOptionGroupService) === "function" ? _a : Object])
], ProductCreateHandler);
//# sourceMappingURL=product.create.handler.js.map