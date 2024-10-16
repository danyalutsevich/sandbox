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
exports.GithubRepositoryService = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const crud_1 = require("core/crud");
const commands_1 = require("../commands");
const mikro_orm_organization_github_repository_repository_1 = require("./repository/mikro-orm-organization-github-repository.repository");
const type_orm_organization_github_repository_repository_1 = require("./repository/type-orm-organization-github-repository.repository");
let GithubRepositoryService = exports.GithubRepositoryService = class GithubRepositoryService extends crud_1.TenantAwareCrudService {
    _commandBus;
    logger = new common_1.Logger('GithubRepositoryService');
    constructor(typeOrmOrganizationGithubRepositoryRepository, mikroOrmOrganizationGithubRepositoryRepository, _commandBus) {
        super(typeOrmOrganizationGithubRepositoryRepository, mikroOrmOrganizationGithubRepositoryRepository);
        this._commandBus = _commandBus;
    }
    /**
     * Synchronize a GitHub repository with an integration.
     *
     * @param input - The input data for synchronization.
     * @returns An object indicating success or failure of the synchronization.
     */
    async syncGithubRepository(input) {
        try {
            return await this._commandBus.execute(new commands_1.IntegrationSyncGithubRepositoryCommand(input));
        }
        catch (error) {
            // Handle errors and return an appropriate error response
            this.logger.error('Error while sync github integration repository', error.message);
            throw new common_1.HttpException(`Failed to sync GitHub repository: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.GithubRepositoryService = GithubRepositoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [type_orm_organization_github_repository_repository_1.TypeOrmOrganizationGithubRepositoryRepository,
        mikro_orm_organization_github_repository_repository_1.MikroOrmOrganizationGithubRepositoryRepository,
        cqrs_1.CommandBus])
], GithubRepositoryService);
//# sourceMappingURL=github-repository.service.js.map