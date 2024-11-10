import { ApplicationPluginConfig } from '../../../plugins/common/dist/index';
/**
 * Copy ever icons
 *
 * @param fileName
 * @param config
 * @returns
 */
export declare function copyAssets(filename: string, config: Partial<ApplicationPluginConfig>, destDir?: string): string;
/**
 * Clean old ever icons
 *
 * @param config
 * @param destDir
 */
export declare function cleanAssets(config: Partial<ApplicationPluginConfig>, destDir: string): Promise<void>;
/**
 * Takes an email string, converts it to lowercase, and appends a postfix "_ever_testing" before the "@" symbol.
 *
 * @param email The email address to modify.
 * @param postfix The postfix to append (default is "_ever_testing").
 * @returns The modified email address with the postfix appended before the "@" symbol.
 */
export declare function getEmailWithPostfix(email: string, postfix?: string): string;
