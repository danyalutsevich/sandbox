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
exports.KeyResultController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const keyresult_entity_1 = require("./keyresult.entity");
const crud_1 = require("./../core/crud");
const keyresult_service_1 = require("./keyresult.service");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
const dto_1 = require("./dto");
let KeyResultController = exports.KeyResultController = class KeyResultController extends crud_1.CrudController {
    keyResultService;
    constructor(keyResultService) {
        super(keyResultService);
        this.keyResultService = keyResultService;
    }
    async create(entity) {
        return this.keyResultService.create(entity);
    }
    async createBulkKeyResults(entity) {
        return this.keyResultService.createBulk(entity.list);
    }
    async getAll(findInput) {
        return this.keyResultService.findAll({
            where: { id: findInput },
            relations: ['updates', 'goal', 'lead', 'owner']
        });
    }
    async update(id, entity) {
        //We are using create here because create calls the method save()
        //We need save() to save ManyToMany relations
        try {
            return await this.keyResultService.create({
                id,
                ...entity
            });
        }
        catch (error) {
            console.log(error);
            return;
        }
    }
    async delete(id) {
        return this.keyResultService.delete(id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a key result' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Key Result Created',
        type: keyresult_entity_1.KeyResult
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Key Result not found'
    }),
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateKeyresultDTO]),
    __metadata("design:returntype", Promise)
], KeyResultController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Bulk key result' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Key Results Created',
        type: keyresult_entity_1.KeyResult
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Key Result not found'
    }),
    (0, common_1.Post)('/bulk'),
    __param(0, (0, common_1.Body)(pipes_1.BulkBodyLoadTransformPipe, new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.KeyresultBultInputDTO]),
    __metadata("design:returntype", Promise)
], KeyResultController.prototype, "createBulkKeyResults", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get key result by ID' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found Key Result',
        type: keyresult_entity_1.KeyResult
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Key Result not found'
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KeyResultController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing keyresult' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The keyresult has been successfully edited.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Key Result not found'
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
    __metadata("design:paramtypes", [String, dto_1.UpdateKeyresultDTO]),
    __metadata("design:returntype", Promise)
], KeyResultController.prototype, "update", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KeyResultController.prototype, "delete", null);
exports.KeyResultController = KeyResultController = __decorate([
    (0, swagger_1.ApiTags)('KeyResults'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [keyresult_service_1.KeyResultService])
], KeyResultController);
//# sourceMappingURL=keyresult.controller.js.map