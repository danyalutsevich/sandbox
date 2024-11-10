"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_ORGANIZATIONS = exports.DEFAULT_EVER_ORGANIZATIONS = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
exports.DEFAULT_EVER_ORGANIZATIONS = [
    {
        name: 'Ever Technologies LTD',
        currency: index_1.CurrenciesEnum.BGN,
        defaultValueDateType: index_1.DefaultValueDateTypeEnum.TODAY,
        imageUrl: 'assets/images/logos/ever-large.jpg',
        isDefault: true,
        totalEmployees: 17
    },
    {
        name: 'Ever Co. Ltd',
        currency: index_1.CurrenciesEnum.ILS,
        defaultValueDateType: index_1.DefaultValueDateTypeEnum.TODAY,
        imageUrl: 'assets/images/logos/ever-large.jpg',
        isDefault: false,
        totalEmployees: 0
    }
];
exports.DEFAULT_ORGANIZATIONS = [
    {
        name: 'Default Company',
        currency: index_1.CurrenciesEnum.USD,
        defaultValueDateType: index_1.DefaultValueDateTypeEnum.TODAY,
        imageUrl: 'assets/images/logos/logo_Gauzy.svg',
        isDefault: true,
        totalEmployees: 1
    }
];
//# sourceMappingURL=default-organizations.js.map