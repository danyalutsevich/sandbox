import { FindOptionsWhere } from 'typeorm';
import { IEmployee, IPagination } from '../../../plugins/contracts';
import { Employee } from './../../core/entities/internal';
import { TypeOrmEmployeeRepository } from '../../employee/repository/type-orm-employee.repository';
import { MikroOrmEmployeeRepository } from '../../employee/repository/mikro-orm-employee.repository';
export declare class PublicEmployeeService {
    private typeOrmEmployeeRepository;
    constructor(typeOrmEmployeeRepository: TypeOrmEmployeeRepository, mikroOrmEmployeeRepository: MikroOrmEmployeeRepository);
    /**
     * GET all public employees by organization condition
     *
     * @param where
     * @param relations
     * @returns
     */
    findPublicEmployeeByOrganization(where: FindOptionsWhere<Employee>, relations?: string[]): Promise<IPagination<IEmployee>>;
    /**
     * GET employee by profile link & primary ID
     *
     * @param where
     * @param relations
     * @returns
     */
    findOneByConditions(where: FindOptionsWhere<Employee>, relations: string[]): Promise<IEmployee>;
}
