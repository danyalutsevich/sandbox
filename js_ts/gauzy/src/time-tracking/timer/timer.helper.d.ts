import { FindOperator } from "typeorm";
import { ITimerStatusInput, TimeLogSourceEnum } from '../../../plugins/contracts';
interface TimeLogParams extends ITimerStatusInput {
    startedAt: FindOperator<Date>;
    stoppedAt: FindOperator<any>;
}
interface TimeLogQueryParams extends ITimerStatusInput {
    where: {
        startedAt: FindOperator<Date>;
        stoppedAt: FindOperator<any>;
        employeeId: string;
        tenantId: string;
        organizationId: string;
        isActive: boolean;
        isArchived: boolean;
        isRunning?: boolean;
        source?: TimeLogSourceEnum;
    };
    order: {
        startedAt: 'ASC' | 'DESC';
        createdAt: 'ASC' | 'DESC';
    };
}
/**
 * Constructs common query parameters for time log operations.
 *
 * @param params - Parameters used to construct query conditions.
 * @returns An object containing query parameters for database operations.
 */
export declare function buildCommonQueryParameters(params: TimeLogParams, includeJoin?: boolean): TimeLogQueryParams;
/**
 * Adds a join clause to the query parameters if includeJoin is true.
 *
 * @param queryParams - The existing query parameters object to be modified.
 * @param includeJoin - A flag indicating whether to include the join clause.
 */
export declare function addJoinToQueryParams(queryParams: TimeLogQueryParams, includeJoin: boolean): TimeLogQueryParams;
/**
 * Builds log-specific query parameters.
 *
 * @param params - Parameters used to build query conditions.
 * @returns Query parameters tailored for log retrieval.
 */
export declare function buildLogQueryParameters(params: TimeLogParams): TimeLogQueryParams;
/**
 * Adds relations from the request to the query parameters.
 *
 * @param queryParams - The query parameters to modify.
 * @param request - The request object, potentially containing relations.
 */
export declare function addRelationsToQuery(queryParams: TimeLogQueryParams, request: ITimerStatusInput): void;
export {};
