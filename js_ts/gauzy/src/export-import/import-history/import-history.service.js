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
exports.ImportHistoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crud_1 = require("./../../core/crud");
const import_history_entity_1 = require("./import-history.entity");
const type_orm_import_history_repository_1 = require("./repository/type-orm-import-history.repository");
const mikro_orm_import_history_repository_1 = require("./repository/mikro-orm-import-history.repository");
let ImportHistoryService = exports.ImportHistoryService = class ImportHistoryService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmImportHistoryRepository, mikroOrmImportHistoryRepository) {
        super(typeOrmImportHistoryRepository, mikroOrmImportHistoryRepository);
    }
    /**
     *
     * @returns
     */
    async findAll() {
        try {
            return await super.findAll({
                order: {
                    importDate: 'DESC'
                }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.ImportHistoryService = ImportHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(import_history_entity_1.ImportHistory)),
    __metadata("design:paramtypes", [type_orm_import_history_repository_1.TypeOrmImportHistoryRepository,
        mikro_orm_import_history_repository_1.MikroOrmImportHistoryRepository])
], ImportHistoryService);
//# sourceMappingURL=import-history.service.js.map