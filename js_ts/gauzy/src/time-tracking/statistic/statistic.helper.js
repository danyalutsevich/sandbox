"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivityDurationQueryString = exports.getTotalDurationQueryString = exports.getDurationQueryString = exports.concateUserNameExpression = void 0;
const index_1 = require("../../../plugins/config/dist/index");
const database_helper_1 = require("./../../database/database.helper");
/**
 * Builds a SELECT statement for the "user_name" column based on the database type.
 *
 * @param dbType
 * @returns
 */
function concateUserNameExpression(dbType) {
    let expression;
    switch (dbType) {
        case index_1.DatabaseTypeEnum.sqlite:
        case index_1.DatabaseTypeEnum.betterSqlite3:
            expression = `("user"."firstName" || ' ' ||  "user"."lastName")`;
            break;
        case index_1.DatabaseTypeEnum.mysql:
        case index_1.DatabaseTypeEnum.postgres:
            expression = `CONCAT("user"."firstName", ' ', "user"."lastName")`;
            break;
        default:
            throw new Error(`Cannot create statistic query due to unsupported database type: ${dbType}`);
    }
    return expression;
}
exports.concateUserNameExpression = concateUserNameExpression;
/**
 * Generates a duration query string based on the provided database type, log query alias, and slot query alias.
 *
 * @param dbType The type of database (e.g., sqlite, postgres, mysql).
 * @param logQueryAlias The alias used for the log query.
 * @param slotQueryAlias The alias used for the slot query.
 * @returns A string representing the duration query.
 */
const getDurationQueryString = (dbType, logQueryAlias, slotQueryAlias) => {
    switch (dbType) {
        case index_1.DatabaseTypeEnum.sqlite:
        case index_1.DatabaseTypeEnum.betterSqlite3:
            return `COALESCE(ROUND(SUM((julianday(COALESCE("${logQueryAlias}"."stoppedAt", datetime('now'))) - julianday("${logQueryAlias}"."startedAt")) * 86400) / COUNT("${slotQueryAlias}"."id")), 0)`;
        case index_1.DatabaseTypeEnum.postgres:
            return `COALESCE(ROUND(SUM(extract(epoch from (COALESCE("${logQueryAlias}"."stoppedAt", NOW()) - "${logQueryAlias}"."startedAt"))) / COUNT("${slotQueryAlias}"."id")), 0)`;
        case index_1.DatabaseTypeEnum.mysql:
            // Directly return the SQL string for MySQL, as MikroORM allows raw SQL.
            return (0, database_helper_1.prepareSQLQuery)(`COALESCE(ROUND(SUM(TIMESTAMPDIFF(SECOND, "${logQueryAlias}"."startedAt", COALESCE("${logQueryAlias}"."stoppedAt", NOW()))) / COUNT("${slotQueryAlias}"."id")), 0)`);
        default:
            throw new Error(`Unsupported database type: ${dbType}`);
    }
};
exports.getDurationQueryString = getDurationQueryString;
/**
 * Generates a SQL query string for calculating the total duration of tasks across all time.
 * The query varies depending on the database type.
 *
 * @param dbType The type of the database (e.g., SQLite, PostgreSQL, MySQL).
 * @param queryAlias The alias used for the table in the SQL query.
 * @returns The SQL query string for calculating task total duration.
 */
const getTotalDurationQueryString = (dbType, queryAlias) => {
    switch (dbType) {
        case index_1.DatabaseTypeEnum.sqlite:
        case index_1.DatabaseTypeEnum.betterSqlite3:
            return `COALESCE(ROUND(SUM((julianday(COALESCE("${queryAlias}"."stoppedAt", datetime('now'))) - julianday("${queryAlias}"."startedAt")) * 86400)), 0)`;
        case index_1.DatabaseTypeEnum.postgres:
            return `COALESCE(ROUND(SUM(extract(epoch from (COALESCE("${queryAlias}"."stoppedAt", NOW()) - "${queryAlias}"."startedAt")))), 0)`;
        case index_1.DatabaseTypeEnum.mysql:
            return `COALESCE(ROUND(SUM(TIMESTAMPDIFF(SECOND, "${queryAlias}"."startedAt", COALESCE("${queryAlias}"."stoppedAt", NOW())))), 0)`;
        default:
            throw Error(`Unsupported database type: ${dbType}`);
    }
};
exports.getTotalDurationQueryString = getTotalDurationQueryString;
/**
 * Generates the SQL query string for filtering activity duration based on database type.
 *
 * @param dbType The type of the database (e.g., sqlite, postgres, mysql).
 * @param queryAlias The alias used for the query table in SQL.
 * @returns The SQL query string for filtering activity duration.
 */
const getActivityDurationQueryString = (dbType, queryAlias) => {
    switch (dbType) {
        case index_1.DatabaseTypeEnum.sqlite:
        case index_1.DatabaseTypeEnum.betterSqlite3:
            return `datetime("${queryAlias}"."date" || ' ' || "${queryAlias}"."time") Between :start AND :end`;
        case index_1.DatabaseTypeEnum.postgres:
            return `CONCAT("${queryAlias}"."date", ' ', "${queryAlias}"."time")::timestamp Between :start AND :end`;
        case index_1.DatabaseTypeEnum.mysql:
            return (0, database_helper_1.prepareSQLQuery)(`CONCAT("${queryAlias}"."date", ' ', "${queryAlias}"."time") BETWEEN :start AND :end`);
        default:
            throw Error(`cannot create statistic query due to unsupported database type: ${dbType}`);
    }
};
exports.getActivityDurationQueryString = getActivityDurationQueryString;
//# sourceMappingURL=statistic.helper.js.map