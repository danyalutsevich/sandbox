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
exports.OrganizationContactController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const dto_1 = require("./../core/dto");
const commands_1 = require("./commands");
const organization_contact_entity_1 = require("./organization-contact.entity");
const organization_contact_service_1 = require("./organization-contact.service");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const dto_2 = require("./../shared/dto");
const pipes_1 = require("./../shared/pipes");
const dto_3 = require("./dto");
let OrganizationContactController = exports.OrganizationContactController = class OrganizationContactController extends crud_1.CrudController {
    organizationContactService;
    commandBus;
    constructor(organizationContactService, commandBus) {
        super(organizationContactService);
        this.organizationContactService = organizationContactService;
        this.commandBus = commandBus;
    }
    /**
     * GET organization contact count
     *
     * @param options
     * @returns
     */
    async getCount(options) {
        return await this.organizationContactService.countBy(options);
    }
    /**
     * GET all organization contact by Pagination
     *
     * @param filter
     * @returns
     */
    async pagination(filter) {
        return await this.organizationContactService.pagination(filter);
    }
    /**
     * GET all organization contacts by Employee
     *
     * @param id
     * @param data
     * @returns
     */
    async findByEmployee(employeeId, options) {
        return await this.organizationContactService.findByEmployee(employeeId, options);
    }
    /**
     * UPDATE organization contact by Employee
     *
     * @param entity
     * @returns
     */
    async updateByEmployee(entity) {
        return this.commandBus.execute(new commands_1.OrganizationContactEditByEmployeeCommand(entity));
    }
    /**
     * GET all organization contacts
     *
     * @param data
     * @returns
     */
    async findAll(data) {
        return this.organizationContactService.findAllOrganizationContacts(data);
    }
    /**
     * GET organization contacts by id
     *
     * @param id
     * @param data
     * @returns
     */
    async findById(id, data) {
        const { relations = [] } = data;
        return this.organizationContactService.findById(id, relations);
    }
    /**
     * CREATE organization contact
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return await this.commandBus.execute(new commands_1.OrganizationContactCreateCommand(entity));
    }
    /**
     * Update organization contact by ID
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return await this.commandBus.execute(new commands_1.OrganizationContactUpdateCommand(id, entity));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all organization contact counts in the same tenant' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found organization contact count'
    }),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_CONTACT_VIEW),
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.CountQueryDTO]),
    __metadata("design:returntype", Promise)
], OrganizationContactController.prototype, "getCount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all organization contacts in the same tenant using pagination.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found organization contacts in the tenant',
        type: organization_contact_entity_1.OrganizationContact
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_CONTACT_VIEW),
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], OrganizationContactController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all organization contacts by Employee.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found organization contacts',
        type: organization_contact_entity_1.OrganizationContact
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)('employee/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.TenantOrganizationBaseDTO]),
    __metadata("design:returntype", Promise)
], OrganizationContactController.prototype, "findByEmployee", null);
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
], OrganizationContactController.prototype, "updateByEmployee", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all organization contacts.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found contacts recurring expense',
        type: organization_contact_entity_1.OrganizationContact
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
], OrganizationContactController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get organization contacts by id.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found organization contacts.',
        type: organization_contact_entity_1.OrganizationContact
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrganizationContactController.prototype, "findById", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_CONTACT_EDIT),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_3.CreateOrganizationContactDTO]),
    __metadata("design:returntype", Promise)
], OrganizationContactController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_CONTACT_EDIT),
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_3.UpdateOrganizationContactDTO]),
    __metadata("design:returntype", Promise)
], OrganizationContactController.prototype, "update", null);
exports.OrganizationContactController = OrganizationContactController = __decorate([
    (0, swagger_1.ApiTags)('OrganizationContact'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [organization_contact_service_1.OrganizationContactService,
        cqrs_1.CommandBus])
], OrganizationContactController);
//# sourceMappingURL=organization-contact.controller.js.map