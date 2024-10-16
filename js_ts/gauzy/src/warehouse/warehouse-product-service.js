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
exports.WarehouseProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const crud_1 = require("./../core/crud");
const context_1 = require("./../core/context");
const internal_1 = require("./../core/entities/internal");
const type_orm_warehouse_product_variant_repository_1 = require("./repository/type-orm-warehouse-product-variant.repository");
const mikro_orm_warehouse_product_repository_1 = require("./repository/mikro-orm-warehouse-product.repository ");
const type_orm_warehouse_repository_1 = require("./repository/type-orm-warehouse.repository");
const mikro_orm_warehouse_repository_1 = require("./repository/mikro-orm-warehouse.repository");
const mikro_orm_warehouse_product_variant_repository_1 = require("./repository/mikro-orm-warehouse-product-variant.repository");
const type_orm_warehouse_product_repository_1 = require("./repository/type-orm-warehouse-product.repository ");
const type_orm_product_repository_1 = require("./../product/repository/type-orm-product.repository");
const mikro_orm_product_repository_1 = require("./../product/repository/mikro-orm-product.repository");
let WarehouseProductService = exports.WarehouseProductService = class WarehouseProductService extends crud_1.TenantAwareCrudService {
    typeOrmWarehouseRepository;
    typeOrmWarehouseProductVariantRepository;
    typeOrmProductRepository;
    constructor(typeOrmWarehouseProductRepository, mikroOrmWarehouseProductRepository, typeOrmWarehouseRepository, mikroOrmWarehouseRepository, typeOrmWarehouseProductVariantRepository, mikroOrmWarehouseProductVariantRepository, typeOrmProductRepository, mikroOrmProductRepository) {
        super(typeOrmWarehouseProductRepository, mikroOrmWarehouseProductRepository);
        this.typeOrmWarehouseRepository = typeOrmWarehouseRepository;
        this.typeOrmWarehouseProductVariantRepository = typeOrmWarehouseProductVariantRepository;
        this.typeOrmProductRepository = typeOrmProductRepository;
    }
    /**
     *
     * @param warehouseId
     * @returns
     */
    async getAllWarehouseProducts(warehouseId) {
        return await this.typeOrmRepository.find({
            where: {
                warehouseId,
                tenantId: context_1.RequestContext.currentTenantId()
            },
            relations: {
                product: true,
                variants: {
                    variant: true
                }
            }
        });
    }
    async createWarehouseProductBulk(warehouseProductCreateInput, warehouseId) {
        let productIds = warehouseProductCreateInput.map((pr) => pr.productId);
        const tenantId = context_1.RequestContext.currentTenantId();
        let warehouse = await this.typeOrmWarehouseRepository.findOneBy({
            id: warehouseId,
            tenantId
        });
        let products = await this.typeOrmProductRepository.find({
            where: {
                id: (0, typeorm_2.In)(productIds),
                tenantId
            },
            relations: {
                variants: true
            }
        });
        let warehouseProductArr = await Promise.all(products.map(async (product) => {
            let newWarehouseProduct = new internal_1.WarehouseProduct();
            newWarehouseProduct.warehouse = warehouse;
            newWarehouseProduct.product = product;
            newWarehouseProduct.organizationId = warehouse.organizationId;
            newWarehouseProduct.tenantId = tenantId;
            let warehouseVariants = await Promise.all(product.variants.map(async (variant) => {
                let warehouseVariant = new internal_1.WarehouseProductVariant();
                warehouseVariant.variant = variant;
                warehouseVariant.organizationId = warehouse.organizationId;
                warehouseVariant.tenantId = tenantId;
                return this.typeOrmWarehouseProductVariantRepository.save(warehouseVariant);
            }));
            newWarehouseProduct.variants = warehouseVariants;
            return newWarehouseProduct;
        }));
        let result = await this.typeOrmRepository.save(warehouseProductArr);
        return { items: result, total: result ? result.length : 0 };
    }
    async updateWarehouseProductQuantity(warehouseProductId, quantity) {
        let warehouseProduct = await this.typeOrmRepository.findOneBy({
            id: warehouseProductId
        });
        warehouseProduct.quantity = quantity;
        return this.typeOrmRepository.save(warehouseProduct);
    }
    async updateWarehouseProductVariantQuantity(warehouseProductVariantId, quantity) {
        let warehouseProductVariant = await this.typeOrmWarehouseProductVariantRepository.findOne({
            where: {
                id: warehouseProductVariantId
            },
            relations: {
                warehouseProduct: true
            }
        });
        warehouseProductVariant.quantity = quantity;
        let updatedVariant = await this.typeOrmWarehouseProductVariantRepository.save(warehouseProductVariant);
        let warehouseProduct = await this.typeOrmRepository.findOne({
            where: {
                id: warehouseProductVariant.warehouseProduct.id
            },
            relations: {
                variants: true
            }
        });
        let sumQuantity = warehouseProduct.variants.map((v) => +v.quantity).reduce((prev, current) => prev + current);
        if (warehouseProduct.quantity < sumQuantity) {
            warehouseProduct.quantity = +warehouseProduct.quantity + sumQuantity - warehouseProduct.quantity;
        }
        await this.typeOrmRepository.save(warehouseProduct);
        return updatedVariant;
    }
};
exports.WarehouseProductService = WarehouseProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(internal_1.WarehouseProduct)),
    __param(2, (0, typeorm_1.InjectRepository)(internal_1.Warehouse)),
    __param(4, (0, typeorm_1.InjectRepository)(internal_1.WarehouseProductVariant)),
    __param(6, (0, typeorm_1.InjectRepository)(internal_1.Product)),
    __metadata("design:paramtypes", [type_orm_warehouse_product_repository_1.TypeOrmWarehouseProductRepository,
        mikro_orm_warehouse_product_repository_1.MikroOrmWarehouseProductRepository,
        type_orm_warehouse_repository_1.TypeOrmWarehouseRepository,
        mikro_orm_warehouse_repository_1.MikroOrmWarehouseRepository,
        type_orm_warehouse_product_variant_repository_1.TypeOrmWarehouseProductVariantRepository,
        mikro_orm_warehouse_product_variant_repository_1.MikroOrmWarehouseProductVariantRepository,
        type_orm_product_repository_1.TypeOrmProductRepository,
        mikro_orm_product_repository_1.MikroOrmProductRepository])
], WarehouseProductService);
//# sourceMappingURL=warehouse-product-service.js.map