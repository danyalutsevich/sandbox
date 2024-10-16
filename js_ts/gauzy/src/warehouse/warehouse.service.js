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
exports.WarehouseService = void 0;
const common_1 = require("@nestjs/common");
const crud_1 = require("./../core/crud");
const mikro_orm_warehouse_repository_1 = require("./repository/mikro-orm-warehouse.repository");
const type_orm_warehouse_repository_1 = require("./repository/type-orm-warehouse.repository");
let WarehouseService = exports.WarehouseService = class WarehouseService extends crud_1.TenantAwareCrudService {
    typeOrmWarehouseRepository;
    mikroOrmWarehouseRepository;
    constructor(typeOrmWarehouseRepository, mikroOrmWarehouseRepository) {
        super(typeOrmWarehouseRepository, mikroOrmWarehouseRepository);
        this.typeOrmWarehouseRepository = typeOrmWarehouseRepository;
        this.mikroOrmWarehouseRepository = mikroOrmWarehouseRepository;
    }
    /**
     *
     * @param id
     * @param relations
     * @returns
     */
    async findById(id, relations = []) {
        return await super.findOneByIdString(id, { relations });
    }
};
exports.WarehouseService = WarehouseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [type_orm_warehouse_repository_1.TypeOrmWarehouseRepository,
        mikro_orm_warehouse_repository_1.MikroOrmWarehouseRepository])
], WarehouseService);
//# sourceMappingURL=warehouse.service.js.map