export declare const sensitiveSecretKeys: string[];
/**
 * Wrap specified keys in an object with a specific character.
 *
 * @param keysToWrap - An array of keys to be wrapped.
 * @param secrets - The object containing the sensitive data.
 * @param percentage - The percentage of the string to be replaced with the character.
 * @param character - The character used for replacement.
 * @returns The object with specified keys wrapped.
 */
export declare function keysToWrapSecrets(keysToWrap: string[], secrets: Record<string, any>, percentage?: number, character?: string): Record<string, any>;
