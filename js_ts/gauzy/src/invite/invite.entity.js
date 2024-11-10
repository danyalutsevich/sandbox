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
exports.Invite = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_invite_repository_1 = require("./repository/mikro-orm-invite.repository");
let Invite = exports.Invite = class Invite extends internal_1.TenantOrganizationBaseEntity {
    token;
    email;
    status;
    expireDate;
    actionDate;
    code;
    fullName;
    isExpired;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * Invited By User
     */
    invitedBy;
    invitedById;
    /**
     * Invited User Role
     */
    role;
    roleId;
    /**
     * Invites belongs to user
     */
    user;
    userId;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    /**
     * Organization Projects
     */
    projects;
    /**
     * Organization Contacts
     */
    organizationContacts;
    /**
     * Organization Departments
     */
    departments;
    /**
    * Organization Teams
    */
    teams;
};
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Invite.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, minLength: 3, maxLength: 100 }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Invite.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.InviteStatusEnum }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Invite.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Invite.prototype, "expireDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Invite.prototype, "actionDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Invite.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Invite.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.User }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.User, { nullable: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Invite.prototype, "invitedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.invitedBy),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Invite.prototype, "invitedById", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.Role }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Role, { nullable: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Invite.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((invite) => invite.role),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Invite.prototype, "roleId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.Role }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.User, (it) => it.invites, {
        onDelete: "SET NULL"
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Invite.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((invite) => invite.user),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], Invite.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.OrganizationProject }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.OrganizationProject, {
        owner: true,
        pivotTable: 'invite_organization_project',
        joinColumn: 'inviteId',
        inverseJoinColumn: 'organizationProjectId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'invite_organization_project'
    }),
    __metadata("design:type", Array)
], Invite.prototype, "projects", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.OrganizationContact }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.OrganizationContact, {
        owner: true,
        pivotTable: 'invite_organization_contact',
        joinColumn: 'inviteId',
        inverseJoinColumn: 'organizationContactId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'invite_organization_contact'
    }),
    __metadata("design:type", Array)
], Invite.prototype, "organizationContacts", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.OrganizationDepartment }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.OrganizationDepartment, {
        owner: true,
        pivotTable: 'invite_organization_department',
        joinColumn: 'inviteId',
        inverseJoinColumn: 'organizationDepartmentId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'invite_organization_department'
    }),
    __metadata("design:type", Array)
], Invite.prototype, "departments", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.OrganizationTeam }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.OrganizationTeam, {
        owner: true,
        pivotTable: 'invite_organization_team',
        joinColumn: 'inviteId',
        inverseJoinColumn: 'organizationTeamId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'invite_organization_team'
    }),
    __metadata("design:type", Array)
], Invite.prototype, "teams", void 0);
exports.Invite = Invite = __decorate([
    (0, entity_1.MultiORMEntity)('invite', { mikroOrmRepository: () => mikro_orm_invite_repository_1.MikroOrmInviteRepository })
], Invite);
//# sourceMappingURL=invite.entity.js.map