import { ICommand } from '@nestjs/cqrs';
export declare class WorkingEmployeeGetCommand implements ICommand {
    readonly input: any;
    static readonly type = "[Working Employee] Get";
    constructor(input: any);
}
