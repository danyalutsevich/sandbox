"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crud_service_1 = require("../core/crud/crud.service");
const type_orm_currency_repository_1 = require("./repository/type-orm-currency.repository");
const mikro_orm_currency_repository_1 = require("./repository/mikro-orm-currency.repository");
const currency_entity_1 = require("./currency.entity");
let CurrencyService = exports.CurrencyService = class CurrencyService extends crud_service_1.CrudService {
    constructor(typeOrmCurrencyRepository, mikroOrmCurrencyRepository) {
        super(typeOrmCurrencyRepository, mikroOrmCurrencyRepository);
    }
};
exports.CurrencyService = CurrencyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(currency_entity_1.Currency)),
    __metadata("design:paramtypes", [type_orm_currency_repository_1.TypeOrmCurrencyRepository,
        mikro_orm_currency_repository_1.MikroOrmCurrencyRepository])
], CurrencyService);
//# sourceMappingURL=currency.service.js.map