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
exports.TaskLinkedIssueController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const contracts_1 = require("../../../plugins/contracts");
const guards_1 = require("../../shared/guards");
const pipes_1 = require("../../shared/pipes");
const decorators_1 = require("../../shared/decorators");
const crud_1 = require("../../core/crud");
const task_linked_issue_service_1 = require("./task-linked-issue.service");
const dto_1 = require("./dto");
let TaskLinkedIssueController = exports.TaskLinkedIssueController = class TaskLinkedIssueController extends crud_1.CrudController {
    taskLinkedIssueService;
    constructor(taskLinkedIssueService) {
        super(taskLinkedIssueService);
        this.taskLinkedIssueService = taskLinkedIssueService;
    }
    /**
     * Create new Linked Issue
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return await this.taskLinkedIssueService.create(entity);
    }
    /**
     * Update existing Linked Issue
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return await this.taskLinkedIssueService.create({
            ...entity,
            id
        });
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.ALL_ORG_EDIT, contracts_1.PermissionsEnum.ORG_TASK_ADD),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateTaskLinkedIssueDTO]),
    __metadata("design:returntype", Promise)
], TaskLinkedIssueController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.ALL_ORG_EDIT, contracts_1.PermissionsEnum.ORG_TASK_EDIT),
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateTaskLinkedIssueDTO]),
    __metadata("design:returntype", Promise)
], TaskLinkedIssueController.prototype, "update", null);
exports.TaskLinkedIssueController = TaskLinkedIssueController = __decorate([
    (0, swagger_1.ApiTags)('Linked Issue'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.ALL_ORG_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [task_linked_issue_service_1.TaskLinkedIssueService])
], TaskLinkedIssueController);
//# sourceMappingURL=task-linked-issue.controller.js.map