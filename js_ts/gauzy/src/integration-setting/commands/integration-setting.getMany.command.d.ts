import { ICommand } from '@nestjs/cqrs';
import { FindManyOptions } from 'typeorm';
export declare class IntegrationSettingGetManyCommand implements ICommand {
    readonly input: FindManyOptions;
    static readonly type = "[Integration Setting] Get Many Integration Setting";
    constructor(input: FindManyOptions);
}
