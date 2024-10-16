"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportRecordModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const handlers_1 = require("./commands/handlers");
const import_record_entity_1 = require("./import-record.entity");
const import_record_service_1 = require("./import-record.service");
let ImportRecordModule = exports.ImportRecordModule = class ImportRecordModule {
};
exports.ImportRecordModule = ImportRecordModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => typeorm_1.TypeOrmModule.forFeature([import_record_entity_1.ImportRecord])),
            (0, common_1.forwardRef)(() => nestjs_1.MikroOrmModule.forFeature([import_record_entity_1.ImportRecord])),
            cqrs_1.CqrsModule
        ],
        providers: [import_record_service_1.ImportRecordService, ...handlers_1.CommandHandlers],
        exports: [import_record_service_1.ImportRecordService]
    })
], ImportRecordModule);
//# sourceMappingURL=import-record.module.js.map