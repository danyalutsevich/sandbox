import { IFindMeUser } from '../../../plugins/contracts';
import { RelationsQueryDTO } from "./../../shared/dto";
/**
 * DTO for "find me" queries to retrieve logged-in user details, extending from RelationsQueryDTO.
 */
export declare class FindMeQueryDTO extends RelationsQueryDTO implements IFindMeUser {
    /**
    * Optional flag to include employee details in the response.
    * It is marked as optional in the API documentation.
    * If provided, its value is transformed to a boolean; defaults to false if not provided.
    */
    readonly includeEmployee: boolean;
    /**
    * Optional flag to include organization details inside the employee response.
    * It is marked as optional in the API documentation.
    * If provided, its value is transformed to a boolean; defaults to false if not provided.
    */
    readonly includeOrganization: boolean;
}
