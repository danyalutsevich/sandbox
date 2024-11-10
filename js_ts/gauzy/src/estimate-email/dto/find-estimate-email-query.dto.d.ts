import { IEstimateEmailFindInput } from '../../../plugins/contracts';
import { RelationsQueryDTO } from "./../../shared/dto";
export declare class FindEstimateEmailQueryDTO extends RelationsQueryDTO implements IEstimateEmailFindInput {
    readonly email: string;
    readonly token: string;
}
