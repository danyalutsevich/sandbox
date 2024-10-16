import { LanguagesEnum } from "../../../plugins/contracts";
/**
 * Represents a serialized version of a request context.
 */
export type SerializedRequestContext = {
    _req?: any;
    _languageCode?: LanguagesEnum;
    _isAuthorized?: boolean;
};
