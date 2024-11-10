import { IBaseRelationsEntityModel } from '../../../plugins/contracts';
/**
 * Get relations request DTO validation
 */
export declare class RelationsQueryDTO implements IBaseRelationsEntityModel {
    readonly relations: string[];
}
