import { QueryRunner } from "typeorm";
import * as fs from "fs";
import * as path from "path";
import  mjml2html from 'mjml';
import { v4 as uuidV4 } from 'uuid';
import chalk from 'chalk';
import moment from 'moment';
import { EmailTemplateEnum } from '../../plugins/contracts/dist/index';
import { isNotEmpty } from "../../plugins/common";
import { DatabaseTypeEnum } from'../../plugins/config/dist/index';
import { prepareSQLQuery as p } from './../database/database.helper';

/**
 * Email templates utils functions.
 */
export class EmailTemplateUtils {

    public static globalPath = [
        'core',
        'seeds',
        'data',
        'default-email-templates'
    ];

    /**
     * Migrate email templates for specific folder
     *
     * @param queryRunner
     * @param folder
     */
    public static async migrateEmailTemplates(
        queryRunner: QueryRunner,
        folder: EmailTemplateEnum
    ): Promise<void> {
        const templatePath = path.join(path.join(__dirname), '../', ...EmailTemplateUtils.globalPath);

        // Found default email templates path
        if (EmailTemplateUtils.fileExists(templatePath)) {
            if (isNotEmpty(folder)) {
                const files = [];
                const folderPath = path.join(templatePath, folder);

                // Read directory for missing templates
                EmailTemplateUtils.readdirSync(folderPath, files);
                const templates = EmailTemplateUtils.filesToTemplates(files);

                await EmailTemplateUtils.createOrUpdateTemplates(queryRunner, templates);

                console.log(chalk.magenta(`${moment().format('DD.MM.YYYY HH:mm:ss')} Migrated email templates for ${folderPath}`));
            }
        }
    }

    /**
     * Read files directory
     *
     * @param dir
     * @param files
     */
    public static readdirSync(directory: string, files: string[] = []): void {
        // if directory exists.
        if (EmailTemplateUtils.fileExists(directory)) {
            const items = fs.readdirSync(directory);
            items.forEach((file: string) => {
                const filePath = path.join(directory, file);
                // if file path exists.
                if (EmailTemplateUtils.fileExists(filePath)) {
                    // if directory found, do recurring check.
                    if (fs.lstatSync(filePath).isDirectory()) {
                        EmailTemplateUtils.readdirSync(filePath, files);
                    } else {
                        files.push(filePath);
                    }
                }
            });
        }
    }

    /**
     * File path exists or not
     *
     * @param filePath
     * @returns
     */
    public static fileExists(filePath: string): boolean {
        return fs.existsSync(filePath);
    }

    /**
     * Convert file path to email template
     *
     * @param path
     * @returns
     */
    public static pathToTemplate(path: string): Object {
        try {
            const template = new Object();
            const paths = path.replace(/\\/g, '/').split('/');

            // Also very fast but it will remove the element from the array also, this may or may
            // not matter in your case.
            const files = paths.pop().split('.', 2);

            // separate filename & extension
            const filename = files[0];
            const extension = files[1];

            template['languageCode'] = paths.pop();
            template['name'] = `${paths.pop()}/${filename}`;

            const fileContent = fs.readFileSync(path, 'utf8');
            switch (extension) {
                case 'mjml':
                    template['mjml'] = fileContent;
                    template['hbs'] = mjml2html(fileContent).html;
                    break;
                case 'hbs':
                    template['hbs'] = fileContent;
                    break;
                default:
                    console.log(`Warning: ${path} Will be ignored. Only .hbs and .mjml files are supported!`);
                    break;
            }
            if (!template['hbs']) {
                return;
            }
            return template;
        } catch (error) {
            console.log('Something went wrong during path to template convert', path, error);
            return;
        }
    }

    /**
     * Convert multiples files to templates
     *
     * @param files
     * @returns
     */
    public static filesToTemplates(files: string[] = []): Array<Object> {
        const templates: Array<Object> = [];
        for (const file of files) {
            const template = EmailTemplateUtils.pathToTemplate(file);
            templates.push(template);
        }
        return templates;
    }

    /**
     * Create or update email templates into database
     *
     * @param templates
     */
    public static async createOrUpdateTemplates(
        queryRunner: QueryRunner,
        templates: Array<Object> = []
    ) {
        for await (const item of templates) {
            const { name, languageCode, hbs, mjml = null } = item as any;
            const payload = [
                name,
                languageCode,
                hbs,
                mjml
            ];

            let query, update, insert: string;
            switch (queryRunner.connection.options.type) {
                case DatabaseTypeEnum.sqlite:
                case DatabaseTypeEnum.betterSqlite3:
                    query = `SELECT COUNT(*) FROM "email_template" WHERE ("name" = ? AND "languageCode" = ?) AND ("tenantId" IS NULL AND "organizationId" IS NULL)`;
                    update = `UPDATE "email_template" SET "hbs" = ?, "mjml" = ? WHERE ("name" = ? AND "languageCode" = ?) AND ("tenantId" IS NULL AND "organizationId" IS NULL)`;
                    payload.push(uuidV4());
                    insert = `INSERT INTO "email_template" ("name", "languageCode", "hbs", "mjml", "id") VALUES(?, ?, ?, ?, ?)`;
                    break;
                case DatabaseTypeEnum.postgres:
                    query = `SELECT COUNT(*) FROM "email_template" WHERE ("name" = $1 AND "languageCode" = $2) AND ("tenantId" IS NULL AND "organizationId" IS NULL)`;
                    update = `UPDATE "email_template" SET "hbs" = $1, "mjml" = $2 WHERE ("name" = $3 AND "languageCode" = $4) AND ("tenantId" IS NULL AND "organizationId" IS NULL)`;
                    insert = `INSERT INTO "email_template" ("name", "languageCode", "hbs", mjml) VALUES($1, $2, $3, $4)`;
                    break;
                case DatabaseTypeEnum.mysql:
                    query = p(`SELECT COUNT(*) FROM "email_template" WHERE ("name" = ? AND "languageCode" = ?) AND ("tenantId" IS NULL AND "organizationId" IS NULL)`);
                    update = p(`UPDATE "email_template" SET "hbs" = ?, "mjml" = ? WHERE ("name" = ? AND "languageCode" = ?) AND ("tenantId" IS NULL AND "organizationId" IS NULL)`);
                    insert = p(`INSERT INTO "email_template" ("name", "languageCode", "hbs", mjml) VALUES(?, ?, ?, ?)`);
                    break;
                default:
                    throw Error(`cannot create or update templates due to unsupported database type: ${queryRunner.connection.options.type}`);

            }

            const [template] = await queryRunner.connection.manager.query(query, [name, languageCode]);

            if (parseInt(template.count, 10) > 0) {
                await queryRunner.connection.manager.query(update, [hbs, mjml, name, languageCode]);
            } else {
                await queryRunner.connection.manager.query(insert, payload);
            }
        }
    }
}
