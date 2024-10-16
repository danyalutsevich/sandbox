import { StatusTypesEnum } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class TimeOffStatusCommand implements ICommand {
    readonly id: string;
    readonly status: StatusTypesEnum;
    static readonly type = "[TimeOff] Status";
    constructor(id: string, status: StatusTypesEnum);
}
