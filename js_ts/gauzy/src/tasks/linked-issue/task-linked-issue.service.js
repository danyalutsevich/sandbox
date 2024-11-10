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
exports.TaskLinkedIssueService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const task_linked_issue_entity_1 = require("./task-linked-issue.entity");
const crud_1 = require("../../core/crud");
const mikro_orm_linked_issue_repository_1 = require("./repository/mikro-orm-linked-issue.repository");
const type_orm_linked_issue_repository_1 = require("./repository/type-orm-linked-issue.repository");
let TaskLinkedIssueService = exports.TaskLinkedIssueService = class TaskLinkedIssueService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmTaskLinkedIssueRepository, mikroOrmTaskLinkedIssueRepository) {
        super(typeOrmTaskLinkedIssueRepository, mikroOrmTaskLinkedIssueRepository);
    }
};
exports.TaskLinkedIssueService = TaskLinkedIssueService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_linked_issue_entity_1.TaskLinkedIssue)),
    __metadata("design:paramtypes", [type_orm_linked_issue_repository_1.TypeOrmTaskLinkedIssueRepository,
        mikro_orm_linked_issue_repository_1.MikroOrmTaskLinkedIssueRepository])
], TaskLinkedIssueService);
//# sourceMappingURL=task-linked-issue.service.js.map