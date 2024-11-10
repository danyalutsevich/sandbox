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
exports.OrganizationSprint = void 0;
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/contracts/dist/index");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_organization_sprint_repository_1 = require("./repository/mikro-orm-organization-sprint.repository");
let OrganizationSprint = exports.OrganizationSprint = class OrganizationSprint extends internal_1.TenantOrganizationBaseEntity {
    name;
    goal;
    length;
    startDate;
    endDate;
    dayStart;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * OrganizationProject Relationship
     */
    project;
    projectId;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    tasks;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], OrganizationSprint.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationSprint.prototype, "goal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ default: 7 }),
    __metadata("design:type", Number)
], OrganizationSprint.prototype, "length", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], OrganizationSprint.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], OrganizationSprint.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, enum: index_1.SprintStartDayEnum }),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], OrganizationSprint.prototype, "dayStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.OrganizationProject }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationProject, (it) => it.organizationSprints, {
        /** Indicates if the relation column value can be nullable or not. */
        nullable: true,
        /** Defines the database cascade action on delete. */
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", internal_1.OrganizationProject)
], OrganizationSprint.prototype, "project", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], OrganizationSprint.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Task }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Task, (task) => task.organizationSprint),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], OrganizationSprint.prototype, "tasks", void 0);
exports.OrganizationSprint = OrganizationSprint = __decorate([
    (0, entity_1.MultiORMEntity)('organization_sprint', { mikroOrmRepository: () => mikro_orm_organization_sprint_repository_1.MikroOrmOrganizationSprintRepository })
], OrganizationSprint);
//# sourceMappingURL=organization-sprint.entity.js.map