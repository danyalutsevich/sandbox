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
exports.TaskVersionController = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("../../core/crud");
const guards_1 = require("../../shared/guards");
const dto_1 = require("../../shared/dto");
const pipes_1 = require("../../shared/pipes");
const version_service_1 = require("./version.service");
const queries_1 = require("./queries");
const dto_2 = require("./dto");
let TaskVersionController = exports.TaskVersionController = class TaskVersionController extends (0, crud_1.CrudFactory)(crud_1.PaginationParams, dto_2.CreateVersionDTO, dto_2.UpdatesVersionDTO, dto_1.CountQueryDTO) {
    queryBus;
    taskVersionService;
    constructor(queryBus, taskVersionService) {
        super(taskVersionService);
        this.queryBus = queryBus;
        this.taskVersionService = taskVersionService;
    }
    /**
     * GET versions by filters
     * If parameters not match, retrieve global versions
     *
     * @param params
     * @returns
     */
    async findTaskVersions(params) {
        return await this.queryBus.execute(new queries_1.FindVersionsQuery(params));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find task versions by filters.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found task versions by filters.'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.VersionQueryDTO]),
    __metadata("design:returntype", Promise)
], TaskVersionController.prototype, "findTaskVersions", null);
exports.TaskVersionController = TaskVersionController = __decorate([
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, swagger_1.ApiTags)('Task Version'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cqrs_1.QueryBus, version_service_1.TaskVersionService])
], TaskVersionController);
//# sourceMappingURL=version.controller.js.map