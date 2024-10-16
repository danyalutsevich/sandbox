import { IQueryHandler } from '@nestjs/cqrs';
import { IEmployee } from '../../../../../plugins/contracts/dist/index';
import { FindOnePublicEmployeeQuery } from '../find-one-public-employee.query';
import { PublicEmployeeService } from './../../public-employee.service';
export declare class FindOnePublicEmployeeHandler implements IQueryHandler<FindOnePublicEmployeeQuery> {
    private readonly publicEmployeeService;
    constructor(publicEmployeeService: PublicEmployeeService);
    execute(query: FindOnePublicEmployeeQuery): Promise<IEmployee>;
}
