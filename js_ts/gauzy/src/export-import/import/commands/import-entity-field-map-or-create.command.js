"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportEntityFieldMapOrCreateCommand = void 0;
class ImportEntityFieldMapOrCreateCommand {
    repository;
    where;
    entity;
    sourceId;
    static type = '[Import Entity] Map Or Create';
    constructor(repository, where, entity, sourceId) {
        this.repository = repository;
        this.where = where;
        this.entity = entity;
        this.sourceId = sourceId;
    }
}
exports.ImportEntityFieldMapOrCreateCommand = ImportEntityFieldMapOrCreateCommand;
//# sourceMappingURL=import-entity-field-map-or-create.command.js.map