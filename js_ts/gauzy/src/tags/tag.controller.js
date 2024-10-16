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
exports.TagController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const pipes_1 = require("./../shared/pipes");
const tag_service_1 = require("./tag.service");
const commands_1 = require("./commands");
const dto_1 = require("./dto");
let TagController = exports.TagController = class TagController extends crud_1.CrudController {
    tagService;
    commandBus;
    constructor(tagService, commandBus) {
        super(tagService);
        this.tagService = tagService;
        this.commandBus = commandBus;
    }
    /**
     * Get tags by level
     *
     * @param query
     */
    async findTagsByLevel(query) {
        try {
            console.log('TagController -> findTagsByLevel -> query', query);
            return await this.tagService.findTagsByLevel(query, query.relations);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * Get tags
     *
     * @param data
     * @returns
     */
    async findAll(options) {
        return await this.commandBus.execute(new commands_1.TagListCommand(options.where, options.relations));
    }
    /**
     * Create new tag
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return await this.tagService.create(entity);
    }
    /**
     * Update existing tag by ID
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return await this.tagService.update(id, entity);
    }
};
__decorate([
    (0, common_1.Get)('level'),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TagQueryByLevelDTO]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "findTagsByLevel", null);
__decorate([
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "findAll", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT, index_1.PermissionsEnum.ORG_TAGS_ADD),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateTagDTO]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT, index_1.PermissionsEnum.ORG_TAGS_EDIT),
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateTagDTO]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "update", null);
exports.TagController = TagController = __decorate([
    (0, swagger_1.ApiTags)('Tags'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [tag_service_1.TagService, cqrs_1.CommandBus])
], TagController);
//# sourceMappingURL=tag.controller.js.map