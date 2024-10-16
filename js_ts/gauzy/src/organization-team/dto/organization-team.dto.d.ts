import { IOrganizationProject, IOrganizationTeam } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from './../../core/dto';
import { RelationalTagDTO } from './../../tags/dto';
import { OrganizationTeam } from './../organization-team.entity';
declare const OrganizationTeamDTO_base: import("@nestjs/common").Type<TenantOrganizationBaseDTO & Partial<RelationalTagDTO> & Pick<OrganizationTeam, "logo" | "imageId" | "prefix" | "shareProfileView" | "requirePlanToTrack">>;
export declare class OrganizationTeamDTO extends OrganizationTeamDTO_base implements Omit<IOrganizationTeam, 'name'> {
    /**
     * Team type should be boolean true/false
     */
    readonly public?: boolean;
    readonly color?: string;
    readonly emoji?: string;
    readonly teamSize?: string;
    readonly memberIds?: string[];
    readonly managerIds?: string[];
    readonly projects?: IOrganizationProject[];
}
export {};
