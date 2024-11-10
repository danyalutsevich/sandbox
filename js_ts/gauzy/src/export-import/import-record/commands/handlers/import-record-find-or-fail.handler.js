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
exports.ImportRecordFindOrFailHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const import_record_service_1 = require("./../../import-record.service");
const import_record_find_or_fail_command_1 = require("./../import-record-find-or-fail.command");
let ImportRecordFindOrFailHandler = exports.ImportRecordFindOrFailHandler = class ImportRecordFindOrFailHandler {
    _importRecordService;
    constructor(_importRecordService) {
        this._importRecordService = _importRecordService;
    }
    async execute(event) {
        try {
            const { input } = event;
            return await this._importRecordService.findOneOrFailByWhereOptions(input);
        }
        catch (error) {
            throw new common_1.NotFoundException(`The import record was not found`);
        }
    }
};
exports.ImportRecordFindOrFailHandler = ImportRecordFindOrFailHandler = __decorate([
    (0, cqrs_1.CommandHandler)(import_record_find_or_fail_command_1.ImportRecordFindOrFailCommand),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => import_record_service_1.ImportRecordService))),
    __metadata("design:paramtypes", [import_record_service_1.ImportRecordService])
], ImportRecordFindOrFailHandler);
//# sourceMappingURL=import-record-find-or-fail.handler.js.map