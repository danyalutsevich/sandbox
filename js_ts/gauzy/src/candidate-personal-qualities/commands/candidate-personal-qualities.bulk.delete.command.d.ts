import { ICommand } from '@nestjs/cqrs';
import { ICandidatePersonalQualities } from '../../../plugins/contracts';
export declare class CandidatePersonalQualitiesBulkDeleteCommand implements ICommand {
    readonly id: string;
    readonly personalQualities?: ICandidatePersonalQualities[];
    static readonly type = "[CandidatePersonalQualities] Delete";
    constructor(id: string, personalQualities?: ICandidatePersonalQualities[]);
}
