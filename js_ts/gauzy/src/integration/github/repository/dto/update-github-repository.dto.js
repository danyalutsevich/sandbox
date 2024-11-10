"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGithubRepositoryDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("core/dto");
const github_repository_entity_1 = require("../github-repository.entity");
/**
 * A Data Transfer Object (DTO) for updating an organization's GitHub repository.
 * This DTO is used to specify which properties of the repository should be updated.
 * It combines properties from different sources to define the structure for the update.
 */
class UpdateGithubRepositoryDTO extends (0, swagger_1.IntersectionType)(dto_1.TenantOrganizationBaseDTO, (0, swagger_1.PickType)(github_repository_entity_1.OrganizationGithubRepository, ['hasSyncEnabled'])) {
}
exports.UpdateGithubRepositoryDTO = UpdateGithubRepositoryDTO;
//# sourceMappingURL=update-github-repository.dto.js.map