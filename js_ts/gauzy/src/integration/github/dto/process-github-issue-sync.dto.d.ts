import { IGithubIssue, IGithubSyncIssuePayload, IOrganizationGithubRepository, IOrganizationProject } from '../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseDTO } from "core/dto";
/**
 * Data Transfer Object for processing GitHub issue synchronization.
 *
 * This DTO provides optional properties to handle GitHub issues and repositories during synchronization.
 */
export declare class ProcessGithubIssueSyncDTO extends TenantOrganizationBaseDTO implements IGithubSyncIssuePayload {
    /** Optional array of GitHub issues to synchronize. */
    readonly issues: IGithubIssue[];
    /** Optional GitHub repository for synchronization. */
    readonly repository: IOrganizationGithubRepository;
    readonly projectId: IOrganizationProject['id'];
}
