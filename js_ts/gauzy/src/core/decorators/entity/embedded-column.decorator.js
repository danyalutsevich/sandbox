"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTypeOrmEmbeddableColumnOptions = exports.parseMikroOrmEmbeddableColumnOptions = exports.EmbeddedColumn = void 0;
const typeorm_1 = require("typeorm");
const core_1 = require("@mikro-orm/core");
const entity_helper_1 = require("./entity.helper");
/**
 * A decorator factory for mapping an embeddable column in Mikro ORM.
 * @param typeFunctionOrTarget The type, function, or target entity for the MikroORM & TypeORM Embedded column.
 * @param options Additional options for the MikroORM & TypeORM column.
 * @returns A property decorator.
 */
function EmbeddedColumn(typeOrTarget, options) {
    // If options are not provided, initialize an empty object
    if (!options)
        options = { prefix: false };
    // Return a property decorator function
    return (target, propertyKey) => {
        // Apply the @Embedded decorator with mapped Mikro ORM options
        const mikroOrmOptions = (0, exports.parseMikroOrmEmbeddableColumnOptions)(typeOrTarget, options);
        (0, core_1.Embedded)(mikroOrmOptions)(target, propertyKey);
        // Apply the @Column decorator with mapped Type ORM options
        const typeOrmOptions = (0, exports.parseTypeOrmEmbeddableColumnOptions)(options);
        (0, typeorm_1.Column)(typeOrTarget.typeOrmEmbeddableEntity, typeOrmOptions)(target, propertyKey);
    };
}
exports.EmbeddedColumn = EmbeddedColumn;
/**
 * Parses and processes MikroORM embeddable column options.
 *
 * @param param0 Contains the `mikroOrmEmbeddableEntity` property.
 * @param restOptions Additional MikroOrmEmbeddedOptions to be filtered and processed.
 * @returns A new object with only key-value pairs where the value is defined.
 */
const parseMikroOrmEmbeddableColumnOptions = ({ mikroOrmEmbeddableEntity }, restOptions) => {
    // Create a new object with entity and other options, filtering out undefined values
    const filteredOptions = (0, entity_helper_1.filterOptions)({
        entity: mikroOrmEmbeddableEntity,
        ...restOptions
    });
    // Return the new object with only defined properties
    return filteredOptions;
};
exports.parseMikroOrmEmbeddableColumnOptions = parseMikroOrmEmbeddableColumnOptions;
/**
 * Parses and processes TypeORM embeddable column options.
 *
 * @param restOptions The TypeORM embedded column options to be filtered and processed.
 * @returns A new object with only key-value pairs where the value is defined.
 */
const parseTypeOrmEmbeddableColumnOptions = (restOptions) => {
    // Filter out undefined options from the given object
    const filteredOptions = (0, entity_helper_1.filterOptions)({
        ...restOptions
    });
    // Return the filtered object with only defined properties
    return filteredOptions;
};
exports.parseTypeOrmEmbeddableColumnOptions = parseTypeOrmEmbeddableColumnOptions;
//# sourceMappingURL=embedded-column.decorator.js.map