/**
 * Converts TypeORM-style where conditions and parameters to Mikro-ORM-style.
 * @param whereCondition The TypeORM-style where condition string.
 * @param parameters The TypeORM-style parameters object.
 * @returns An array where the first element is the converted where condition string
 * and the second element is the array of parameters for Mikro-ORM.
 */
export declare function convertTypeOrmConationAndParamsToMikroOrm(whereCondition: string, parameters: Record<string, any>): [string, any[]];
export declare function getConationFromQuery(query: any): any;
