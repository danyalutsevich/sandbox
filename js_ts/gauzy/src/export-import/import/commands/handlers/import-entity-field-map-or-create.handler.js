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
exports.ImportEntityFieldMapOrCreateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const cqrs_2 = require("@nestjs/cqrs");
const index_1 = require("../../../../../plugins/common/dist/index");
const core_1 = require("./../../../../core");
const import_record_1 = require("./../../../import-record");
const import_entity_field_map_or_create_command_1 = require("./../import-entity-field-map-or-create.command");
let ImportEntityFieldMapOrCreateHandler = exports.ImportEntityFieldMapOrCreateHandler = class ImportEntityFieldMapOrCreateHandler {
    _commandBus;
    constructor(_commandBus) {
        this._commandBus = _commandBus;
    }
    async execute(event) {
        const { repository, where, entity, sourceId } = event;
        try {
            if ((0, index_1.isNotEmpty)(where)) {
                return await repository.findOneOrFail({
                    where,
                    order: {
                        createdAt: 'DESC'
                    }
                });
            }
            throw new common_1.NotFoundException();
        }
        catch (error) {
            try {
                const { record, success } = await this._commandBus.execute(new import_record_1.ImportRecordFindOrFailCommand({
                    tenantId: core_1.RequestContext.currentTenantId(),
                    sourceId,
                    entityType: repository.metadata.tableName
                }));
                if (success && record) {
                    const { destinationId } = record;
                    return await repository.save({
                        id: destinationId,
                        ...entity
                    });
                }
                throw new common_1.NotFoundException(`The import record was not found`);
            }
            catch (error) {
                return await this._create(repository, entity);
            }
        }
    }
    async _create(repository, entity) {
        try {
            const obj = repository.create(entity);
            // https://github.com/Microsoft/TypeScript/issues/21592
            return await repository.save(obj);
        }
        catch (err) {
            throw new common_1.BadRequestException(err);
        }
    }
};
exports.ImportEntityFieldMapOrCreateHandler = ImportEntityFieldMapOrCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(import_entity_field_map_or_create_command_1.ImportEntityFieldMapOrCreateCommand),
    __metadata("design:paramtypes", [cqrs_2.CommandBus])
], ImportEntityFieldMapOrCreateHandler);
//# sourceMappingURL=import-entity-field-map-or-create.handler.js.map