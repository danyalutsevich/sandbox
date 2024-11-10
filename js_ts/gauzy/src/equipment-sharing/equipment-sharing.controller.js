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
exports.EquipmentSharingController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const crud_1 = require("./../core/crud");
const equipment_sharing_entity_1 = require("./equipment-sharing.entity");
const equipment_sharing_service_1 = require("./equipment-sharing.service");
const index_1 = require("../../plugins/contracts/dist/index");
const common_2 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const commands_1 = require("./commands");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
const decorators_1 = require("./../shared/decorators");
let EquipmentSharingController = exports.EquipmentSharingController = class EquipmentSharingController extends crud_1.CrudController {
    equipmentSharingService;
    commandBus;
    constructor(equipmentSharingService, commandBus) {
        super(equipmentSharingService);
        this.equipmentSharingService = equipmentSharingService;
        this.commandBus = commandBus;
    }
    /**
     * GET equipment sharings by orgization id
     *
     * @param orgId
     * @returns
     */
    async findEquipmentSharingsByOrgId(organizationId) {
        return this.equipmentSharingService.findEquipmentSharingsByOrgId(organizationId);
    }
    /**
     * GET equipment sharings by employee id
     *
     * @param employeeId
     * @returns
     */
    async findEquipmentSharingsByEmployeeId(employeeId) {
        return this.equipmentSharingService.findRequestApprovalsByEmployeeId(employeeId);
    }
    /**
     * CREATE equipment sharing
     *
     * @param organizationId
     * @param equipmentSharing
     * @returns
     */
    async createEquipmentSharing(organizationId, equipmentSharing) {
        return await this.commandBus.execute(new commands_1.EquipmentSharingCreateCommand(organizationId, equipmentSharing));
    }
    /**
     * UPDATE equipment sharings request approval
     *
     * @param id
     * @returns
     */
    async equipmentSharingsRequestApproval(id) {
        return await this.commandBus.execute(new commands_1.EquipmentSharingStatusCommand(id, index_1.RequestApprovalStatusTypesEnum.APPROVED));
    }
    /**
     * UPDATE equipment sharings request refuse
     *
     * @param id
     * @returns
     */
    async equipmentSharingsRequestRefuse(id) {
        return this.commandBus.execute(new commands_1.EquipmentSharingStatusCommand(id, index_1.RequestApprovalStatusTypesEnum.REFUSED));
    }
    /**
     * GET equipment sharing by pagination
     *
     * @param filter
     * @returns
     */
    async pagination(filter) {
        return this.equipmentSharingService.pagination(filter);
    }
    /**
     * GET all equipment sharings
     *
     * @param data
     * @returns
     */
    async findAll(data) {
        const { relations = [], findInput } = data;
        return this.equipmentSharingService.findAll({
            where: findInput,
            relations
        });
    }
    /**
     * UPDATE equipment sharing by id
     *
     * @param id
     * @param equipmentSharing
     * @returns
     */
    async update(id, equipmentSharing) {
        return await this.commandBus.execute(new commands_1.EquipmentSharingUpdateCommand(id, equipmentSharing));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find equipment sharings By Orgization Id'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found equipment sharings',
        type: equipment_sharing_entity_1.EquipmentSharing
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_EQUIPMENT_SHARING_VIEW),
    (0, common_1.Get)('/organization/:id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EquipmentSharingController.prototype, "findEquipmentSharingsByOrgId", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find equipment sharings By Employee Id'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found equipment sharings',
        type: equipment_sharing_entity_1.EquipmentSharing
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_EQUIPMENT_SHARING_VIEW),
    (0, common_1.Get)('employee/:id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EquipmentSharingController.prototype, "findEquipmentSharingsByEmployeeId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create an new record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully created.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.EQUIPMENT_MAKE_REQUEST, index_1.PermissionsEnum.ORG_EQUIPMENT_SHARING_EDIT),
    (0, common_2.Post)('organization/:id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, equipment_sharing_entity_1.EquipmentSharing]),
    __metadata("design:returntype", Promise)
], EquipmentSharingController.prototype, "createEquipmentSharing", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'equipment sharings request approval' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found equipment sharings',
        type: equipment_sharing_entity_1.EquipmentSharing
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.EQUIPMENT_APPROVE_REQUEST, index_1.PermissionsEnum.ORG_EQUIPMENT_SHARING_EDIT),
    (0, common_1.Put)('approval/:id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EquipmentSharingController.prototype, "equipmentSharingsRequestApproval", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'equipment sharings request refuse' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found equipment sharings',
        type: equipment_sharing_entity_1.EquipmentSharing
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.EQUIPMENT_APPROVE_REQUEST, index_1.PermissionsEnum.ORG_EQUIPMENT_SHARING_EDIT),
    (0, common_1.Put)('refuse/:id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EquipmentSharingController.prototype, "equipmentSharingsRequestRefuse", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_EQUIPMENT_SHARING_VIEW),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    (0, common_1.Get)('pagination'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], EquipmentSharingController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all equipment sharings'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found equipment sharings',
        type: equipment_sharing_entity_1.EquipmentSharing
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_EQUIPMENT_SHARING_VIEW),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EquipmentSharingController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully edited.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.EQUIPMENT_APPROVE_REQUEST, index_1.PermissionsEnum.ORG_EQUIPMENT_SHARING_EDIT),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, equipment_sharing_entity_1.EquipmentSharing]),
    __metadata("design:returntype", Promise)
], EquipmentSharingController.prototype, "update", null);
exports.EquipmentSharingController = EquipmentSharingController = __decorate([
    (0, swagger_1.ApiTags)('EquipmentSharing'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [equipment_sharing_service_1.EquipmentSharingService, cqrs_1.CommandBus])
], EquipmentSharingController);
//# sourceMappingURL=equipment-sharing.controller.js.map