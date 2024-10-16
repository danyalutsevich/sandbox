import { RelationsQueryDTO } from "./../../shared/dto";
import { CreateFeatureToggleDTO } from "./create-feature-toggle.dto";
declare const FeatureOrganizationQueryDTO_base: import("@nestjs/mapped-types").MappedType<RelationsQueryDTO & Partial<Omit<CreateFeatureToggleDTO, "isEnabled">>>;
/**
 * GET feature organization query request DTO validation
 */
export declare class FeatureOrganizationQueryDTO extends FeatureOrganizationQueryDTO_base {
}
export {};
