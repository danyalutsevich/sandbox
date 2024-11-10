"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mikroOrmCustomEntityFieldRegistrations = exports.typeOrmCustomEntityFieldRegistrations = void 0;
const employee_1 = require("./employee");
const tag_1 = require("./tag");
/**
 * Registrations for TypeORM custom entity fields.
 *
 * This array contains configurations for custom fields in TypeORM entities.
 * Each entry specifies the name of the entity and the associated custom fields.
 */
exports.typeOrmCustomEntityFieldRegistrations = [
    { entityName: 'Employee', customFields: employee_1.TypeOrmEmployeeEntityCustomFields },
    { entityName: 'Tag', customFields: tag_1.TypeOrmTagEntityCustomFields },
];
/**
 * Registrations for MikroORM custom entity fields.
 *
 * This array contains the configurations for custom fields in MikroORM entities.
 * Each entry specifies the entity name and the corresponding custom fields.
 */
exports.mikroOrmCustomEntityFieldRegistrations = [
    { entityName: 'Employee', customFields: employee_1.MikroOrmEmployeeEntityCustomFields },
    { entityName: 'Tag', customFields: tag_1.MikroOrmTagEntityCustomFields },
];
//# sourceMappingURL=custom-entity-fields.js.map