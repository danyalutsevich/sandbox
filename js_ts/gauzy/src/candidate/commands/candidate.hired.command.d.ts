import { ICandidate } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class CandidateHiredCommand implements ICommand {
    readonly id: ICandidate['id'];
    static readonly type = "[Candidate] Hired";
    constructor(id: ICandidate['id']);
}
