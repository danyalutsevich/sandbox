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
exports.ImportHistoryCreateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const import_history_service_1 = require("./../../import-history.service");
const import_history_create_command_1 = require("../import-history-create.command");
let ImportHistoryCreateHandler = exports.ImportHistoryCreateHandler = class ImportHistoryCreateHandler {
    _importHistoryService;
    constructor(_importHistoryService) {
        this._importHistoryService = _importHistoryService;
    }
    async execute(event) {
        try {
            const { input } = event;
            return await this._importHistoryService.create(input);
        }
        catch (error) {
            console.log('Error while creating import history', error);
        }
    }
};
exports.ImportHistoryCreateHandler = ImportHistoryCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(import_history_create_command_1.ImportHistoryCreateCommand),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => import_history_service_1.ImportHistoryService))),
    __metadata("design:paramtypes", [import_history_service_1.ImportHistoryService])
], ImportHistoryCreateHandler);
//# sourceMappingURL=import-history-create.handler.js.map