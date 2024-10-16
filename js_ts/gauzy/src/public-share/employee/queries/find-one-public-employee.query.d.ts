import { IQuery } from '@nestjs/cqrs';
import { FindOptionsWhere } from 'typeorm';
import { Employee } from '../../../core/entities/internal';
export declare class FindOnePublicEmployeeQuery implements IQuery {
    readonly params: FindOptionsWhere<Employee>;
    readonly relations: string[];
    constructor(params: FindOptionsWhere<Employee>, relations: string[]);
}
