import { DeleteResult, UpdateResult } from 'typeorm';
import { IOrganizationTeamEmployee } from '../../plugins/contracts/dist/index';
import { OrganizationTeamEmployeeService } from './organization-team-employee.service';
import { DeleteTeamMemberQueryDTO, UpdateOrganizationTeamActiveTaskDTO, UpdateTeamMemberDTO } from './dto';
import { OrganizationTeamEmployee } from './organization-team-employee.entity';
export declare class OrganizationTeamEmployeeController {
    private readonly organizationTeamEmployeeService;
    constructor(organizationTeamEmployeeService: OrganizationTeamEmployeeService);
    /**
     * Update team member by memberId
     *
     * @param memberId
     * @param options
     * @returns
     */
    update(memberId: IOrganizationTeamEmployee['id'], entity: UpdateTeamMemberDTO): Promise<UpdateResult | IOrganizationTeamEmployee>;
    /**
     * Update organization team member active task entity
     *
     * @param id
     * @param entity
     * @returns
     */
    updateActiveTask(memberId: IOrganizationTeamEmployee['id'], entity: UpdateOrganizationTeamActiveTaskDTO): Promise<UpdateResult | IOrganizationTeamEmployee>;
    /**
     * Delete team member by memberId
     *
     * @param memberId
     * @param options
     * @returns
     */
    delete(memberId: IOrganizationTeamEmployee['id'], options: DeleteTeamMemberQueryDTO): Promise<DeleteResult | OrganizationTeamEmployee>;
}
