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
exports.createDefaultAccountingTemplates = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const accounting_template_entity_1 = require("./accounting-template.entity");
const mjml_1 = __importDefault(require("mjml"));
/**
 * Note: This seed file assumes the following directory structure in seeds/data/accounting/default-accounting-templates/ folder
 *
 * [template-name] / [language-code] / [template-type].mjml
 *
 * template-name: Is the name of the template
 * language-code: Is the ISO language code lik bg, en, he, ru
 * template-type: Can be 'html', 'subject' or 'text' but needs to only have .hbs or .mjml extension
 */
const createDefaultAccountingTemplates = async (dataSource) => {
    try {
        const templatePath = [
            'core',
            'seeds',
            'data',
            'default-accounting-templates'
        ];
        const files = [];
        let FOLDER_PATH = path.join(__dirname, '../', ...templatePath);
        FOLDER_PATH = fs.existsSync(FOLDER_PATH)
            ? FOLDER_PATH
            : path.resolve('.', ...templatePath.slice(2));
        findInDir(FOLDER_PATH, files);
        console.log(files);
        await fileToTemplate(dataSource, files);
    }
    catch (error) {
        console.error(error);
    }
};
exports.createDefaultAccountingTemplates = createDefaultAccountingTemplates;
function findInDir(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const fileStat = fs.lstatSync(filePath);
        if (fileStat.isDirectory()) {
            findInDir(filePath, fileList);
        }
        else {
            fileList.push(filePath);
        }
    });
}
const fileToTemplate = async (connection, files) => {
    for (const file of files) {
        const template = await pathToAccountingTemplate(file);
        if (template) {
            await insertTemplate(connection, template);
        }
    }
};
const insertTemplate = async (dataSource, accountingTemplate) => {
    await dataSource
        .createQueryBuilder()
        .insert()
        .into(accounting_template_entity_1.AccountingTemplate)
        .values(accountingTemplate)
        .execute();
};
const pathToAccountingTemplate = async (fullPath) => {
    try {
        const template = new accounting_template_entity_1.AccountingTemplate();
        //default template access for tenant organizations
        const templatePath = fullPath.replace(/\\/g, '/').split('/');
        template.languageCode = templatePath[templatePath.length - 2];
        const fileContent = fs.readFileSync(fullPath, 'utf8');
        const fileName = templatePath[templatePath.length - 1].split('.', 2);
        const fileNameWithoutExtension = fileName[0];
        template.name = `${templatePath[templatePath.length - 3]}`;
        template.mjml = fileContent;
        template.hbs = (0, mjml_1.default)(fileContent).html;
        template.templateType = fileNameWithoutExtension;
        return template;
    }
    catch (error) {
        console.log('Something went wrong', path, error);
        return;
    }
};
//# sourceMappingURL=accounting-template.seed.js.map