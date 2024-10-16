/**
 * Get public organization request DTO validation
 */
export declare enum OrganizationRelationEnum {
    'image' = "image",
    'skills' = "skills",
    'awards' = "awards",
    'languages' = "languages",
    'languages.language' = "languages.language"
}
export declare class PublicOrganizationQueryDTO {
    readonly relations: string[];
}
