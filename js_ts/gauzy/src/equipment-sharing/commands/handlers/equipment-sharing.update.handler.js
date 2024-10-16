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
exports.EquipmentSharingUpdateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const index_1 = require("../../../../plugins/contracts/dist/index");
const equipment_sharing_entity_1 = require("../../equipment-sharing.entity");
const request_approval_entity_1 = require("../../../request-approval/request-approval.entity");
const context_1 = require("../../../core/context");
const equipment_sharing_update_command_1 = require("../equipment-sharing.update.command");
const type_orm_equipment_sharing_repository_1 = require("../../repository/type-orm-equipment-sharing.repository");
const type_orm_request_approval_repository_1 = require("../../../request-approval/repository/type-orm-request-approval.repository");
let EquipmentSharingUpdateHandler = exports.EquipmentSharingUpdateHandler = class EquipmentSharingUpdateHandler {
    typeOrmEquipmentSharingRepository;
    typeOrmRequestApprovalRepository;
    constructor(typeOrmEquipmentSharingRepository, typeOrmRequestApprovalRepository) {
        this.typeOrmEquipmentSharingRepository = typeOrmEquipmentSharingRepository;
        this.typeOrmRequestApprovalRepository = typeOrmRequestApprovalRepository;
    }
    /**
     *
     * @param command
     * @returns
     */
    async execute(command) {
        const { id, equipmentSharing } = command;
        await this.typeOrmEquipmentSharingRepository.delete(id);
        const equipmentSharingSaved = await this.typeOrmEquipmentSharingRepository.save(equipmentSharing);
        await this.typeOrmRequestApprovalRepository.delete({
            requestId: id
        });
        const requestApproval = new request_approval_entity_1.RequestApproval();
        requestApproval.requestId = equipmentSharingSaved.id;
        requestApproval.status = equipmentSharingSaved.status ? equipmentSharingSaved.status : index_1.RequestApprovalStatusTypesEnum.REQUESTED;
        requestApproval.createdBy = context_1.RequestContext.currentUser().id;
        requestApproval.createdByName = context_1.RequestContext.currentUser().name;
        requestApproval.name = equipmentSharing.name;
        requestApproval.min_count = 1;
        await this.typeOrmRequestApprovalRepository.save(requestApproval);
        return equipmentSharingSaved;
    }
};
exports.EquipmentSharingUpdateHandler = EquipmentSharingUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(equipment_sharing_update_command_1.EquipmentSharingUpdateCommand),
    __param(0, (0, typeorm_1.InjectRepository)(equipment_sharing_entity_1.EquipmentSharing)),
    __param(1, (0, typeorm_1.InjectRepository)(request_approval_entity_1.RequestApproval)),
    __metadata("design:paramtypes", [type_orm_equipment_sharing_repository_1.TypeOrmEquipmentSharingRepository,
        type_orm_request_approval_repository_1.TypeOrmRequestApprovalRepository])
], EquipmentSharingUpdateHandler);
//# sourceMappingURL=equipment-sharing.update.handler.js.map