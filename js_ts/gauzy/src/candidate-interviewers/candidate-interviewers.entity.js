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
exports.CandidateInterviewers = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const internal_1 = require("../core/entities/internal");
const class_validator_1 = require("class-validator");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_candidate_interviewers_repository_1 = require("./repository/mikro-orm-candidate-interviewers.repository");
let CandidateInterviewers = exports.CandidateInterviewers = class CandidateInterviewers extends internal_1.TenantOrganizationBaseEntity {
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    interview;
    interviewId;
    employee;
    employeeId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.CandidateInterview }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.CandidateInterview, (interview) => interview.interviewers, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], CandidateInterviewers.prototype, "interview", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.interview),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], CandidateInterviewers.prototype, "interviewId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Employee }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Employee, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], CandidateInterviewers.prototype, "employee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.employee),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], CandidateInterviewers.prototype, "employeeId", void 0);
exports.CandidateInterviewers = CandidateInterviewers = __decorate([
    (0, entity_1.MultiORMEntity)('candidate_interviewer', { mikroOrmRepository: () => mikro_orm_candidate_interviewers_repository_1.MikroOrmCandidateInterviewersRepository })
], CandidateInterviewers);
//# sourceMappingURL=candidate-interviewers.entity.js.map