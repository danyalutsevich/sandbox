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
exports.OrganizationPositionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("./../core/crud");
const organization_position_service_1 = require("./organization-position.service");
const organization_position_entity_1 = require("./organization-position.entity");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
const dto_1 = require("./dto");
let OrganizationPositionController = exports.OrganizationPositionController = class OrganizationPositionController extends crud_1.CrudController {
    organizationPositionService;
    constructor(organizationPositionService) {
        super(organizationPositionService);
        this.organizationPositionService = organizationPositionService;
    }
    /**
     * GET organization positions recurring expense
     *
     * @param data
     * @returns
     */
    async findAll(data) {
        const { relations = [], findInput } = data;
        return this.organizationPositionService.findAll({
            where: findInput,
            relations
        });
    }
    /**
     * UPDATE organization position by id
     *
     * @param id
     * @param body
     * @returns
     */
    async update(id, body) {
        try {
            return this.organizationPositionService.create({
                id,
                ...body
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all organization positions recurring expense.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found positions recurring expense',
        type: organization_position_entity_1.OrganizationPosition
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
], OrganizationPositionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateOrganizationPositionDTO]),
    __metadata("design:returntype", Promise)
], OrganizationPositionController.prototype, "update", null);
exports.OrganizationPositionController = OrganizationPositionController = __decorate([
    (0, swagger_1.ApiTags)('OrganizationPositions'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [organization_position_service_1.OrganizationPositionService])
], OrganizationPositionController);
//# sourceMappingURL=organization-position.controller.js.map