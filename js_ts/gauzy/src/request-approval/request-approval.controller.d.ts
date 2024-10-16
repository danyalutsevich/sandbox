import { CrudController } from './../core/crud';
import { RequestApproval } from './request-approval.entity';
import { RequestApprovalService } from './request-approval.service';
import { IRequestApproval, IRequestApprovalCreateInput, IPagination } from '../../plugins/contracts/dist/index';
import { CommandBus } from '@nestjs/cqrs';
export declare class RequestApprovalController extends CrudController<RequestApproval> {
    private readonly requestApprovalService;
    private readonly commandBus;
    constructor(requestApprovalService: RequestApprovalService, commandBus: CommandBus);
    /**
     * GET all request approval by employee
     *
     * @param id
     * @param data
     * @returns
     */
    findRequestApprovalsByEmployeeId(id: string, data: any): Promise<IPagination<IRequestApproval>>;
    /**
     * UPDATE employee accept request approval
     *
     * @param id
     * @returns
     */
    employeeApprovalRequestApproval(id: string): Promise<IRequestApproval>;
    /**
     * UPDATE employee refuse request approval
     *
     * @param id
     * @returns
     */
    employeeRefuseRequestApproval(id: string): Promise<IRequestApproval>;
    /**
     * GET all request approvals
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<IRequestApproval>>;
    /**
     * CREATE request approval
     *
     * @param entity
     * @returns
     */
    create(entity: IRequestApprovalCreateInput): Promise<IRequestApproval>;
    /**
     * UPDATE request approval by id
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: string, entity: IRequestApprovalCreateInput): Promise<IRequestApproval>;
}
