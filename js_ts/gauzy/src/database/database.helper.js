"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareSQLQuery = void 0;
const index_1 = require("../../plugins/config/dist/index");
/**
 *
 * @Desc Used to replace double quotes " with backticks ` in case the selected DB type is MySQL
 */
const prepareSQLQuery = (queryStr) => {
    if ((0, index_1.isMySQL)()) {
        return queryStr.replace(/"/g, '`');
    }
    return queryStr;
};
exports.prepareSQLQuery = prepareSQLQuery;
//# sourceMappingURL=database.helper.js.map