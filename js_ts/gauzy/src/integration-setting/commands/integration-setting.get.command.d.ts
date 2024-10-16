import { ICommand } from '@nestjs/cqrs';
import { FindOneOptions } from 'typeorm';
export declare class IntegrationSettingGetCommand implements ICommand {
    readonly input: FindOneOptions;
    static readonly type = "[Integration Setting] Get Integration Setting";
    constructor(input: FindOneOptions);
}
