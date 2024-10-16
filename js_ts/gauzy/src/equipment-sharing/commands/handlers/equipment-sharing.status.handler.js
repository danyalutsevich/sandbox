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
exports.EquipmentSharingStatusHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const equipment_sharing_status_command_1 = require("../equipment-sharing.status.command");
const equipment_sharing_entity_1 = require("../../equipment-sharing.entity");
const request_approval_entity_1 = require("../../../request-approval/request-approval.entity");
const type_orm_equipment_sharing_repository_1 = require("../../repository/type-orm-equipment-sharing.repository");
const type_orm_request_approval_repository_1 = require("../../../request-approval/repository/type-orm-request-approval.repository");
let EquipmentSharingStatusHandler = exports.EquipmentSharingStatusHandler = class EquipmentSharingStatusHandler {
    typeOrmEquipmentSharingRepository;
    typeOrmRequestApprovalRepository;
    constructor(typeOrmEquipmentSharingRepository, typeOrmRequestApprovalRepository) {
        this.typeOrmEquipmentSharingRepository = typeOrmEquipmentSharingRepository;
        this.typeOrmRequestApprovalRepository = typeOrmRequestApprovalRepository;
    }
    async execute(command) {
        const { id, status } = command;
        const [equipmentSharing, requestApproval] = await Promise.all([
            await this.typeOrmEquipmentSharingRepository.findOneBy({ id }),
            await this.typeOrmRequestApprovalRepository.findOneBy({ requestId: id })
        ]);
        if (!equipmentSharing) {
            throw new common_1.NotFoundException('Equiment Sharing not found');
        }
        equipmentSharing.status = status;
        if (requestApproval) {
            requestApproval.status = status;
            await this.typeOrmRequestApprovalRepository.save(requestApproval);
        }
        return await this.typeOrmEquipmentSharingRepository.save(equipmentSharing);
    }
};
exports.EquipmentSharingStatusHandler = EquipmentSharingStatusHandler = __decorate([
    (0, cqrs_1.CommandHandler)(equipment_sharing_status_command_1.EquipmentSharingStatusCommand),
    __param(0, (0, typeorm_1.InjectRepository)(equipment_sharing_entity_1.EquipmentSharing)),
    __param(1, (0, typeorm_1.InjectRepository)(request_approval_entity_1.RequestApproval)),
    __metadata("design:paramtypes", [type_orm_equipment_sharing_repository_1.TypeOrmEquipmentSharingRepository,
        type_orm_request_approval_repository_1.TypeOrmRequestApprovalRepository])
], EquipmentSharingStatusHandler);
//# sourceMappingURL=equipment-sharing.status.handler.js.map