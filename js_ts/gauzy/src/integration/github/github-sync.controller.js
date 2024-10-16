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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubSyncController = void 0;
const common_1 = require("@nestjs/common");
const contracts_1 = require("../../../plugins/contracts");
const guards_1 = require("../../shared/guards");
const decorators_1 = require("../../shared/decorators");
const pipes_1 = require("../../shared/pipes");
const github_sync_service_1 = require("./github-sync.service");
const dto_1 = require("./dto");
let GitHubSyncController = exports.GitHubSyncController = class GitHubSyncController {
    _githubSyncService;
    logger = new common_1.Logger('GitHubSyncController');
    constructor(_githubSyncService) {
        this._githubSyncService = _githubSyncService;
    }
    /**
     * Handle an HTTP POST request to manually synchronize GitHub issues and labels.
     *
     * @param body - The request body containing data for synchronization.
     * @returns An HTTP response with the result of the synchronization.
     */
    async syncGithubIssuesAndLabels(integrationId, request, input) {
        try {
            // Validate the input data (You can use class-validator for validation)
            if (!input || !input.organizationId) {
                throw new common_1.HttpException('Invalid sync issues & labels request parameters', common_1.HttpStatus.BAD_REQUEST);
            }
            // Call a service method to perform manual synchronization of GitHub issues and labels
            return await this._githubSyncService.manualSyncGithubIssues(integrationId, input, request);
        }
        catch (error) {
            // Handle errors and return an appropriate error response
            this.logger.error('Error while github sync issues and labels', error.message);
            throw new common_1.HttpException(`Error while github sync issues and labels: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Handle an HTTP POST request to automatically synchronize GitHub issues.
     *
     * @param body - The request body containing data for synchronization.
     * @returns An HTTP response with the result of the synchronization.
     */
    async autoSyncGithubIssues(integrationId, request, input) {
        try {
            // Validate the input data (You can use class-validator for validation)
            if (!input || !input.organizationId) {
                throw new common_1.HttpException('Invalid sync issues & labels request parameters', common_1.HttpStatus.BAD_REQUEST);
            }
            return await this._githubSyncService.autoSyncGithubIssues(integrationId, input, request);
        }
        catch (error) {
            // Handle errors and return an appropriate error response
            this.logger.error(`Error while github sync issues and labels`, error.message);
            throw new common_1.HttpException(`Error while github sync issues and labels: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Post)('/manual-sync/issues'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Param)('integrationId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, dto_1.ProcessGithubIssueSyncDTO]),
    __metadata("design:returntype", Promise)
], GitHubSyncController.prototype, "syncGithubIssuesAndLabels", null);
__decorate([
    (0, common_1.Post)('/auto-sync/issues'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Param)('integrationId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, dto_1.ProcessGithubIssueSyncDTO]),
    __metadata("design:returntype", Promise)
], GitHubSyncController.prototype, "autoSyncGithubIssues", null);
exports.GitHubSyncController = GitHubSyncController = __decorate([
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.INTEGRATION_VIEW),
    (0, common_1.Controller)(':integrationId'),
    __metadata("design:paramtypes", [github_sync_service_1.GithubSyncService])
], GitHubSyncController);
//# sourceMappingURL=github-sync.controller.js.map