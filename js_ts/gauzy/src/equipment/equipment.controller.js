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
exports.EquipmentController = void 0;
const crud_1 = require("./../core/crud");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const equipment_entity_1 = require("./equipment.entity");
const equipment_service_1 = require("./equipment.service");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
const dto_1 = require("./dto");
let EquipmentController = exports.EquipmentController = class EquipmentController extends crud_1.CrudController {
    equipmentService;
    constructor(equipmentService) {
        super(equipmentService);
        this.equipmentService = equipmentService;
    }
    async pagination(filter) {
        return this.equipmentService.pagination(filter);
    }
    async findAll(data) {
        const { relations, findInput } = data;
        return await this.equipmentService.findAll({
            where: {
                ...findInput
            },
            relations
        });
    }
    async create(entity) {
        //We are using create here because create calls the method save()
        //We need save() to save ManyToMany relations
        return await this.equipmentService.create(entity);
    }
    async update(id, entity) {
        //We are using create here because create calls the method save()
        //We need save() to save ManyToMany relations
        return await this.equipmentService.create({
            id,
            ...entity
        });
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all equipment sharings by pagination'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found equipment sharings',
        type: equipment_entity_1.Equipment
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all equipment sharings'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found equipment sharings',
        type: equipment_entity_1.Equipment
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'New equipment record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully created.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateEquipmentDTO]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing equipment' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully updated.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateEquipmentDTO]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "update", null);
exports.EquipmentController = EquipmentController = __decorate([
    (0, swagger_1.ApiTags)('Equipment'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [equipment_service_1.EquipmentService])
], EquipmentController);
//# sourceMappingURL=equipment.controller.js.map