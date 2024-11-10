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
exports.ImportHistoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const contracts_1 = require("../../../plugins/contracts");
const guards_1 = require("./../../shared/guards");
const decorators_1 = require("./../../shared/decorators");
const import_history_service_1 = require("./import-history.service");
let ImportHistoryController = exports.ImportHistoryController = class ImportHistoryController {
    _importHistoryService;
    constructor(_importHistoryService) {
        this._importHistoryService = _importHistoryService;
    }
    /**
     *
     * @returns
     */
    async findAll() {
        return await this._importHistoryService.findAll();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all imports history.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found import history'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImportHistoryController.prototype, "findAll", null);
exports.ImportHistoryController = ImportHistoryController = __decorate([
    (0, swagger_1.ApiTags)('Import History'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.ALL_ORG_VIEW, contracts_1.PermissionsEnum.IMPORT_ADD),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [import_history_service_1.ImportHistoryService])
], ImportHistoryController);
//# sourceMappingURL=import-history.controller.js.map