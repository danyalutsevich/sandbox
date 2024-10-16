"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLanguages = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const faker_1 = require("@faker-js/faker");
const language_entity_1 = require("./language.entity");
const all_languages_1 = __importDefault(require("./all-languages"));
const createLanguages = async (dataSource) => {
    const systemLanguages = Object.values(index_1.LanguagesEnum);
    const languages = [];
    for (const key in all_languages_1.default) {
        if (Object.prototype.hasOwnProperty.call(all_languages_1.default, key)) {
            const { name } = all_languages_1.default[key];
            const language = new language_entity_1.Language();
            language.name = name;
            language.code = key;
            language.is_system = systemLanguages.indexOf(key) >= 0;
            language.description = '';
            language.color = faker_1.faker.internet.color();
            languages.push(language);
        }
    }
    try {
        await dataSource.getRepository(language_entity_1.Language).save(languages);
    }
    catch (error) {
        console.log({ error });
    }
    return languages;
};
exports.createLanguages = createLanguages;
//# sourceMappingURL=language.seed.js.map