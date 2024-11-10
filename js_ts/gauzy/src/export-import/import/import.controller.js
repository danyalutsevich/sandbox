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
exports.ImportController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const contracts_1 = require("../../../plugins/contracts");
const import_service_1 = require("./import.service");
const context_1 = require("../../core/context");
const file_storage_1 = require("../../core/file-storage");
const guards_1 = require("../../shared/guards");
const decorators_1 = require("../../shared/decorators");
const import_history_1 = require("../import-history");
let ImportController = exports.ImportController = class ImportController {
    _importService;
    _commandBus;
    constructor(_importService, _commandBus) {
        this._importService = _importService;
        this._commandBus = _commandBus;
    }
    // TODO: I commented this code for now as it seems running on the server start or maybe even on each request.
    // We need to investigate this and fix it.
    /**
     *
     * @param param0
     * @param file
     * @returns
     */
    /*
    @UseInterceptors(
        FileInterceptor('file', {
            storage: new FileStorage().storage({
                dest: path.join('import'),
                prefix: 'import'
            })
        })
    )
    */
    async parse({ importType }, file) {
        const { key, originalname, size } = file;
        const history = {
            file: originalname,
            path: key,
            size: size,
            tenantId: context_1.RequestContext.currentTenantId()
        };
        try {
            /** */
            await this._importService.unzipAndParse(key, importType === contracts_1.ImportTypeEnum.CLEAN);
            this._importService.removeExtractedFiles();
            /** */
            return await this._commandBus.execute(new import_history_1.ImportHistoryCreateCommand({
                ...history,
                status: contracts_1.ImportStatusEnum.SUCCESS
            }));
        }
        catch (error) {
            /** */
            console.log('Error while creating import history', error);
            return await this._commandBus.execute(new import_history_1.ImportHistoryCreateCommand({
                ...history,
                status: contracts_1.ImportStatusEnum.FAILED
            }));
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Imports templates records.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found tables'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, file_storage_1.UploadedFileStorage)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ImportController.prototype, "parse", null);
exports.ImportController = ImportController = __decorate([
    (0, swagger_1.ApiTags)('Import'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.ALL_ORG_EDIT, contracts_1.PermissionsEnum.IMPORT_ADD),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [import_service_1.ImportService, cqrs_1.CommandBus])
], ImportController);
//# sourceMappingURL=import.controller.js.map