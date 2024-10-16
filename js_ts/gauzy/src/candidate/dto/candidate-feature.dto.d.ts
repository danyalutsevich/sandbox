import { ICandidate, IRelationalCandidate } from '../../../plugins/contracts';
export declare class CandidateFeatureDTO implements IRelationalCandidate {
    readonly candidateId: ICandidate['id'];
    readonly candidate: ICandidate;
}
