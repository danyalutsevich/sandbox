import { ICommand } from '@nestjs/cqrs';
import { IEmployeeCreateInput, LanguagesEnum } from '../../../plugins/contracts';
export declare class EmployeeBulkCreateCommand implements ICommand {
    readonly input: IEmployeeCreateInput[];
    readonly languageCode: LanguagesEnum;
    readonly originUrl: string;
    static readonly type = "[Employee] Bulk Create";
    constructor(input: IEmployeeCreateInput[], languageCode: LanguagesEnum, originUrl: string);
}
