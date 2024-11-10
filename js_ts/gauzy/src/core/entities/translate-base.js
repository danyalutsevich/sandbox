"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslatableBase = exports.TranslationBase = void 0;
const internal_1 = require("../entities/internal");
class TranslationBase extends internal_1.TenantOrganizationBaseEntity {
    reference;
    languageCode;
}
exports.TranslationBase = TranslationBase;
class TranslatableBase extends internal_1.TenantOrganizationBaseEntity {
    translations;
    translate(langCode) {
        if (!this.translations)
            return this;
        const translationObj = this.translations.find((translation) => {
            return translation.languageCode === langCode;
        });
        if (!translationObj)
            return this;
        for (const prop of Object.keys(translationObj)) {
            if (!['id', 'languageCode'].includes(prop)) {
                this[prop] = translationObj[prop];
            }
        }
        delete this.translations;
        return this;
    }
    /*
     * translate product object keeping all root elements
     * and adding translated prop up to two nested levels
     */
    translateNested(languageCode, translatePropsInput) {
        let element = this;
        let currentInputProp;
        let propsTranslateKeys;
        let elementPropTranslations;
        let result = {};
        let inputProps = translatePropsInput.map((translateObj) => {
            return {
                ...translateObj,
                propAsArr: translateObj.prop.split('.')
            };
        });
        Object.keys(this).forEach((prop) => {
            if (prop == 'translations')
                prop = 'root';
            currentInputProp = inputProps.find((el) => el.propAsArr[0] == prop);
            if (!currentInputProp) {
                result[prop] = element[prop];
            }
            else {
                let inputKeys = inputProps.find((el) => el.propAsArr[0] == prop).propAsArr;
                if (prop == 'root') {
                    elementPropTranslations = element
                        ? element.translations
                        : [];
                }
                else if (inputKeys.length == 1) {
                    elementPropTranslations = element[inputKeys[0]]
                        ? element[inputKeys[0]].translations
                        : [];
                }
                else if (inputKeys.length == 2) {
                    elementPropTranslations = element[inputKeys[0]]
                        ? element[inputKeys[0]][inputKeys[1]].translations
                        : [];
                }
                let elementPropTranslation = elementPropTranslations.find((translation) => translation.languageCode == languageCode) || null;
                if (elementPropTranslations && elementPropTranslation) {
                    propsTranslateKeys = currentInputProp.propsTranslate || [];
                    propsTranslateKeys.forEach((translateKeyInput) => {
                        result[translateKeyInput.alias] =
                            elementPropTranslation[translateKeyInput.key] || '';
                    });
                }
            }
        });
        return result;
    }
}
exports.TranslatableBase = TranslatableBase;
//# sourceMappingURL=translate-base.js.map