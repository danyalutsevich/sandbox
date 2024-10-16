import { Repository } from 'typeorm';
import { Employee } from '../employee.entity';
import { IEmployee, IEmployeeFindInput } from '../../../plugins/contracts';
export declare class TypeOrmEmployeeRepository extends Repository<Employee> {
    readonly repository: Repository<Employee>;
    constructor(repository: Repository<Employee>);
    /**
     * Fetches an employee based on the provided query.
     *
     * @param query - The query parameters to find the employee.
     * @returns A Promise resolving to the employee entity or null.
     */
    findOneByOptions(query: IEmployeeFindInput): Promise<IEmployee | null>;
}
