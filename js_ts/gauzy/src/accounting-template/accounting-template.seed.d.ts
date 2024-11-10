import { DataSource } from 'typeorm';
/**
 * Note: This seed file assumes the following directory structure in seeds/data/accounting/default-accounting-templates/ folder
 *
 * [template-name] / [language-code] / [template-type].mjml
 *
 * template-name: Is the name of the template
 * language-code: Is the ISO language code lik bg, en, he, ru
 * template-type: Can be 'html', 'subject' or 'text' but needs to only have .hbs or .mjml extension
 */
export declare const createDefaultAccountingTemplates: (dataSource: DataSource) => Promise<any>;
