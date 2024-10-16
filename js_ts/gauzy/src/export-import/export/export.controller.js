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
exports.ExportController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const contracts_1 = require("../../../plugins/contracts");
const parse_json_pipe_1 = require("../../shared/pipes/parse-json.pipe");
const guards_1 = require("../../shared/guards");
const decorators_1 = require("../../shared/decorators");
const export_service_1 = require("./export.service");
let ExportController = exports.ExportController = class ExportController {
    _exportService;
    constructor(_exportService) {
        this._exportService = _exportService;
    }
    async exportAll(data, res) {
        await this._exportService.createFolders();
        await this._exportService.exportTables();
        await this._exportService.archiveAndDownload();
        await this._exportService.downloadToUser(res);
        await this._exportService.deleteCsvFiles();
        await this._exportService.deleteArchive();
    }
    async downloadTemplate(res) {
        await this._exportService.createFolders();
        await this._exportService.exportSpecificTablesSchema();
        await this._exportService.archiveAndDownload();
        await this._exportService.downloadToUser(res);
        await this._exportService.deleteCsvFiles();
        await this._exportService.deleteArchive();
    }
    async exportByName(data, res) {
        const { entities: { names } } = data;
        await this._exportService.createFolders();
        await this._exportService.exportSpecificTables(names);
        await this._exportService.archiveAndDownload();
        await this._exportService.downloadToUser(res);
        await this._exportService.deleteCsvFiles();
        await this._exportService.deleteArchive();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all exports.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found tables'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('data', parse_json_pipe_1.ParseJsonPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExportController.prototype, "exportAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Exports all tables schemas.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found tables schemas'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)('template'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExportController.prototype, "downloadTemplate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find exports by name' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found specific tables'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)('filter'),
    __param(0, (0, common_1.Query)('data', parse_json_pipe_1.ParseJsonPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExportController.prototype, "exportByName", null);
exports.ExportController = ExportController = __decorate([
    (0, swagger_1.ApiTags)('Download'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.ALL_ORG_VIEW, contracts_1.PermissionsEnum.EXPORT_ADD),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [export_service_1.ExportService])
], ExportController);
//# sourceMappingURL=export.controller.js.map