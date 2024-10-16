import { ICommand } from '@nestjs/cqrs';
import { FindOneOptions } from 'typeorm';
import { Employee } from './../employee.entity';
export declare class EmployeeGetCommand implements ICommand {
    readonly input: FindOneOptions<Employee>;
    static readonly type = "[Employee] Get";
    constructor(input: FindOneOptions<Employee>);
}
