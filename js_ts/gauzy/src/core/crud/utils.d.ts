import { FindManyOptions } from "typeorm";
/**
 * Parses TypeORM `FindManyOptions` to include `loadEagerRelations: false` and converts the 'where' option.
 *
 * @param options The options to parse.
 * @returns The parsed options with default values.
 */
export declare function parseTypeORMFindCountOptions<T>(options: FindManyOptions): FindManyOptions<T>;
