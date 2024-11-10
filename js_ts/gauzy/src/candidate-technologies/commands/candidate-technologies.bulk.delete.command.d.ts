import { ICommand } from '@nestjs/cqrs';
import { ICandidateTechnologies } from '../../../plugins/contracts';
export declare class CandidateTechnologiesBulkDeleteCommand implements ICommand {
    readonly id: string;
    readonly technologies?: ICandidateTechnologies[];
    static readonly type = "[CandidateTechnologies] Delete";
    constructor(id: string, technologies?: ICandidateTechnologies[]);
}
