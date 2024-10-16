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
exports.KeyresultTemplateController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("./../core/crud");
const keyresult_template_entity_1 = require("./keyresult-template.entity");
const keyresult_template_service_1 = require("./keyresult-template.service");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
const dto_1 = require("./dto");
let KeyresultTemplateController = exports.KeyresultTemplateController = class KeyresultTemplateController extends crud_1.CrudController {
    keyResultTemplateService;
    constructor(keyResultTemplateService) {
        super(keyResultTemplateService);
        this.keyResultTemplateService = keyResultTemplateService;
    }
    /**
     * GET key result templates
     *
     * @param data
     * @returns
     */
    async findAll(data) {
        const { relations, findInput } = data;
        return this.keyResultTemplateService.findAll({
            where: findInput,
            relations
        });
    }
    /**
     * CREATE key result template
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return this.keyResultTemplateService.create(entity);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find key result templates.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found key result templates',
        type: keyresult_template_entity_1.KeyResultTemplate
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KeyresultTemplateController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create KeyResult Template' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'KeyResult Template Created successfully',
        type: keyresult_template_entity_1.KeyResultTemplate
    }),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateKeyresultTemplateDTO]),
    __metadata("design:returntype", Promise)
], KeyresultTemplateController.prototype, "create", null);
exports.KeyresultTemplateController = KeyresultTemplateController = __decorate([
    (0, swagger_1.ApiTags)('keyResultTemplate'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [keyresult_template_service_1.KeyresultTemplateService])
], KeyresultTemplateController);
//# sourceMappingURL=keyresult-template.controller.js.map