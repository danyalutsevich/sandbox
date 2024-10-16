import { QueryBus } from '@nestjs/cqrs';
import { FindOptionsWhere } from 'typeorm';
import { IEmployee, IPagination } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from './../../core/dto';
import { Employee } from './../../core/entities/internal';
import { PublicEmployeeQueryDTO } from './dto/public-employee-query.dto';
export declare class PublicEmployeeController {
    private readonly queryBus;
    constructor(queryBus: QueryBus);
    /**
     * GET public employees in the specific organization
     *
     * @param params
     * @param options
     * @returns
     */
    findPublicEmployeesByOrganization(conditions: TenantOrganizationBaseDTO, options: PublicEmployeeQueryDTO): Promise<IPagination<IEmployee>>;
    /**
     * GET public employee by profile link in the specific organization
     *
     * @param id
     * @param profile_link
     * @returns
     */
    findPublicEmployeeByProfileLink(params: FindOptionsWhere<Employee>, options: PublicEmployeeQueryDTO): Promise<IEmployee>;
}
