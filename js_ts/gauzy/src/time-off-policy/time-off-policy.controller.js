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
exports.TimeOffPolicyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const decorators_1 = require("./../shared/decorators");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
const time_off_policy_entity_1 = require("./time-off-policy.entity");
const time_off_policy_service_1 = require("./time-off-policy.service");
let TimeOffPolicyController = exports.TimeOffPolicyController = class TimeOffPolicyController extends crud_1.CrudController {
    timeOffPolicyService;
    constructor(timeOffPolicyService) {
        super(timeOffPolicyService);
        this.timeOffPolicyService = timeOffPolicyService;
    }
    /**
     * GET all time off policies using pagination
     *
     */
    async pagination(filter) {
        return this.timeOffPolicyService.paginate(filter);
    }
    /**
     * GET all time off policies
     *
     * @param data
     * @returns
     */
    async findAll(data) {
        const { relations, findInput } = data;
        return this.timeOffPolicyService.findAll({
            where: findInput,
            relations
        });
    }
    /**
     * CREATE time off policy
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return await this.timeOffPolicyService.create(entity);
    }
    /**
     * UPDATE time off policy by id
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return await this.timeOffPolicyService.update(id, entity);
    }
};
__decorate([
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.POLICY_VIEW),
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], TimeOffPolicyController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all policies.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found policies',
        type: time_off_policy_entity_1.TimeOffPolicy
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.POLICY_VIEW),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TimeOffPolicyController.prototype, "findAll", null);
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
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.POLICY_EDIT),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TimeOffPolicyController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update record' }),
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
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.POLICY_EDIT),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TimeOffPolicyController.prototype, "update", null);
exports.TimeOffPolicyController = TimeOffPolicyController = __decorate([
    (0, swagger_1.ApiTags)('TimeOffPolicy'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [time_off_policy_service_1.TimeOffPolicyService])
], TimeOffPolicyController);
//# sourceMappingURL=time-off-policy.controller.js.map