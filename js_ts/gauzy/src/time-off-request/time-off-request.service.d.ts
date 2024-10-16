import { ITimeOffCreateInput, IPagination, ITimeOffFindInput } from '../../plugins/contracts/dist/index';
import { TimeOffRequest } from './time-off-request.entity';
import { TenantAwareCrudService } from './../core/crud';
import { MikroOrmRequestApprovalRepository } from 'request-approval/repository/mikro-orm-request-approval.repository';
import { TypeOrmRequestApprovalRepository } from 'request-approval/repository/type-orm-request-approval.repository';
import { MikroOrmTimeOffRequestRepository } from './repository/mikro-orm-time-off-request.repository';
import { TypeOrmTimeOffRequestRepository } from './repository/type-orm-time-off-request.repository';
export declare class TimeOffRequestService extends TenantAwareCrudService<TimeOffRequest> {
    private typeOrmRequestApprovalRepository;
    constructor(typeOrmTimeOffRequestRepository: TypeOrmTimeOffRequestRepository, mikroOrmTimeOffRequestRepository: MikroOrmTimeOffRequestRepository, typeOrmRequestApprovalRepository: TypeOrmRequestApprovalRepository, mikroOrmRequestApprovalRepository: MikroOrmRequestApprovalRepository);
    create(entity: ITimeOffCreateInput): Promise<TimeOffRequest>;
    getAllTimeOffRequests(relations: string[], findInput: ITimeOffFindInput): Promise<IPagination<TimeOffRequest>>;
    updateTimeOffByAdmin(id: string, timeOffRequest: ITimeOffCreateInput): Promise<{
        employees?: import("../../plugins/contracts/dist/employee.model").IEmployee[];
        description?: string;
        policy?: import("../../plugins/contracts/dist/time-off.model").ITimeOffPolicy;
        start?: Date;
        end?: Date;
        requestDate?: Date;
        status?: string;
        isHoliday?: boolean;
        documentUrl?: string;
        organizationId?: string;
        organization?: import("../../plugins/contracts/dist/organization.model").IOrganization;
        tenantId?: string;
        tenant?: import("../../plugins/contracts/dist/tenant.model").ITenant;
        id: string;
        createdAt?: Date;
        updatedAt?: Date;
        isActive?: boolean;
        isArchived?: boolean;
        deletedAt?: Date;
    } & TimeOffRequest>;
    updateStatusTimeOffByAdmin(id: string, status: string): Promise<TimeOffRequest>;
    /**
     * Time Off Request override pagination method
     *
     * @param options
     * @returns
     */
    pagination(options: any): Promise<{
        items: TimeOffRequest[];
        total: number;
    }>;
}
