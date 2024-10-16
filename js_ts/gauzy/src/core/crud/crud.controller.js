"use strict";
// Code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta
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
exports.CrudController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pagination_params_1 = require("./pagination-params");
const pipes_1 = require("./../../shared/pipes");
const dto_1 = require("core/dto");
let CrudController = exports.CrudController = class CrudController {
    crudService;
    constructor(crudService) {
        this.crudService = crudService;
    }
    /**
     * Get the total count of all records.
     *
     * This endpoint retrieves the total count of all records for the given entity.
     *
     * @param options Optional query options for filtering records.
     * @returns A promise resolving to the count of all records.
     */
    async getCount(options) {
        return await this.crudService.countBy(options);
    }
    /**
     * Get a paginated list of records.
     *
     * This endpoint retrieves a paginated list of records for the given entity.
     *
     * @param filter Optional filter parameters for pagination.
     * @returns A promise resolving to a paginated list of records.
     */
    async pagination(filter, ...options) {
        return this.crudService.paginate(filter);
    }
    /**
     * Get all records.
     *
     * This endpoint retrieves all records for the given entity without pagination.
     *
     * @param filter Optional filter parameters for retrieval.
     * @returns A promise resolving to all records.
     */
    async findAll(filter, ...options) {
        return this.crudService.findAll(filter);
    }
    /**
     * Get a record by ID.
     *
     * This endpoint retrieves a specific record by its ID.
     *
     * @param id The ID of the record to find.
     * @returns A promise resolving to the found record.
     */
    async findById(id, ...options) {
        return this.crudService.findOneByIdString(id);
    }
    /**
     * Create a new record.
     *
     * This endpoint creates a new record for the given entity type.
     *
     * @param entity The data for the new record.
     * @returns A promise resolving to the created record.
     */
    async create(entity, ...options) {
        return this.crudService.create(entity);
    }
    /**
     * Update an existing record.
     *
     * This endpoint updates an existing record based on its ID and the given data.
     *
     * @param id The ID of the record to update.
     * @param entity The data to update the record with.
     * @returns A promise resolving to the updated record.
     */
    async update(id, entity, ...options) {
        return this.crudService.update(id, entity); // FIXME: https://github.com/typeorm/typeorm/issues/1544
    }
    /**
     * Delete a record.
     *
     * This endpoint deletes a specific record based on its ID.
     *
     * @param id The ID of the record to delete.
     * @returns A promise resolving to the result of the delete operation.
     */
    async delete(id, ...options) {
        return this.crudService.delete(id);
    }
    /**
     * Soft deletes a record by ID.
     *
     * This endpoint marks a record as deleted without physically removing it from the database.
     * The soft-deleted record can be restored later.
     *
     * @param id The ID of the record to soft delete.
     * @returns The soft-deleted record.
     */
    async softRemove(id, ...options) {
        // Soft delete the record
        return await this.crudService.softRemove(id, options);
    }
    /**
     * Restores a soft-deleted record by ID.
     *
     * This endpoint restores a record that was previously soft-deleted,
     * allowing it to be used again in the application.
     *
     * @param id The ID of the record to restore.
     * @returns The restored record.
     */
    async softRecover(id, ...options) {
        // Restore the soft-deleted record
        return await this.crudService.softRecover(id, options);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get total record count' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Total record count retrieved successfully',
    }),
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudController.prototype, "getCount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get paginated records' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Records retrieved successfully',
    }),
    (0, common_1.Get)('pagination'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_1.PaginationParams, Object]),
    __metadata("design:returntype", Promise)
], CrudController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all records' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Records retrieved successfully',
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_1.PaginationParams, Object]),
    __metadata("design:returntype", Promise)
], CrudController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find record by ID' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Record retrieved successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found',
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CrudController.prototype, "findById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Record created successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input provided',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CrudController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update existing record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Record updated successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input provided for update',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CrudController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'Record deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CrudController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a record by ID' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.ACCEPTED,
        description: 'Record soft deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found',
    }),
    (0, common_1.Delete)(':id/soft'),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.UsePipes)(new pipes_1.AbstractValidationPipe({ whitelist: true }, { query: dto_1.TenantOrganizationBaseDTO })),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CrudController.prototype, "softRemove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Restore a soft-deleted record by ID' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.ACCEPTED,
        description: 'Record restored successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found or not in a soft-deleted state',
    }),
    (0, common_1.Put)(':id/recover'),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.UsePipes)(new pipes_1.AbstractValidationPipe({ whitelist: true }, { query: dto_1.TenantOrganizationBaseDTO })),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CrudController.prototype, "softRecover", null);
exports.CrudController = CrudController = __decorate([
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Forbidden'
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [Object])
], CrudController);
//# sourceMappingURL=crud.controller.js.map