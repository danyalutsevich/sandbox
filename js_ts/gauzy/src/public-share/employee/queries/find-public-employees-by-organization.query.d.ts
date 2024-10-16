import { IQuery } from '@nestjs/cqrs';
import { FindOptionsWhere } from 'typeorm';
import { Employee } from '../../../core/entities/internal';
export declare class FindPublicEmployeesByOrganizationQuery implements IQuery {
    readonly options: FindOptionsWhere<Employee>;
    readonly relations: string[];
    constructor(options: FindOptionsWhere<Employee>, relations: string[]);
}
