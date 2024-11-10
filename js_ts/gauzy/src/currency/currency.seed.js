"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCurrencies = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const currency_entity_1 = require("./currency.entity");
const createCurrencies = async (dataSource) => {
    return await new Promise(async (resolve, reject) => {
        try {
            const currencies = [];
            const entries = index_1.DEFAULT_CURRENCIES;
            for (const key of Object.keys(entries)) {
                if (entries.hasOwnProperty(key)) {
                    const currency = {
                        isoCode: key,
                        currency: entries[key]
                    };
                    currencies.push(currency);
                }
            }
            await insertCurrency(dataSource, currencies);
            resolve(currencies);
        }
        catch (err) {
            console.log('Error parsing currency:', err);
            reject(null);
            return;
        }
    });
};
exports.createCurrencies = createCurrencies;
const insertCurrency = async (dataSource, currencies) => {
    await dataSource
        .createQueryBuilder()
        .insert()
        .into(currency_entity_1.Currency)
        .values(currencies)
        .execute();
};
//# sourceMappingURL=currency.seed.js.map