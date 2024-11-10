"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateUtils = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const mjml_1 = __importDefault(require("mjml"));
const uuid_1 = require("uuid");
const chalk_1 = __importDefault(require("chalk"));
const moment_1 = __importDefault(require("moment"));
const common_1 = require("../../plugins/common");
const index_1 = require("../../plugins/config/dist/index");
const database_helper_1 = require("./../database/database.helper");
/**
 * Email templates utils functions.
 */
class EmailTemplateUtils {
    static globalPath = [
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
    static async migrateEmailTemplates(queryRunner, folder) {
        const templatePath = path.join(path.join(__dirname), '../', ...EmailTemplateUtils.globalPath);
        // Found default email templates path
        if (EmailTemplateUtils.fileExists(templatePath)) {
            if ((0, common_1.isNotEmpty)(folder)) {
                const files = [];
                const folderPath = path.join(templatePath, folder);
                // Read directory for missing templates
                EmailTemplateUtils.readdirSync(folderPath, files);
                const templates = EmailTemplateUtils.filesToTemplates(files);
                await EmailTemplateUtils.createOrUpdateTemplates(queryRunner, templates);
                console.log(chalk_1.default.magenta(`${(0, moment_1.default)().format('DD.MM.YYYY HH:mm:ss')} Migrated email templates for ${folderPath}`));
            }
        }
    }
    /**
     * Read files directory
     *
     * @param dir
     * @param files
     */
    static readdirSync(directory, files = []) {
        // if directory exists.
        if (EmailTemplateUtils.fileExists(directory)) {
            const items = fs.readdirSync(directory);
            items.forEach((file) => {
                const filePath = path.join(directory, file);
                // if file path exists.
                if (EmailTemplateUtils.fileExists(filePath)) {
                    // if directory found, do recurring check.
                    if (fs.lstatSync(filePath).isDirectory()) {
                        EmailTemplateUtils.readdirSync(filePath, files);
                    }
                    else {
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
    static fileExists(filePath) {
        return fs.existsSync(filePath);
    }
    /**
     * Convert file path to email template
     *
     * @param path
     * @returns
     */
    static pathToTemplate(path) {
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
                    template['hbs'] = (0, mjml_1.default)(fileContent).html;
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
        }
        catch (error) {
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
    static filesToTemplates(files = []) {
        const templates = [];
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
    static async createOrUpdateTemplates(queryRunner, templates = []) {
        for await (const item of templates) {
            const { name, languageCode, hbs, mjml = null } = item;
            const payload = [
                name,
                languageCode,
                hbs,
                mjml
            ];
            let query, update, insert;
            switch (queryRunner.connection.options.type) {
                case index_1.DatabaseTypeEnum.sqlite:
                case index_1.DatabaseTypeEnum.betterSqlite3:
                    query = `SELECT COUNT(*) FROM "email_template" WHERE ("name" = ? AND "languageCode" = ?) AND ("tenantId" IS NULL AND "organizationId" IS NULL)`;
                    update = `UPDATE "email_template" SET "hbs" = ?, "mjml" = ? WHERE ("name" = ? AND "languageCode" = ?) AND ("tenantId" IS NULL AND "organizationId" IS NULL)`;
                    payload.push((0, uuid_1.v4)());
                    insert = `INSERT INTO "email_template" ("name", "languageCode", "hbs", "mjml", "id") VALUES(?, ?, ?, ?, ?)`;
                    break;
                case index_1.DatabaseTypeEnum.postgres:
                    query = `SELECT COUNT(*) FROM "email_template" WHERE ("name" = $1 AND "languageCode" = $2) AND ("tenantId" IS NULL AND "organizationId" IS NULL)`;
                    update = `UPDATE "email_template" SET "hbs" = $1, "mjml" = $2 WHERE ("name" = $3 AND "languageCode" = $4) AND ("tenantId" IS NULL AND "organizationId" IS NULL)`;
                    insert = `INSERT INTO "email_template" ("name", "languageCode", "hbs", mjml) VALUES($1, $2, $3, $4)`;
                    break;
                case index_1.DatabaseTypeEnum.mysql:
                    query = (0, database_helper_1.prepareSQLQuery)(`SELECT COUNT(*) FROM "email_template" WHERE ("name" = ? AND "languageCode" = ?) AND ("tenantId" IS NULL AND "organizationId" IS NULL)`);
                    update = (0, database_helper_1.prepareSQLQuery)(`UPDATE "email_template" SET "hbs" = ?, "mjml" = ? WHERE ("name" = ? AND "languageCode" = ?) AND ("tenantId" IS NULL AND "organizationId" IS NULL)`);
                    insert = (0, database_helper_1.prepareSQLQuery)(`INSERT INTO "email_template" ("name", "languageCode", "hbs", mjml) VALUES(?, ?, ?, ?)`);
                    break;
                default:
                    throw Error(`cannot create or update templates due to unsupported database type: ${queryRunner.connection.options.type}`);
            }
            const [template] = await queryRunner.connection.manager.query(query, [name, languageCode]);
            if (parseInt(template.count, 10) > 0) {
                await queryRunner.connection.manager.query(update, [hbs, mjml, name, languageCode]);
            }
            else {
                await queryRunner.connection.manager.query(insert, payload);
            }
        }
    }
}
exports.EmailTemplateUtils = EmailTemplateUtils;
//# sourceMappingURL=utils.js.map