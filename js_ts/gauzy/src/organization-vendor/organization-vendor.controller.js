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
exports.OrganizationVendorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("./../core/crud");
const organization_vendor_service_1 = require("./organization-vendor.service");
const organization_vendor_entity_1 = require("./organization-vendor.entity");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
let OrganizationVendorController = exports.OrganizationVendorController = class OrganizationVendorController extends crud_1.CrudController {
    organizationVendorService;
    constructor(organizationVendorService) {
        super(organizationVendorService);
        this.organizationVendorService = organizationVendorService;
    }
    /**
     * GET all organization vendors recurring expense
     *
     * @param data
     * @returns
     */
    async findAll(data) {
        const { relations, findInput, order } = data;
        return this.organizationVendorService.findAll({
            where: findInput,
            order,
            relations
        });
    }
    async pagination(filter) {
        return this.organizationVendorService.pagination(filter);
    }
    /**
     * UPDATE organization vendor by id
     *
     * @param id
     * @param body
     * @returns
     */
    async update(id, body) {
        return this.organizationVendorService.create({
            id,
            ...body
        });
    }
    /**
     * DELETE organization vendor by id
     *
     * @param id
     * @returns
     */
    async delete(id) {
        return this.organizationVendorService.deleteVendor(id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all organization vendors recurring expense.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found organization vendors recurring expense',
        type: organization_vendor_entity_1.OrganizationVendor
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
], OrganizationVendorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], OrganizationVendorController.prototype, "pagination", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, organization_vendor_entity_1.OrganizationVendor]),
    __metadata("design:returntype", Promise)
], OrganizationVendorController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'The record has been successfully deleted'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: "This Vendor can't be deleted because it is used in expense records"
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationVendorController.prototype, "delete", null);
exports.OrganizationVendorController = OrganizationVendorController = __decorate([
    (0, swagger_1.ApiTags)('OrganizationVendor'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [organization_vendor_service_1.OrganizationVendorService])
], OrganizationVendorController);
//# sourceMappingURL=organization-vendor.controller.js.map