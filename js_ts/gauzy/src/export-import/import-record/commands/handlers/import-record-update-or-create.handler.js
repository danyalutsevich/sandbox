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
exports.ImportRecordUpdateOrCreateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
;
const import_record_update_or_create_command_1 = require("../import-record-update-or-create.command");
const import_record_service_1 = require("../../import-record.service");
const context_1 = require("../../../../core/context");
let ImportRecordUpdateOrCreateHandler = exports.ImportRecordUpdateOrCreateHandler = class ImportRecordUpdateOrCreateHandler {
    _importRecordService;
    constructor(_importRecordService) {
        this._importRecordService = _importRecordService;
    }
    async execute(event) {
        const { options, input = {} } = event;
        const payload = Object.assign({}, options, input);
        const { sourceId, destinationId, entityType, tenantId = context_1.RequestContext.currentTenantId() } = payload;
        try {
            const record = await this._importRecordService.findOneByWhereOptions(options);
            if (record) {
                return {
                    ...await this._importRecordService.create({
                        id: record.id,
                        tenantId,
                        sourceId,
                        destinationId,
                        entityType
                    }),
                    wasCreated: false
                };
            }
        }
        catch (error) {
            return {
                ...await this._importRecordService.create({
                    tenantId,
                    sourceId,
                    destinationId,
                    entityType
                }),
                wasCreated: true
            };
        }
    }
};
exports.ImportRecordUpdateOrCreateHandler = ImportRecordUpdateOrCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(import_record_update_or_create_command_1.ImportRecordUpdateOrCreateCommand),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => import_record_service_1.ImportRecordService))),
    __metadata("design:paramtypes", [import_record_service_1.ImportRecordService])
], ImportRecordUpdateOrCreateHandler);
//# sourceMappingURL=import-record-update-or-create.handler.js.map