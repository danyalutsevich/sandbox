import { IGithubIssueFindInput } from '../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseDTO } from '../../../core/dto';
export declare class GithubIssuesQueryDTO extends TenantOrganizationBaseDTO implements IGithubIssueFindInput {
    /**
     * Limit (paginated) - max number of entities should be taken.
     */
    readonly per_page: number;
    /**
     * Offset (paginated) where from entities should be taken.
     */
    readonly page: number;
}
