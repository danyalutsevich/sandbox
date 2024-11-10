import { ICommandHandler } from '@nestjs/cqrs';
import { ICandidate } from '../../../../plugins/contracts/dist/index';
import { CandidateService } from '../../candidate.service';
import { CandidateHiredCommand } from '../candidate.hired.command';
import { EmployeeService } from './../../../employee/employee.service';
import { UserService } from './../../../user/user.service';
import { RoleService } from './../../../role/role.service';
export declare class CandidateHiredHandler implements ICommandHandler<CandidateHiredCommand> {
    private readonly candidateService;
    private readonly employeeService;
    private readonly userService;
    private readonly roleService;
    constructor(candidateService: CandidateService, employeeService: EmployeeService, userService: UserService, roleService: RoleService);
    /**
     * Executes the process of hiring a candidate.
     *
     * @param {CandidateHiredCommand} command - The command containing the candidate ID.
     * @returns {Promise<ICandidate>} - The updated candidate object.
     * @throws {ConflictException} - If the candidate is already hired.
     * @throws {BadRequestException} - If there is an error during the update process.
     */
    execute({ id }: CandidateHiredCommand): Promise<ICandidate>;
}
