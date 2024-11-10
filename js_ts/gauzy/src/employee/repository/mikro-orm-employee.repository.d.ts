import { IEmployee, IEmployeeFindInput } from '../../../plugins/contracts';
import { MikroOrmBaseEntityRepository } from '../../core/repository/mikro-orm-base-entity.repository';
import { Employee } from '../employee.entity';
export declare class MikroOrmEmployeeRepository extends MikroOrmBaseEntityRepository<Employee> {
    /**
     * Fetches an employee based on the provided query.
     *
     * @param query - The query parameters to find the employee.
     * @returns A Promise resolving to the employee entity or null.
     */
    findOneByOptions(query: IEmployeeFindInput): Promise<IEmployee | null>;
}
