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
exports.RequestApprovalTeam = void 0;
/*
  - Request Approval Employee table is the third table which will combine the employee table and the request approval table.
  - Request Approval Employee table has the many to one relationship to the RequestApproval table and the Employee table by requestApprovalId and employeeId
*/
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_request_approval_team_repository_1 = require("./repository/mikro-orm-request-approval-team.repository");
let RequestApprovalTeam = exports.RequestApprovalTeam = class RequestApprovalTeam extends internal_1.TenantOrganizationBaseEntity {
    status;
    requestApproval;
    requestApprovalId;
    team;
    teamId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], RequestApprovalTeam.prototype, "status", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.RequestApproval, (requestApproval) => requestApproval.teamApprovals, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], RequestApprovalTeam.prototype, "requestApproval", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.requestApproval),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], RequestApprovalTeam.prototype, "requestApprovalId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationTeam, (team) => team.requestApprovals, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], RequestApprovalTeam.prototype, "team", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.team),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], RequestApprovalTeam.prototype, "teamId", void 0);
exports.RequestApprovalTeam = RequestApprovalTeam = __decorate([
    (0, entity_1.MultiORMEntity)('request_approval_team', { mikroOrmRepository: () => mikro_orm_request_approval_team_repository_1.MikroOrmRequestApprovalTeamRepository })
], RequestApprovalTeam);
//# sourceMappingURL=request-approval-team.entity.js.map