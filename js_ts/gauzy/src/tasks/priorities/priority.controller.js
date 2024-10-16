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
exports.TaskPriorityController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("../../core/crud");
const guards_1 = require("../../shared/guards");
const dto_1 = require("../../shared/dto");
const pipes_1 = require("../../shared/pipes");
const priority_service_1 = require("./priority.service");
const dto_2 = require("./dto");
let TaskPriorityController = exports.TaskPriorityController = class TaskPriorityController extends (0, crud_1.CrudFactory)(crud_1.PaginationParams, dto_2.CreateTaskPriorityDTO, dto_2.UpdateTaskPriorityDTO, dto_1.CountQueryDTO) {
    taskPriorityService;
    constructor(taskPriorityService) {
        super(taskPriorityService);
        this.taskPriorityService = taskPriorityService;
    }
    /**
     * GET task priorities by filters
     * If parameters not match, retrieve global task priorities
     *
     * @param params
     * @returns
     */
    async fetchAll(params) {
        return await this.taskPriorityService.fetchAll(params);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find task priorities by filters.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found task priorities by filters.'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.TaskPriorityQueryDTO]),
    __metadata("design:returntype", Promise)
], TaskPriorityController.prototype, "fetchAll", null);
exports.TaskPriorityController = TaskPriorityController = __decorate([
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, swagger_1.ApiTags)('Task Priority'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [priority_service_1.TaskPriorityService])
], TaskPriorityController);
//# sourceMappingURL=priority.controller.js.map