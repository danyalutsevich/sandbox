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
exports.EquipmentService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const index_1 = require("../../plugins/common/dist/index");
const crud_1 = require("./../core/crud");
const type_orm_equipment_repository_1 = require("./repository/type-orm-equipment.repository");
const mikro_orm_equipment_repository_1 = require("./repository/mikro-orm-equipment.repository");
const equipment_entity_1 = require("./equipment.entity");
let EquipmentService = exports.EquipmentService = class EquipmentService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmEquipmentRepository, mikroOrmEquipmentRepository) {
        super(typeOrmEquipmentRepository, mikroOrmEquipmentRepository);
    }
    /**
     *
     * @returns
     */
    async getAll() {
        return await this.findAll({
            relations: {
                image: true,
                equipmentSharings: true,
                tags: true
            }
        });
    }
    /**
     *
     * @param filter
     * @returns
     */
    pagination(filter) {
        if ('where' in filter) {
            const { where } = filter;
            ['name', 'type', 'serialNumber'].forEach((param) => {
                if (param in where) {
                    const value = where[param];
                    if ((0, index_1.isNotEmpty)(value))
                        filter.where[param] = (0, typeorm_2.Like)(`%${value}%`);
                }
            });
        }
        return super.paginate(filter);
    }
};
exports.EquipmentService = EquipmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(equipment_entity_1.Equipment)),
    __metadata("design:paramtypes", [type_orm_equipment_repository_1.TypeOrmEquipmentRepository,
        mikro_orm_equipment_repository_1.MikroOrmEquipmentRepository])
], EquipmentService);
//# sourceMappingURL=equipment.service.js.map