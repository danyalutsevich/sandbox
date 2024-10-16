"use strict";
// Modified code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta
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
exports.User = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const core_1 = require("@mikro-orm/core");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const index_1 = require("../../plugins/contracts/dist/index");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_user_repository_1 = require("./repository/mikro-orm-user.repository");
let User = exports.User = class User extends internal_1.TenantBaseEntity {
    [core_1.EntityRepositoryType];
    thirdPartyId;
    firstName;
    lastName;
    email;
    phoneNumber;
    username;
    timeZone;
    timeFormat;
    hash;
    refreshToken;
    imageUrl;
    preferredLanguage;
    preferredComponentLayout;
    code;
    codeExpireAt;
    emailVerifiedAt;
    emailToken;
    /** Additional virtual columns */
    name;
    isEmailVerified;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * Role
     */
    role;
    roleId;
    /**
     * ImageAsset
     */
    image;
    imageId;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    // Tags
    tags;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    /**
     * UserOrganization
     */
    organizations;
    /**
     * User belongs to invites
     */
    invites;
    /**
     * User social accounts
     */
    socialAccounts;
};
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "thirdPartyId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, minLength: 3, maxLength: 100 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, minLength: 4, maxLength: 12 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, minLength: 3, maxLength: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "timeZone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, enum: index_1.TimeFormatEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(index_1.TimeFormatEnum),
    (0, entity_1.MultiORMColumn)({
        type: 'simple-enum',
        enum: index_1.TimeFormatEnum,
        default: index_1.TimeFormatEnum.FORMAT_12_HOURS
    }),
    __metadata("design:type", Number)
], User.prototype, "timeFormat", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "hash", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    (0, entity_1.MultiORMColumn)({ insert: false, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, maxLength: 500 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, enum: index_1.LanguagesEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(index_1.LanguagesEnum),
    (0, entity_1.MultiORMColumn)({ nullable: true, default: index_1.LanguagesEnum.ENGLISH }),
    __metadata("design:type", String)
], User.prototype, "preferredLanguage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, enum: index_1.ComponentLayoutStyleEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(index_1.ComponentLayoutStyleEnum),
    (0, entity_1.MultiORMColumn)({
        type: 'simple-enum',
        nullable: true,
        default: index_1.ComponentLayoutStyleEnum.TABLE,
        enum: index_1.ComponentLayoutStyleEnum
    }),
    __metadata("design:type", String)
], User.prototype, "preferredComponentLayout", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    (0, entity_1.MultiORMColumn)({ insert: false, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    (0, entity_1.MultiORMColumn)({ insert: false, nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "codeExpireAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Date }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    (0, entity_1.MultiORMColumn)({ insert: false, nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "emailVerifiedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    (0, entity_1.MultiORMColumn)({ insert: false, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "emailToken", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", Boolean)
], User.prototype, "isEmailVerified", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Role, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** Database cascade action on delete. */
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], User.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.role),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], User.prototype, "roleId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.ImageAsset, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** Database cascade action on delete. */
        onDelete: 'SET NULL',
        /** Eager relations are always loaded automatically when relation's owner entity is loaded using find* methods. */
        eager: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], User.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.image),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], User.prototype, "imageId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Tag, (tag) => tag.users, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'tag_user',
        joinColumn: 'userId',
        inverseJoinColumn: 'tagId'
    }),
    (0, typeorm_1.JoinTable)({
        name: 'tag_user'
    }),
    __metadata("design:type", Array)
], User.prototype, "tags", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.UserOrganization, (it) => it.user, {
        cascade: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], User.prototype, "organizations", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Invite, (it) => it.user),
    __metadata("design:type", Array)
], User.prototype, "invites", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.SocialAccount, (it) => it.user),
    __metadata("design:type", Array)
], User.prototype, "socialAccounts", void 0);
exports.User = User = __decorate([
    (0, entity_1.MultiORMEntity)('user', { mikroOrmRepository: () => mikro_orm_user_repository_1.MikroOrmUserRepository })
], User);
//# sourceMappingURL=user.entity.js.map