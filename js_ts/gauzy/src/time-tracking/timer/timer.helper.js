"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRelationsToQuery = exports.buildLogQueryParameters = exports.addJoinToQueryParams = exports.buildCommonQueryParameters = void 0;
/**
 * Constructs common query parameters for time log operations.
 *
 * @param params - Parameters used to construct query conditions.
 * @returns An object containing query parameters for database operations.
 */
function buildCommonQueryParameters(params, includeJoin = false) {
    const { source, startedAt, stoppedAt, employeeId, tenantId, organizationId } = params;
    const queryParams = {
        where: {
            ...(source ? { source } : {}),
            startedAt,
            stoppedAt,
            employeeId,
            tenantId,
            organizationId,
            isActive: true,
            isArchived: false
        },
        order: {
            startedAt: 'DESC',
            createdAt: 'DESC', // Sorting by createdAt in descending order
        }
    };
    // Adds a join clause to the query parameters if includeJoin is true.
    addJoinToQueryParams(queryParams, includeJoin);
    return queryParams;
}
exports.buildCommonQueryParameters = buildCommonQueryParameters;
/**
 * Adds a join clause to the query parameters if includeJoin is true.
 *
 * @param queryParams - The existing query parameters object to be modified.
 * @param includeJoin - A flag indicating whether to include the join clause.
 */
function addJoinToQueryParams(queryParams, includeJoin) {
    if (includeJoin) {
        queryParams['join'] = {
            alias: 'time_log',
            innerJoin: {
                timeSlots: 'time_log.timeSlots',
            }
        };
    }
    return queryParams;
}
exports.addJoinToQueryParams = addJoinToQueryParams;
/**
 * Builds log-specific query parameters.
 *
 * @param params - Parameters used to build query conditions.
 * @returns Query parameters tailored for log retrieval.
 */
function buildLogQueryParameters(params) {
    const queryParams = buildCommonQueryParameters(params, true);
    queryParams.where.isRunning = false;
    return queryParams;
}
exports.buildLogQueryParameters = buildLogQueryParameters;
/**
 * Adds relations from the request to the query parameters.
 *
 * @param queryParams - The query parameters to modify.
 * @param request - The request object, potentially containing relations.
 */
function addRelationsToQuery(queryParams, request) {
    if (request.relations) {
        queryParams.relations = request.relations;
    }
}
exports.addRelationsToQuery = addRelationsToQuery;
//# sourceMappingURL=timer.helper.js.map