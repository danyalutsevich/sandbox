/**
 * Builds a SELECT statement for the "user_name" column based on the database type.
 *
 * @param dbType
 * @returns
 */
export declare function concateUserNameExpression(dbType: string): string;
/**
 * Generates a duration query string based on the provided database type, log query alias, and slot query alias.
 *
 * @param dbType The type of database (e.g., sqlite, postgres, mysql).
 * @param logQueryAlias The alias used for the log query.
 * @param slotQueryAlias The alias used for the slot query.
 * @returns A string representing the duration query.
 */
export declare const getDurationQueryString: (dbType: string, logQueryAlias: string, slotQueryAlias: string) => string;
/**
 * Generates a SQL query string for calculating the total duration of tasks across all time.
 * The query varies depending on the database type.
 *
 * @param dbType The type of the database (e.g., SQLite, PostgreSQL, MySQL).
 * @param queryAlias The alias used for the table in the SQL query.
 * @returns The SQL query string for calculating task total duration.
 */
export declare const getTotalDurationQueryString: (dbType: string, queryAlias: string) => string;
/**
 * Generates the SQL query string for filtering activity duration based on database type.
 *
 * @param dbType The type of the database (e.g., sqlite, postgres, mysql).
 * @param queryAlias The alias used for the query table in SQL.
 * @returns The SQL query string for filtering activity duration.
 */
export declare const getActivityDurationQueryString: (dbType: string, queryAlias: string) => string;
