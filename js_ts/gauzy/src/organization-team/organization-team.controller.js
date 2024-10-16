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
exports.OrganizationTeamController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
const decorators_1 = require("./../shared/decorators");
const dto_1 = require("./../shared/dto");
const queries_1 = require("./queries");
const dto_2 = require("./dto");
const organization_team_entity_1 = require("./organization-team.entity");
const organization_team_service_1 = require("./organization-team.service");
const commands_1 = require("./commands");
let OrganizationTeamController = exports.OrganizationTeamController = class OrganizationTeamController extends crud_1.CrudController {
    _commandBus;
    _queryBus;
    _organizationTeamService;
    constructor(_commandBus, _queryBus, _organizationTeamService) {
        super(_organizationTeamService);
        this._commandBus = _commandBus;
        this._queryBus = _queryBus;
        this._organizationTeamService = _organizationTeamService;
    }
    /**
     * GET find my organization teams
     *
     * @param data
     * @returns
     */
    async findMyTeams(params) {
        return await this._organizationTeamService.findMyTeams(params);
    }
    /**
     * GET organization team count
     *
     * @param options
     * @returns
     */
    async getCount(options) {
        return await this._organizationTeamService.countBy(options);
    }
    /**
     * GET organization teams by pagination
     *
     * @param params
     * @returns
     */
    async pagination(params) {
        return await this._organizationTeamService.pagination(params);
    }
    /**
     * GET organization teams
     *
     * @param params
     * @returns
     */
    async findAll(params) {
        return await this._organizationTeamService.findAll(params);
    }
    /**
     * Find team by primary ID
     *
     * @param id - The primary ID of the organization team.
     * @param query - Query parameters for team statistics.
     * @returns The result of the team statistics query.
     */
    async findById(id, options) {
        return await this._queryBus.execute(new queries_1.GetOrganizationTeamStatisticQuery(id, options));
    }
    /**
     * CREATE organization team
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return await this._commandBus.execute(new commands_1.OrganizationTeamCreateCommand(entity));
    }
    /**
     * UPDATE organization team by id
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return await this._organizationTeamService.update(id, entity);
    }
    /**
     * Delete organization team
     *
     * @param id
     * @returns
     */
    async delete(teamId, options) {
        return await this._organizationTeamService.deleteTeam(teamId, options);
    }
    /**
     * Exist from teams where users joined as a team members.
     *
     * @param userId
     * @returns
     */
    async existTeamsAsMember(userId) {
        return await this._organizationTeamService.existTeamsAsMember(userId);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all organization Teams.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found Teams',
        type: organization_team_entity_1.OrganizationTeam
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.ORG_TEAM_VIEW),
    (0, common_1.Get)('me'),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], OrganizationTeamController.prototype, "findMyTeams", null);
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.ORG_TEAM_VIEW),
    (0, common_1.Get)('count'),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CountQueryDTO]),
    __metadata("design:returntype", Promise)
], OrganizationTeamController.prototype, "getCount", null);
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.ORG_TEAM_VIEW),
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], OrganizationTeamController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all organization Teams.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found Teams',
        type: organization_team_entity_1.OrganizationTeam
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.ORG_TEAM_VIEW),
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], OrganizationTeamController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.ORG_TEAM_VIEW),
    (0, common_1.Get)(':id'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_2.OrganizationTeamStatisticDTO]),
    __metadata("design:returntype", Promise)
], OrganizationTeamController.prototype, "findById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully created.' /*, type: T*/
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT, index_1.PermissionsEnum.ORG_TEAM_ADD),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.CreateOrganizationTeamDTO]),
    __metadata("design:returntype", Promise)
], OrganizationTeamController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update an organization Team' }),
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
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT, index_1.PermissionsEnum.ORG_TEAM_EDIT),
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_2.UpdateOrganizationTeamDTO]),
    __metadata("design:returntype", Promise)
], OrganizationTeamController.prototype, "update", null);
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
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT, index_1.PermissionsEnum.ORG_TEAM_DELETE),
    (0, common_1.Delete)(':id'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.DeleteQueryDTO]),
    __metadata("design:returntype", Promise)
], OrganizationTeamController.prototype, "delete", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT, index_1.PermissionsEnum.ORG_TEAM_REMOVE_ACCOUNT_AS_MEMBER),
    (0, common_1.Delete)('teams/:userId'),
    __param(0, (0, common_1.Param)('userId', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationTeamController.prototype, "existTeamsAsMember", null);
exports.OrganizationTeamController = OrganizationTeamController = __decorate([
    (0, swagger_1.ApiTags)('OrganizationTeam'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus,
        organization_team_service_1.OrganizationTeamService])
], OrganizationTeamController);
//# sourceMappingURL=organization-team.controller.js.map