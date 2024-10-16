import { ICommand } from '@nestjs/cqrs';
export declare class IntegrationTypeGetCommand implements ICommand {
    static readonly type = "[Integration] Get Integration Types";
    constructor();
}
