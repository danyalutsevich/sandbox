import { IEmployee, IPagination } from '../../../../../plugins/contracts/dist/index';
import { IQueryHandler } from '@nestjs/cqrs';
import { FindPublicEmployeesByOrganizationQuery } from '../find-public-employees-by-organization.query';
import { PublicEmployeeService } from '../../public-employee.service';
export declare class FindPublicEmployeesByOrganizationHandler implements IQueryHandler<FindPublicEmployeesByOrganizationQuery> {
    private readonly publicEmployeeService;
    constructor(publicEmployeeService: PublicEmployeeService);
    execute(query: FindPublicEmployeesByOrganizationQuery): Promise<IPagination<IEmployee>>;
}
