/**
 * Checks if value is needs to be wrap with specific character.
 *
 * @param boolean
 * @returns
 */
export declare function IsSecret(boolean?: boolean): PropertyDecorator;
/**
 * Wrap specified keys in an object with a specific character based on metadata.
 *
 * @param secrets - The object containing the sensitive data.
 * @param targets - The target class or classes with metadata.
 * @param percentage - The percentage of the string to be replaced with the character.
 * @param character - The character used for replacement.
 * @returns The object with specified keys wrapped.
 */
export declare function WrapSecrets(secrets: Record<string, any>, targets: any | any[], percentage?: number, character?: string): Record<string, any>;
