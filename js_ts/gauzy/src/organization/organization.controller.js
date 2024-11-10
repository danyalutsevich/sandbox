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
exports.OrganizationController = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("./../core/crud");
const pipes_1 = require("./../shared/pipes");
const decorators_1 = require("./../shared/decorators");
const guards_1 = require("./../shared/guards");
const commands_1 = require("./commands");
const organization_entity_1 = require("./organization.entity");
const organization_service_1 = require("./organization.service");
const dto_1 = require("./dto");
let OrganizationController = exports.OrganizationController = class OrganizationController extends crud_1.CrudController {
    organizationService;
    commandBus;
    constructor(organizationService, commandBus) {
        super(organizationService);
        this.organizationService = organizationService;
        this.commandBus = commandBus;
    }
    /**
     * GET organization count
     *
     * @param options
     * @returns
     */
    async getCount(options) {
        return await this.organizationService.countBy(options);
    }
    /**
     * GET organization pagination
     *
     * @param options
     * @returns
     */
    async pagination(options) {
        return await this.organizationService.paginate(options);
    }
    /**
     * GET organizations by find many conditions
     *
     * @param options
     * @returns
     */
    async findAll(options) {
        try {
            return await this.organizationService.findAll(options);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * GET organization by id
     *
     * @param id
     * @param options
     * @returns
     */
    async findById(id, options) {
        return await this.organizationService.findOneByIdString(id, options);
    }
    /**
     * CREATE organization for specific tenant
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return await this.commandBus.execute(new commands_1.OrganizationCreateCommand(entity));
    }
    /**
     * UPDATE organization by id
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return await this.commandBus.execute(new commands_1.OrganizationUpdateCommand(id, entity));
    }
};
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW),
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "getCount", null);
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW),
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.OrganizationFindOptionsDTO]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all organizations within the tenant.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found organizations',
        type: organization_entity_1.Organization
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW),
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.OrganizationFindOptionsDTO]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find Organization by id within the tenant.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found one record',
        type: organization_entity_1.Organization
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(),
    (0, common_1.Get)(':id'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.OrganizationFindOptionsDTO]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "findById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new Organization' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The Organization has been successfully created.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateOrganizationDTO]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update existing Organization' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The Organization has been successfully updated.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateOrganizationDTO]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "update", null);
exports.OrganizationController = OrganizationController = __decorate([
    (0, swagger_1.ApiTags)('Organization'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [organization_service_1.OrganizationService, cqrs_1.CommandBus])
], OrganizationController);
//# sourceMappingURL=organization.controller.js.map