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
exports.KeyResultUpdateController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("./../core/crud");
const keyresult_update_entity_1 = require("./keyresult-update.entity");
const keyresult_update_service_1 = require("./keyresult-update.service");
const pipes_1 = require("./../shared/pipes");
const cqrs_1 = require("@nestjs/cqrs");
const commands_1 = require("./commands");
const guards_1 = require("./../shared/guards");
const dto_1 = require("./dto");
let KeyResultUpdateController = exports.KeyResultUpdateController = class KeyResultUpdateController extends crud_1.CrudController {
    commandBus;
    keyResultUpdateService;
    constructor(commandBus, keyResultUpdateService) {
        super(keyResultUpdateService);
        this.commandBus = commandBus;
        this.keyResultUpdateService = keyResultUpdateService;
    }
    async create(entity) {
        return this.keyResultUpdateService.create(entity);
    }
    async getAll(id) {
        return this.keyResultUpdateService.findAll({
            where: { keyResultId: id },
            relations: ['keyResult']
        });
    }
    async update(id, entity) {
        //We are using create here because create calls the method save()
        //We need save() to save ManyToMany relations
        try {
            return await this.keyResultUpdateService.create({
                id,
                ...entity
            });
        }
        catch (error) {
            console.log(error);
            return;
        }
    }
    async deleteBulkByKeyResultId(data) {
        const { id = null } = data;
        return this.commandBus.execute(new commands_1.KeyResultUpdateBulkDeleteCommand(id));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create an update' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Update created',
        type: keyresult_update_entity_1.KeyResultUpdate
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateKeyresultUpdateDTO]),
    __metadata("design:returntype", Promise)
], KeyResultUpdateController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all updates of keyresult' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found updates',
        type: keyresult_update_entity_1.KeyResultUpdate
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Updates not found'
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KeyResultUpdateController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing keyresult update' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The update has been successfully edited.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Update not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateKeyresultUpdateDTO]),
    __metadata("design:returntype", Promise)
], KeyResultUpdateController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Delete updates by Key Result Id'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Found key result's updates",
        type: keyresult_update_entity_1.KeyResultUpdate
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'updates not found'
    }),
    (0, common_1.Delete)('deleteBulkByKeyResultId'),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KeyResultUpdateController.prototype, "deleteBulkByKeyResultId", null);
exports.KeyResultUpdateController = KeyResultUpdateController = __decorate([
    (0, swagger_1.ApiTags)('KeyResultsUpdate'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        keyresult_update_service_1.KeyResultUpdateService])
], KeyResultUpdateController);
//# sourceMappingURL=keyresult-update.controller.js.map