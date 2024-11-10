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
exports.OrganizationDepartmentController = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("./../core/crud");
const commands_1 = require("./commands");
const organization_department_entity_1 = require("./organization-department.entity");
const organization_department_service_1 = require("./organization-department.service");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const pipes_1 = require("./../shared/pipes");
let OrganizationDepartmentController = exports.OrganizationDepartmentController = class OrganizationDepartmentController extends crud_1.CrudController {
    organizationDepartmentService;
    commandBus;
    constructor(organizationDepartmentService, commandBus) {
        super(organizationDepartmentService);
        this.organizationDepartmentService = organizationDepartmentService;
        this.commandBus = commandBus;
    }
    /**
     * GET organization department by employee
     *
     * @param id
     * @returns
     */
    async findByEmployee(id) {
        return this.organizationDepartmentService.findByEmployee(id);
    }
    /**
     * UPDATE organization department by employee
     *
     * @param entity
     * @returns
     */
    async updateByEmployee(entity) {
        return this.commandBus.execute(new commands_1.OrganizationDepartmentEditByEmployeeCommand(entity));
    }
    /**
     * GET all organization department
     *
     * @param data
     * @returns
     */
    async findAll(data) {
        const { findInput, relations, order } = data;
        return this.organizationDepartmentService.findAll({
            where: findInput,
            order,
            relations
        });
    }
    /**
     * Get pagination data of organization department
     *
     * @param id
     * @param entity
     * @returns
     */
    async pagination(filter) {
        return this.organizationDepartmentService.pagination(filter);
    }
    /**
     * UPDATE organization department by id
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return this.commandBus.execute(new commands_1.OrganizationDepartmentUpdateCommand(id, entity));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all organization departments.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found departments',
        type: organization_department_entity_1.OrganizationDepartment
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)('employee/:id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationDepartmentController.prototype, "findByEmployee", null);
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
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_EMPLOYEES_EDIT),
    (0, common_1.Put)('employee'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationDepartmentController.prototype, "updateByEmployee", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all organization departments.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found departments',
        type: organization_department_entity_1.OrganizationDepartment
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
], OrganizationDepartmentController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INCOMES_VIEW),
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], OrganizationDepartmentController.prototype, "pagination", null);
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
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrganizationDepartmentController.prototype, "update", null);
exports.OrganizationDepartmentController = OrganizationDepartmentController = __decorate([
    (0, swagger_1.ApiTags)('OrganizationDepartment'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [organization_department_service_1.OrganizationDepartmentService,
        cqrs_1.CommandBus])
], OrganizationDepartmentController);
//# sourceMappingURL=organization-department.controller.js.map