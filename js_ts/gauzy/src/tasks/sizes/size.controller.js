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
exports.TaskSizeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("../../core/crud");
const dto_1 = require("../../shared/dto");
const guards_1 = require("../../shared/guards");
const pipes_1 = require("../../shared/pipes");
const size_service_1 = require("./size.service");
const dto_2 = require("./dto");
let TaskSizeController = exports.TaskSizeController = class TaskSizeController extends (0, crud_1.CrudFactory)(crud_1.PaginationParams, dto_2.CreateTaskSizeDTO, dto_2.UpdateTaskSizeDTO, dto_1.CountQueryDTO) {
    taskSizeService;
    constructor(taskSizeService) {
        super(taskSizeService);
        this.taskSizeService = taskSizeService;
    }
    /**
     * GET task sizes by filters
     * If parameters not match, retrieve global task sizes
     *
     * @param params
     * @returns
     */
    async fetchAll(params) {
        return await this.taskSizeService.fetchAll(params);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find task sizes by filters.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found task sizes by filters.'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.TaskSizeQueryDTO]),
    __metadata("design:returntype", Promise)
], TaskSizeController.prototype, "fetchAll", null);
exports.TaskSizeController = TaskSizeController = __decorate([
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, swagger_1.ApiTags)('Task Size'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [size_service_1.TaskSizeService])
], TaskSizeController);
//# sourceMappingURL=size.controller.js.map