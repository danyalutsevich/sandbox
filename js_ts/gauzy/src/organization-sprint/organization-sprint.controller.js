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
exports.OrganizationSprintController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("./../core/crud");
const organization_sprint_entity_1 = require("./organization-sprint.entity");
const organization_sprint_service_1 = require("./organization-sprint.service");
const commands_1 = require("./commands");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
let OrganizationSprintController = exports.OrganizationSprintController = class OrganizationSprintController extends crud_1.CrudController {
    organizationSprintService;
    commandBus;
    constructor(organizationSprintService, commandBus) {
        super(organizationSprintService);
        this.organizationSprintService = organizationSprintService;
        this.commandBus = commandBus;
    }
    /**
     * GET all organization sprints
     *
     * @param data
     * @returns
     */
    async findAll(data) {
        const { relations, findInput } = data;
        return this.organizationSprintService.findAll({
            where: findInput,
            relations
        });
    }
    /**
     * CREATE organization sprint
     *
     * @param entity
     * @param options
     * @returns
     */
    async create(body, ...options) {
        return this.organizationSprintService.create(body);
    }
    /**
     * UPDATE organization sprint by id
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, body) {
        return this.commandBus.execute(new commands_1.OrganizationSprintUpdateCommand(id, body));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all organization sprint.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found organization sprints',
        type: organization_sprint_entity_1.OrganizationSprint
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
], OrganizationSprintController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully created.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [organization_sprint_entity_1.OrganizationSprint, Object]),
    __metadata("design:returntype", Promise)
], OrganizationSprintController.prototype, "create", null);
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
], OrganizationSprintController.prototype, "update", null);
exports.OrganizationSprintController = OrganizationSprintController = __decorate([
    (0, swagger_1.ApiTags)('OrganizationSprint'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [organization_sprint_service_1.OrganizationSprintService,
        cqrs_1.CommandBus])
], OrganizationSprintController);
//# sourceMappingURL=organization-sprint.controller.js.map