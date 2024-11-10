"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCountries = void 0;
const country_entity_1 = require("./country.entity");
const default_countries_1 = require("./default-countries");
const createCountries = async (dataSource) => {
    return await new Promise(async (resolve, reject) => {
        try {
            const countries = [];
            const entries = default_countries_1.DEFAULT_COUNTRIES;
            for (const key of Object.keys(entries)) {
                if (entries.hasOwnProperty(key)) {
                    const country = {
                        isoCode: key,
                        country: entries[key]
                    };
                    countries.push(country);
                }
            }
            await insertCountry(dataSource, countries);
            resolve(countries);
        }
        catch (err) {
            console.log('Error parsing country:', err);
            reject(null);
            return;
        }
    });
};
exports.createCountries = createCountries;
const insertCountry = async (dataSource, countries) => {
    await dataSource
        .createQueryBuilder()
        .insert()
        .into(country_entity_1.Country)
        .values(countries)
        .execute();
};
//# sourceMappingURL=country.seed.js.map