/**
 * Get public employee request DTO validation
 */
export declare enum EmployeeRelationEnum {
    'user' = "user",
    'user.image' = "user.image",
    'organizationEmploymentTypes' = "organizationEmploymentTypes",
    'organizationPosition' = "organizationPosition",
    'skills' = "skills",
    'awards' = "awards"
}
export declare class PublicEmployeeQueryDTO {
    readonly relations: string[];
}
