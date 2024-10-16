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
exports.ApprovalPolicyController = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const decorators_1 = require("./../shared/decorators");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
const core_1 = require("../core");
const approval_policy_entity_1 = require("./approval-policy.entity");
const approval_policy_service_1 = require("./approval-policy.service");
const commands_1 = require("./commands");
const dto_1 = require("./dto");
let ApprovalPolicyController = exports.ApprovalPolicyController = class ApprovalPolicyController extends core_1.CrudController {
    approvalPolicyService;
    commandBus;
    constructor(approvalPolicyService, commandBus) {
        super(approvalPolicyService);
        this.approvalPolicyService = approvalPolicyService;
        this.commandBus = commandBus;
    }
    /**
     * GET all approval policies except time off and equipment sharing policy
     *
     * @param data
     * @returns
     */
    async findApprovalPoliciesForRequestApproval(data) {
        return await this.commandBus.execute(new commands_1.RequestApprovalPolicyGetCommand(data));
    }
    /**
     * GET approval policies by pagination
     *
     * @param options
     * @returns
     */
    async pagination(options) {
        return this.approvalPolicyService.pagination(options);
    }
    /**
     * GET all approval policies
     *
     * @param data
     * @returns
     */
    async findAll(options) {
        return await this.commandBus.execute(new commands_1.ApprovalPolicyGetCommand(options));
    }
    /**
     * CREATE approval policy
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return await this.commandBus.execute(new commands_1.ApprovalPolicyCreateCommand(entity));
    }
    /**
     * UPDATE approval policy by id
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return await this.commandBus.execute(new commands_1.ApprovalPolicyUpdateCommand(id, entity));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all approval policies except time off and equipment sharing policy.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found policies',
        type: approval_policy_entity_1.ApprovalPolicy
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.APPROVAL_POLICY_VIEW),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Get)('request-approval'),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApprovalPolicyController.prototype, "findApprovalPoliciesForRequestApproval", null);
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.APPROVAL_POLICY_VIEW),
    (0, common_1.Get)('pagination'),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], ApprovalPolicyController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all approval policies.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found policies',
        type: approval_policy_entity_1.ApprovalPolicy
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.APPROVAL_POLICY_VIEW),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], ApprovalPolicyController.prototype, "findAll", null);
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
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({
        whitelist: true
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateApprovalPolicyDTO]),
    __metadata("design:returntype", Promise)
], ApprovalPolicyController.prototype, "create", null);
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
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({
        whitelist: true
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateApprovalPolicyDTO]),
    __metadata("design:returntype", Promise)
], ApprovalPolicyController.prototype, "update", null);
exports.ApprovalPolicyController = ApprovalPolicyController = __decorate([
    (0, swagger_1.ApiTags)('ApprovalPolicy'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.APPROVAL_POLICY_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [approval_policy_service_1.ApprovalPolicyService,
        cqrs_1.CommandBus])
], ApprovalPolicyController);
//# sourceMappingURL=approval-policy.controller.js.map