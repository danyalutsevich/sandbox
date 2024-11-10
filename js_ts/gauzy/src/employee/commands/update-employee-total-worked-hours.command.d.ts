import { ICommand } from '@nestjs/cqrs';
export declare class UpdateEmployeeTotalWorkedHoursCommand implements ICommand {
    readonly employeeId: string;
    readonly hours?: number;
    static readonly type = "[Employee] Update Total Worked Hours";
    constructor(employeeId: string, hours?: number);
}
