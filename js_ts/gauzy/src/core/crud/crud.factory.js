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
exports.CrudFactory = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../core/dto");
const pipes_1 = require("./../../shared/pipes");
const pagination_params_1 = require("./pagination-params");
/**
 * Base crud controller
 *
 * @param createDTO
 * @param updateDTO
 * @returns
 */
function CrudFactory(queryDTO, createDTO, updateDTO, countQueryDTO) {
    class BaseCrudController {
        crudService;
        constructor(crudService) {
            this.crudService = crudService;
        }
        /**
         *
         * @param options
         * @returns
         */
        async getCount(options) {
            return await this.crudService.countBy(options);
        }
        /**
         *
         * @param filter
         * @param options
         * @returns
         */
        async pagination(filter, ...options) {
            return await this.crudService.paginate(filter);
        }
        /**
         *
         * @param filter
         * @param options
         * @returns
         */
        async findAll(filter, ...options) {
            return await this.crudService.findAll(filter);
        }
        /**
         *
         * @param id
         * @param options
         * @returns
         */
        async findById(id, ...options) {
            return await this.crudService.findOneByIdString(id);
        }
        /**
         *
         * @param entity
         * @returns
         */
        async create(entity) {
            return await this.crudService.create(entity);
        }
        /**
         *
         * @param id
         * @param entity
         * @returns
         */
        async update(id, entity) {
            return await this.crudService.update(id, entity);
        }
        /**
         *
         * @param id
         * @returns
         */
        async delete(id) {
            return await this.crudService.delete(id);
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
    }
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Find records count.' }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.OK,
            description: 'Found records count.'
        }),
        (0, common_1.HttpCode)(common_1.HttpStatus.OK),
        (0, common_1.Get)('count'),
        (0, common_1.UsePipes)(new pipes_1.AbstractValidationPipe({ transform: true, whitelist: true }, { query: countQueryDTO })),
        __param(0, (0, common_1.Query)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BaseCrudController.prototype, "getCount", null);
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Find all records using pagination.' }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.OK,
            description: 'Found records using pagination.'
        }),
        (0, common_1.HttpCode)(common_1.HttpStatus.OK),
        (0, common_1.Get)('pagination'),
        (0, common_1.UsePipes)(new pipes_1.AbstractValidationPipe({ transform: true, whitelist: true }, { query: queryDTO })),
        __param(0, (0, common_1.Query)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [pagination_params_1.PaginationParams, Object]),
        __metadata("design:returntype", Promise)
    ], BaseCrudController.prototype, "pagination", null);
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Find all records.' }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.OK,
            description: 'Found all records.'
        }),
        (0, common_1.HttpCode)(common_1.HttpStatus.OK),
        (0, common_1.Get)(),
        (0, common_1.UsePipes)(new pipes_1.AbstractValidationPipe({ transform: true, whitelist: true }, { query: queryDTO })),
        __param(0, (0, common_1.Query)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [pagination_params_1.PaginationParams, Object]),
        __metadata("design:returntype", Promise)
    ], BaseCrudController.prototype, "findAll", null);
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Find one record by id.' }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.OK,
            description: 'Found one record by id.'
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.NOT_FOUND,
            description: 'Record not found.'
        }),
        (0, common_1.HttpCode)(common_1.HttpStatus.OK),
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], BaseCrudController.prototype, "findById", null);
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Create new record.' }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.CREATED,
            description: 'The record has been successfully created.'
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.BAD_REQUEST,
            description: 'Invalid input, The response body may contain clues as to what went wrong.'
        }),
        (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
        (0, common_1.Post)(),
        (0, common_1.UsePipes)(new pipes_1.AbstractValidationPipe({ transform: true, whitelist: true }, { body: createDTO })),
        __param(0, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BaseCrudController.prototype, "create", null);
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Update an existing record.' }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.ACCEPTED,
            description: 'The record has been successfully edited.'
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.NOT_FOUND,
            description: 'Record not found'
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.BAD_REQUEST,
            description: 'Invalid input, The response body may contain clues as to what went wrong.'
        }),
        (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
        (0, common_1.Put)(':id'),
        (0, common_1.UsePipes)(new pipes_1.AbstractValidationPipe({ transform: true, whitelist: true }, { body: updateDTO })),
        __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
        __param(1, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], BaseCrudController.prototype, "update", null);
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Delete record.' }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.ACCEPTED,
            description: 'The record has been successfully deleted.'
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.NOT_FOUND,
            description: 'Record not found.'
        }),
        (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BaseCrudController.prototype, "delete", null);
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Soft delete a record by ID' }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.ACCEPTED,
            description: 'Record soft deleted successfully'
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.NOT_FOUND,
            description: 'Record not found'
        }),
        (0, common_1.Delete)(':id/soft'),
        (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
        (0, common_1.UsePipes)(new pipes_1.AbstractValidationPipe({ whitelist: true }, { query: dto_1.TenantOrganizationBaseDTO })),
        __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], BaseCrudController.prototype, "softRemove", null);
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Restore a soft-deleted record by ID' }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.ACCEPTED,
            description: 'Record restored successfully'
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.NOT_FOUND,
            description: 'Record not found or not in a soft-deleted state'
        }),
        (0, common_1.Put)(':id/recover'),
        (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
        (0, common_1.UsePipes)(new pipes_1.AbstractValidationPipe({ whitelist: true }, { query: dto_1.TenantOrganizationBaseDTO })),
        __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], BaseCrudController.prototype, "softRecover", null);
    return BaseCrudController;
}
exports.CrudFactory = CrudFactory;
//# sourceMappingURL=crud.factory.js.map