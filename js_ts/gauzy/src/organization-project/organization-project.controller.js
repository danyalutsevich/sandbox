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
exports.OrganizationProjectController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const commands_1 = require("./commands");
const organization_project_entity_1 = require("./organization-project.entity");
const organization_project_service_1 = require("./organization-project.service");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const dto_1 = require("./../shared/dto");
const pipes_1 = require("./../shared/pipes");
const dto_2 = require("./../core/dto");
const dto_3 = require("./dto");
let OrganizationProjectController = exports.OrganizationProjectController = class OrganizationProjectController extends crud_1.CrudController {
    organizationProjectService;
    commandBus;
    constructor(organizationProjectService, commandBus) {
        super(organizationProjectService);
        this.organizationProjectService = organizationProjectService;
        this.commandBus = commandBus;
    }
    /**
     * GET organization project by employee
     *
     * @param employeeId
     * @param options
     * @returns
     */
    async findByEmployee(employeeId, options) {
        return await this.organizationProjectService.findByEmployee(employeeId, options);
    }
    /**
     * UPDATE organization project by employee
     *
     * @param body
     * @returns
     */
    async updateByEmployee(body) {
        return await this.commandBus.execute(new commands_1.OrganizationProjectEditByEmployeeCommand(body));
    }
    /**
     * UPDATE organization project task view mode
     *
     * @param id
     * @param body
     * @returns
     */
    async updateTaskViewMode(id, entity) {
        return await this.commandBus.execute(new commands_1.OrganizationProjectUpdateCommand({ ...entity, id }));
    }
    /**
     * Update organization project settings by ID.
     *
     * @param id - The ID of the organization project to update settings for.
     * @param entity - An object containing the updated project settings.
     * @returns A promise that resolves to an `IOrganizationProject` object representing the updated project settings.
     */
    async updateProjectSetting(id, entity) {
        return await this.commandBus.execute(new commands_1.OrganizationProjectSettingUpdateCommand(id, entity));
    }
    /**
     *
     * @param params
     * @returns
     */
    async findSyncedProjects(params) {
        return await this.organizationProjectService.findSyncedProjects(params);
    }
    /**
     * GET organization project count
     *
     * @param options
     * @returns
     */
    async getCount(options) {
        return await this.organizationProjectService.countBy(options);
    }
    /**
     * GET all organization project by Pagination
     *
     * @param filter
     * @returns
     */
    async pagination(filter) {
        return await this.organizationProjectService.pagination(filter);
    }
    /**
     * GET all organization project
     *
     * @param data
     * @returns
     */
    async findAll(params) {
        return await this.organizationProjectService.findAll(params);
    }
    /**
     * Find project by primary ID
     *
     * @param id
     * @returns
     */
    async findById(id, options) {
        return await this.organizationProjectService.findOneByIdString(id, options);
    }
    /**
     * CREATE organization project
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return await this.commandBus.execute(new commands_1.OrganizationProjectCreateCommand(entity));
    }
    /**
     * UPDATE organization project by id
     *
     * @param id
     * @param body
     * @returns
     */
    async update(id, entity) {
        return await this.commandBus.execute(new commands_1.OrganizationProjectUpdateCommand({ ...entity, id }));
    }
    /**
     * Delete organization project
     *
     * @param id
     * @returns
     */
    async delete(id) {
        return await this.organizationProjectService.delete(id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all organization projects by Employee.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found projects',
        type: organization_project_entity_1.OrganizationProject
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.ORG_PROJECT_VIEW),
    (0, common_1.Get)('employee/:employeeId'),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Param)('employeeId', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_2.TenantOrganizationBaseDTO]),
    __metadata("design:returntype", Promise)
], OrganizationProjectController.prototype, "findByEmployee", null);
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
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT, index_1.PermissionsEnum.ORG_PROJECT_EDIT),
    (0, common_1.Put)('employee'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationProjectController.prototype, "updateByEmployee", null);
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
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT, index_1.PermissionsEnum.ORG_PROJECT_EDIT),
    (0, common_1.Put)('/task-view/:id'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_3.UpdateTaskModeDTO]),
    __metadata("design:returntype", Promise)
], OrganizationProjectController.prototype, "updateTaskViewMode", null);
__decorate([
    (0, common_1.Put)('/setting/:id'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_3.UpdateProjectSettingDTO]),
    __metadata("design:returntype", Promise)
], OrganizationProjectController.prototype, "updateProjectSetting", null);
__decorate([
    (0, common_1.Get)('/synced'),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], OrganizationProjectController.prototype, "findSyncedProjects", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find organization projects count.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found count',
        type: organization_project_entity_1.OrganizationProject
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)('count'),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.ORG_PROJECT_VIEW),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CountQueryDTO]),
    __metadata("design:returntype", Promise)
], OrganizationProjectController.prototype, "getCount", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all organization project in the same tenant using pagination.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found organization project in the tenant',
        type: organization_project_entity_1.OrganizationProject
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.ORG_PROJECT_VIEW),
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], OrganizationProjectController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all organization projects.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found projects',
        type: organization_project_entity_1.OrganizationProject
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.ORG_PROJECT_VIEW),
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], OrganizationProjectController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.ORG_PROJECT_VIEW),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.RelationsQueryDTO]),
    __metadata("design:returntype", Promise)
], OrganizationProjectController.prototype, "findById", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT, index_1.PermissionsEnum.ORG_PROJECT_ADD),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_3.CreateOrganizationProjectDTO]),
    __metadata("design:returntype", Promise)
], OrganizationProjectController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Put)(':id'),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT, index_1.PermissionsEnum.ORG_PROJECT_EDIT),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_3.UpdateOrganizationProjectDTO]),
    __metadata("design:returntype", Promise)
], OrganizationProjectController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete organization team' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'The record has been successfully deleted'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT, index_1.PermissionsEnum.ORG_PROJECT_DELETE),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationProjectController.prototype, "delete", null);
exports.OrganizationProjectController = OrganizationProjectController = __decorate([
    (0, swagger_1.ApiTags)('OrganizationProject'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [organization_project_service_1.OrganizationProjectService,
        cqrs_1.CommandBus])
], OrganizationProjectController);
//# sourceMappingURL=organization-project.controller.js.map