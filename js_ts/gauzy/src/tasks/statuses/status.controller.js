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
exports.TaskStatusController = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("./../../shared/guards");
const dto_1 = require("./../../shared/dto");
const pipes_1 = require("../../shared/pipes");
const crud_1 = require("./../../core/crud");
const status_service_1 = require("./status.service");
const queries_1 = require("./queries");
const dto_2 = require("./dto");
const reorder_dto_1 = require("./dto/reorder.dto");
let TaskStatusController = exports.TaskStatusController = class TaskStatusController extends (0, crud_1.CrudFactory)(crud_1.PaginationParams, dto_2.CreateStatusDTO, dto_2.UpdatesStatusDTO, dto_1.CountQueryDTO) {
    queryBus;
    taskStatusService;
    constructor(queryBus, taskStatusService) {
        super(taskStatusService);
        this.queryBus = queryBus;
        this.taskStatusService = taskStatusService;
    }
    /**
     * Reorder records based on the given input.
     * @param request - ReorderRequestDTO containing the reorder instructions.
     * @returns A success message indicating that the reordering operation completed successfully.
     */
    async reorder({ reorder }) {
        return await this.taskStatusService.reorder(reorder);
    }
    /**
     * GET statuses by filters
     * If parameters not match, retrieve global statuses
     *
     * @param params
     * @returns
     */
    async findTaskStatuses(params) {
        return await this.queryBus.execute(new queries_1.FindStatusesQuery(params));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Reorder records based on given input' }) // Corrects the summary
    ,
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Reordering was successful.', // Description for successful response
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input. Check your request body.', // Description for bad request
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'An error occurred during reordering.', // Description for internal server error
    }),
    (0, common_1.Patch)('reorder'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reorder_dto_1.ReorderRequestDTO]),
    __metadata("design:returntype", Promise)
], TaskStatusController.prototype, "reorder", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find task statuses by filters.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found task statuses by filters.'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.StatusQueryDTO]),
    __metadata("design:returntype", Promise)
], TaskStatusController.prototype, "findTaskStatuses", null);
exports.TaskStatusController = TaskStatusController = __decorate([
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, swagger_1.ApiTags)('Task Status'),
    (0, common_1.Controller)('/task-statuses'),
    __metadata("design:paramtypes", [cqrs_1.QueryBus,
        status_service_1.TaskStatusService])
], TaskStatusController);
//# sourceMappingURL=status.controller.js.map