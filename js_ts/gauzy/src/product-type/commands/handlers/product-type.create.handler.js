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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTypeCreateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const product_type_service_1 = require("./../../product-type.service");
const product_type_create_command_1 = require("../product-type.create.command");
let ProductTypeCreateHandler = exports.ProductTypeCreateHandler = class ProductTypeCreateHandler {
    productTypeService;
    constructor(productTypeService) {
        this.productTypeService = productTypeService;
    }
    async execute(command) {
        try {
            const { input, language } = command;
            return await this.productTypeService.mapTranslatedProductType(await this.productTypeService.create(input), language);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.ProductTypeCreateHandler = ProductTypeCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(product_type_create_command_1.ProductTypeCreateCommand),
    __metadata("design:paramtypes", [product_type_service_1.ProductTypeService])
], ProductTypeCreateHandler);
//# sourceMappingURL=product-type.create.handler.js.map