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
exports.EquipmentSharingCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const index_1 = require("../../../../plugins/contracts/dist/index");
const equipment_sharing_entity_1 = require("../../equipment-sharing.entity");
const equipment_sharing_create_command_1 = require("../equipment-sharing.create.command");
const request_approval_entity_1 = require("../../../request-approval/request-approval.entity");
const context_1 = require("../../../core/context");
const type_orm_equipment_sharing_repository_1 = require("../../repository/type-orm-equipment-sharing.repository");
const type_orm_request_approval_repository_1 = require("../../../request-approval/repository/type-orm-request-approval.repository");
let EquipmentSharingCreateHandler = exports.EquipmentSharingCreateHandler = class EquipmentSharingCreateHandler {
    typeOrmEquipmentSharingRepository;
    typeOrmRequestApprovalRepository;
    constructor(typeOrmEquipmentSharingRepository, typeOrmRequestApprovalRepository) {
        this.typeOrmEquipmentSharingRepository = typeOrmEquipmentSharingRepository;
        this.typeOrmRequestApprovalRepository = typeOrmRequestApprovalRepository;
    }
    async execute(command) {
        const { orgId, equipmentSharing } = command;
        equipmentSharing.createdBy = context_1.RequestContext.currentUser().id;
        equipmentSharing.createdByName = context_1.RequestContext.currentUser().name;
        equipmentSharing.organizationId = orgId;
        const equipmentSharingSaved = await this.typeOrmEquipmentSharingRepository.save(equipmentSharing);
        const requestApproval = new request_approval_entity_1.RequestApproval();
        requestApproval.requestId = equipmentSharingSaved.id;
        requestApproval.requestType = index_1.ApprovalPolicyTypesStringEnum.EQUIPMENT_SHARING;
        requestApproval.status = equipmentSharingSaved.status ? equipmentSharingSaved.status : index_1.RequestApprovalStatusTypesEnum.REQUESTED;
        requestApproval.createdBy = context_1.RequestContext.currentUser().id;
        requestApproval.createdByName = context_1.RequestContext.currentUser().name;
        requestApproval.name = equipmentSharing.name;
        requestApproval.min_count = 1;
        await this.typeOrmRequestApprovalRepository.save(requestApproval);
        return equipmentSharingSaved;
    }
};
exports.EquipmentSharingCreateHandler = EquipmentSharingCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(equipment_sharing_create_command_1.EquipmentSharingCreateCommand),
    __param(0, (0, typeorm_1.InjectRepository)(equipment_sharing_entity_1.EquipmentSharing)),
    __param(1, (0, typeorm_1.InjectRepository)(request_approval_entity_1.RequestApproval)),
    __metadata("design:paramtypes", [type_orm_equipment_sharing_repository_1.TypeOrmEquipmentSharingRepository,
        type_orm_request_approval_repository_1.TypeOrmRequestApprovalRepository])
], EquipmentSharingCreateHandler);
//# sourceMappingURL=equipment-sharing.create.handler.js.map