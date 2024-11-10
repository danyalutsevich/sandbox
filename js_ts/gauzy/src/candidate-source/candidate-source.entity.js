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
exports.CandidateSource = void 0;
const swagger_1 = require("@nestjs/swagger");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_candidate_source_repository_1 = require("./repository/mikro-orm-candidate-source.repository");
let CandidateSource = exports.CandidateSource = class CandidateSource extends internal_1.TenantOrganizationBaseEntity {
    name;
    /*
    |--------------------------------------------------------------------------
    | @OneToOne
    |--------------------------------------------------------------------------
    */
    candidate;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], CandidateSource.prototype, "name", void 0);
__decorate([
    (0, entity_1.MultiORMOneToOne)(() => internal_1.Candidate, (candidate) => candidate.source, {
        /** This column is a boolean flag indicating that this is the inverse side of the relationship, and it doesn't control the foreign key directly  */
        owner: false
    }),
    __metadata("design:type", Object)
], CandidateSource.prototype, "candidate", void 0);
exports.CandidateSource = CandidateSource = __decorate([
    (0, entity_1.MultiORMEntity)('candidate_source', { mikroOrmRepository: () => mikro_orm_candidate_source_repository_1.MikroOrmCandidateSourceRepository })
], CandidateSource);
//# sourceMappingURL=candidate-source.entity.js.map