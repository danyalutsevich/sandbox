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
exports.GitHubController = void 0;
const common_1 = require("@nestjs/common");
const contracts_1 = require("../../../plugins/contracts");
const guards_1 = require("../../shared/guards");
const decorators_1 = require("../../shared/decorators");
const pipes_1 = require("../../shared/pipes");
const github_service_1 = require("./github.service");
const dto_1 = require("./dto");
let GitHubController = exports.GitHubController = class GitHubController {
    _githubService;
    constructor(_githubService) {
        this._githubService = _githubService;
    }
    /**
     *
     * @param body
     * @returns
     */
    async addGithubAppInstallation(input) {
        try {
            // Validate the input data (You can use class-validator for validation)
            if (!input || !input.installation_id || !input.setup_action) {
                throw new common_1.HttpException('Invalid github input data', common_1.HttpStatus.BAD_REQUEST);
            }
            // Add the GitHub installation using the service
            return await this._githubService.addGithubAppInstallation(input);
        }
        catch (error) {
            // Handle errors and return an appropriate error response
            throw new common_1.HttpException(`Failed to add GitHub integration: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     *
     * @param body
     * @returns
     */
    async oAuthEndpointAuthorization(input) {
        try {
            // Validate the input data (You can use class-validator for validation)
            if (!input || !input.code) {
                throw new common_1.HttpException('Invalid input data', common_1.HttpStatus.BAD_REQUEST);
            }
            // Add the GitHub installation using the service
            return await this._githubService.oAuthEndpointAuthorization(input);
        }
        catch (error) {
            // Handle errors and return an appropriate error response
            throw new common_1.HttpException(`Failed to add GitHub integration: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Post)('/install'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.GithubAppInstallDTO]),
    __metadata("design:returntype", Promise)
], GitHubController.prototype, "addGithubAppInstallation", null);
__decorate([
    (0, common_1.Post)('/oauth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.GithubOAuthDTO]),
    __metadata("design:returntype", Promise)
], GitHubController.prototype, "oAuthEndpointAuthorization", null);
exports.GitHubController = GitHubController = __decorate([
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.INTEGRATION_VIEW),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [github_service_1.GithubService])
], GitHubController);
//# sourceMappingURL=github.controller.js.map