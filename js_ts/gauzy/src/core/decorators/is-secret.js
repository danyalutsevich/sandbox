"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrapSecrets = exports.IsSecret = void 0;
const common_1 = require("../../../plugins/common");
/**
 * Checks if value is needs to be wrap with specific character.
 *
 * @param boolean
 * @returns
 */
function IsSecret(boolean = true) {
    return (target, property) => {
        Reflect.defineMetadata(property, boolean, target);
    };
}
exports.IsSecret = IsSecret;
/**
 * Wrap specified keys in an object with a specific character based on metadata.
 *
 * @param secrets - The object containing the sensitive data.
 * @param targets - The target class or classes with metadata.
 * @param percentage - The percentage of the string to be replaced with the character.
 * @param character - The character used for replacement.
 * @returns The object with specified keys wrapped.
 */
function WrapSecrets(secrets, targets, percentage = 35, character = '*') {
    // Check if found class target, convert it into array to use for loop
    if ((0, common_1.isClassInstance)(targets)) {
        targets = [targets];
    }
    for (const target of targets) {
        if ((0, common_1.isObject)(secrets)) {
            for (const [key, value] of Object.entries(secrets)) {
                if (Reflect.hasMetadata(key, target) && Reflect.getMetadata(key, target)) {
                    if ((0, common_1.isNotEmpty)(value)) {
                        const string = value.toString();
                        // Calculate offset in percentage based on secret length
                        const offset = Math.ceil((percentage / 100) * string.length);
                        // Get first offset character
                        const first = string.substring(0, offset);
                        // Get last offset character
                        const last = string.slice(string.length - offset);
                        // Create character repeater
                        const repeater = character.repeat(offset);
                        // ReplaceAll secrets with character
                        secrets[key] = string.replace(first, repeater).replace(last, repeater);
                    }
                }
            }
        }
    }
    return secrets;
}
exports.WrapSecrets = WrapSecrets;
//# sourceMappingURL=is-secret.js.map