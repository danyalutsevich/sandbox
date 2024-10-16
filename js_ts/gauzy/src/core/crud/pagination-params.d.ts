import { FindOptionsOrder, FindOptionsRelations, FindOptionsSelect, FindOptionsWhere } from 'typeorm';
import { TenantOrganizationBaseDTO } from './../../core/dto';
import { SimpleObjectLiteral } from './pagination.helper';
/**
 * Specifies what columns should be retrieved.
 */
export declare class OptionsSelect<T = any> {
    readonly select?: FindOptionsSelect<T>;
}
/**
 * Indicates what relations of entity should be loaded (simplified left join form).
*/
export declare class OptionsRelations<T = any> extends OptionsSelect<T> {
    readonly relations?: FindOptionsRelations<T>;
}
export declare class OptionParams<T> extends OptionsRelations<T> {
    /**
     * Order, in which entities should be ordered.
     */
    readonly order: FindOptionsOrder<T>;
    /**
     * Simple condition that should be applied to match entities.
     */
    readonly where: FindOptionsWhere<T>;
    /**
    * Indicates if soft-deleted rows should be included in entity result.
    */
    readonly withDeleted: boolean;
}
/**
 * Describes generic pagination params
 */
export declare class PaginationParams<T = any> extends OptionParams<T> {
    /**
     * Limit (paginated) - max number of entities should be taken.
     */
    readonly take: number;
    /**
     * Offset (paginated) where from entities should be taken.
     */
    readonly skip: number;
}
/**
 * Function to escape query parameters and convert to DTO class.
 * @param nativeParameters - The original query parameters.
 * @returns {TenantOrganizationBaseDTO} - The escaped and converted query parameters as a DTO instance.
 */
export declare function escapeQueryWithParameters(nativeParameters: SimpleObjectLiteral): TenantOrganizationBaseDTO;
