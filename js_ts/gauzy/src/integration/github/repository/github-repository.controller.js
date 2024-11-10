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
exports.GitHubRepositoryController = void 0;
const common_1 = require("@nestjs/common");
const pipes_1 = require("../../../shared/pipes");
const github_repository_service_1 = require("./github-repository.service");
const dto_1 = require("./dto");
let GitHubRepositoryController = exports.GitHubRepositoryController = class GitHubRepositoryController {
    _githubRepositoryService;
    constructor(_githubRepositoryService) {
        this._githubRepositoryService = _githubRepositoryService;
    }
    /**
     * Sync a GitHub repository with Gauzy using provided data.
     *
     * @param entity The data needed for synchronization.
     * @returns The synchronized integration map.
     */
    async syncRepository(entity) {
        try {
            return await this._githubRepositoryService.syncGithubRepository(entity);
        }
        catch (error) {
            // Handle errors, e.g., return an error response.
            throw new Error('Failed to sync GitHub repository');
        }
    }
    /**
     * Handle an HTTP PUT request to update a GitHub repository by its unique identifier.
     * @param id - A string representing the unique identifier of the GitHub repository.
     * @param input - An object representing the data to update the GitHub repository with.
     * @returns A Promise that resolves to the updated GitHub repository data.
     */
    async update(id, input) {
        try {
            // Ensure that a GitHub repository with the provided identifier exists.
            await this._githubRepositoryService.findOneByIdString(id);
            // Attempt to update the GitHub repository using the provided data.
            return await this._githubRepositoryService.create({
                ...input,
                id
            });
        }
        catch (error) {
            // Handle errors, e.g., return an error response.
            throw new Error('Failed to update GitHub repository fields');
        }
    }
};
__decorate([
    (0, common_1.Post)('/sync'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GitHubRepositoryController.prototype, "syncRepository", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateGithubRepositoryDTO]),
    __metadata("design:returntype", Promise)
], GitHubRepositoryController.prototype, "update", null);
exports.GitHubRepositoryController = GitHubRepositoryController = __decorate([
    (0, common_1.Controller)('repository'),
    __metadata("design:paramtypes", [github_repository_service_1.GithubRepositoryService])
], GitHubRepositoryController);
//# sourceMappingURL=github-repository.controller.js.map