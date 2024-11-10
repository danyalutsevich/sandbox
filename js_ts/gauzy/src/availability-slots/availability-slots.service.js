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
exports.AvailabilitySlotsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crud_1 = require("./../core/crud");
const type_orm_availability_slot_repository_1 = require("./repository/type-orm-availability-slot.repository");
const mikro_orm_availability_slot_repository_1 = require("./repository/mikro-orm-availability-slot.repository");
const availability_slots_entity_1 = require("./availability-slots.entity");
let AvailabilitySlotsService = exports.AvailabilitySlotsService = class AvailabilitySlotsService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmAvailabilitySlotRepository, mikroOrmAvailabilitySlotRepository) {
        super(typeOrmAvailabilitySlotRepository, mikroOrmAvailabilitySlotRepository);
    }
    /**
     *
     * @param availabilitySlots
     * @returns
     */
    async createBulk(availabilitySlots) {
        return await this.typeOrmRepository.save(availabilitySlots);
    }
};
exports.AvailabilitySlotsService = AvailabilitySlotsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(availability_slots_entity_1.AvailabilitySlot)),
    __metadata("design:paramtypes", [type_orm_availability_slot_repository_1.TypeOrmAvailabilitySlotRepository,
        mikro_orm_availability_slot_repository_1.MikroOrmAvailabilitySlotRepository])
], AvailabilitySlotsService);
//# sourceMappingURL=availability-slots.service.js.map