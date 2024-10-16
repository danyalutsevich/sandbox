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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskLinkedIssueDTO = void 0;
const index_1 = require("../../../../plugins/contracts/dist/index");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../core/dto");
const class_validator_1 = require("class-validator");
class TaskLinkedIssueDTO extends dto_1.TenantOrganizationBaseDTO {
    action;
    taskFromId;
    taskToId;
}
exports.TaskLinkedIssueDTO = TaskLinkedIssueDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.TaskRelatedIssuesRelationEnum }),
    (0, class_validator_1.IsEnum)(index_1.TaskRelatedIssuesRelationEnum),
    __metadata("design:type", Number)
], TaskLinkedIssueDTO.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TaskLinkedIssueDTO.prototype, "taskFromId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TaskLinkedIssueDTO.prototype, "taskToId", void 0);
//# sourceMappingURL=task-linked-issue.dto.js.map