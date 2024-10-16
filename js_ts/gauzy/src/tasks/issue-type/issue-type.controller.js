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
exports.IssueTypeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../shared/dto");
const pipes_1 = require("../../shared/pipes");
const guards_1 = require("../../shared/guards");
const crud_1 = require("./../../core/crud");
const issue_type_service_1 = require("./issue-type.service");
const dto_2 = require("./dto");
let IssueTypeController = exports.IssueTypeController = class IssueTypeController extends (0, crud_1.CrudFactory)(crud_1.PaginationParams, dto_2.CreateIssueTypeDTO, dto_2.UpdateIssueTypeDTO, dto_1.CountQueryDTO) {
    issueTypeService;
    constructor(issueTypeService) {
        super(issueTypeService);
        this.issueTypeService = issueTypeService;
    }
    /**
     *
     * @param id
     * @param input
     * @returns
     */
    async markAsDefault(id, input) {
        return await this.issueTypeService.markAsDefault(id, input);
    }
    /**
     * GET issue types by filters
     * If parameters not match, retrieve global task sizes
     *
     * @param params
     * @returns
     */
    async findAllIssueTypes(params) {
        return await this.issueTypeService.fetchAll(params);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Make issue type default.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Task issue type maked as default'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Put)(':id/default'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_2.UpdateIssueTypeDTO]),
    __metadata("design:returntype", Promise)
], IssueTypeController.prototype, "markAsDefault", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find issue types by filters.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found task issue type by filters.'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.IssueTypeQueryDTO]),
    __metadata("design:returntype", Promise)
], IssueTypeController.prototype, "findAllIssueTypes", null);
exports.IssueTypeController = IssueTypeController = __decorate([
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, swagger_1.ApiTags)('Issue Type'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [issue_type_service_1.IssueTypeService])
], IssueTypeController);
//# sourceMappingURL=issue-type.controller.js.map