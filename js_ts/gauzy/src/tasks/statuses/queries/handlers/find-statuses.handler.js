"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindStatusesHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
;
const status_service_1 = require("../../status.service");
const find_statuses_query_1 = require("../find-statuses.query");
let FindStatusesHandler = exports.FindStatusesHandler = class FindStatusesHandler {
    taskStatusService;
    constructor(taskStatusService) {
        this.taskStatusService = taskStatusService;
    }
    /**
     * Executes a query to find task statuses with pagination options.
     * @param query - The FindStatusesQuery containing search criteria and pagination options.
     * @returns A promise of paginated results with task statuses.
     */
    async execute(query) {
        try {
            const { options } = query;
            // Fetch all task statuses based on the query options
            return await this.taskStatusService.fetchAll(options);
        }
        catch (error) {
            // Handle errors and return appropriate error response
            throw new common_1.BadRequestException('An error occurred while fetching task statuses. Please check your query parameters.');
        }
    }
};
exports.FindStatusesHandler = FindStatusesHandler = __decorate([
    (0, cqrs_1.QueryHandler)(find_statuses_query_1.FindStatusesQuery),
    __metadata("design:paramtypes", [status_service_1.TaskStatusService])
], FindStatusesHandler);
//# sourceMappingURL=find-statuses.handler.js.map