import { QueryRunner } from "typeorm";
import { EmailTemplateEnum } from '../../plugins/contracts/dist/index';
/**
 * Email templates utils functions.
 */
export declare class EmailTemplateUtils {
    static globalPath: string[];
    /**
     * Migrate email templates for specific folder
     *
     * @param queryRunner
     * @param folder
     */
    static migrateEmailTemplates(queryRunner: QueryRunner, folder: EmailTemplateEnum): Promise<void>;
    /**
     * Read files directory
     *
     * @param dir
     * @param files
     */
    static readdirSync(directory: string, files?: string[]): void;
    /**
     * File path exists or not
     *
     * @param filePath
     * @returns
     */
    static fileExists(filePath: string): boolean;
    /**
     * Convert file path to email template
     *
     * @param path
     * @returns
     */
    static pathToTemplate(path: string): Object;
    /**
     * Convert multiples files to templates
     *
     * @param files
     * @returns
     */
    static filesToTemplates(files?: string[]): Array<Object>;
    /**
     * Create or update email templates into database
     *
     * @param templates
     */
    static createOrUpdateTemplates(queryRunner: QueryRunner, templates?: Array<Object>): Promise<void>;
}
