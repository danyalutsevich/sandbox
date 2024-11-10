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
exports.PipelineController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const pipeline_service_1 = require("./pipeline.service");
const pipes_1 = require("./../shared/pipes");
const decorators_1 = require("./../shared/decorators");
const guards_1 = require("./../shared/guards");
let PipelineController = exports.PipelineController = class PipelineController extends crud_1.CrudController {
    pipelineService;
    constructor(pipelineService) {
        super(pipelineService);
        this.pipelineService = pipelineService;
    }
    /**
     * Paginate sales pipelines with permissions, validation, and filtering options.
     *
     * @param filter - The filtering options for pagination.
     * @returns The paginated result of sales pipelines.
     */
    async pagination(filter) {
        return await this.pipelineService.pagination(filter);
    }
    /**
     * Find all sales pipelines with permissions, API documentation, and query parameter parsing.
     *
     * @param data - The query parameter data.
     * @returns A paginated result of sales pipelines.
     */
    async findAll(filter) {
        return await this.pipelineService.findAll(filter);
    }
    /**
     * Find deals for a specific sales pipeline with permissions, API documentation, and parameter validation.
     *
     * @param id - The identifier of the sales pipeline.
     * @returns A paginated result of deals for the specified sales pipeline.
     */
    async findDeals(id) {
        return await this.pipelineService.findDeals(id);
    }
    /**
     * Create a new record with permissions, API documentation, and HTTP status codes.
     *
     * @param entity - The data to create a new record.
     * @returns The created record.
     */
    async create(entity) {
        return await this.pipelineService.create(entity);
    }
    /**
     * Update an existing record with permissions, API documentation, and HTTP status codes.
     *
     * @param id - The identifier of the record to update.
     * @param entity - The data to update the existing record.
     * @param options - Additional options if needed.
     * @returns The updated record.
     */
    async update(id, entity) {
        return await this.pipelineService.update(id, entity);
    }
    /**
     * Delete a record with permissions, API documentation, and HTTP status codes.
     *
     * @param id - The identifier of the record to delete.
     * @param options - Additional options if needed.
     * @returns The result of the deletion operation.
     */
    async delete(id) {
        return await this.pipelineService.delete(id);
    }
};
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.VIEW_SALES_PIPELINES),
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], PipelineController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'find all' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found records'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.VIEW_SALES_PIPELINES),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], PipelineController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'find deals' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found records'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.VIEW_SALES_PIPELINES),
    (0, common_1.Get)(':id/deals'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PipelineController.prototype, "findDeals", null);
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
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.EDIT_SALES_PIPELINES),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PipelineController.prototype, "create", null);
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
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.EDIT_SALES_PIPELINES),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PipelineController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'The record has been successfully deleted'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.EDIT_SALES_PIPELINES),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PipelineController.prototype, "delete", null);
exports.PipelineController = PipelineController = __decorate([
    (0, swagger_1.ApiTags)('Pipeline'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.EDIT_SALES_PIPELINES),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [pipeline_service_1.PipelineService])
], PipelineController);
//# sourceMappingURL=pipeline.controller.js.map