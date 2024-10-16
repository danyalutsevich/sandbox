import { IOrganizationGithubRepositoryUpdateInput } from "../../../../../plugins/contracts";
declare const UpdateGithubRepositoryDTO_base: import("@nestjs/common").Type<any>;
/**
 * A Data Transfer Object (DTO) for updating an organization's GitHub repository.
 * This DTO is used to specify which properties of the repository should be updated.
 * It combines properties from different sources to define the structure for the update.
 */
export declare class UpdateGithubRepositoryDTO extends UpdateGithubRepositoryDTO_base implements IOrganizationGithubRepositoryUpdateInput {
}
export {};
