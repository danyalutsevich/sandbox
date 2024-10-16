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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
const index_1 = require("../../plugins/config/dist/index");
const income_entity_1 = require("./income.entity");
const crud_1 = require("./../core/crud");
const mikro_orm_income_repository_1 = require("./repository/mikro-orm-income.repository");
const type_orm_income_repository_1 = require("./repository/type-orm-income.repository");
let IncomeService = exports.IncomeService = class IncomeService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmIncomeRepository, mikroOrmIncomeRepository) {
        super(typeOrmIncomeRepository, mikroOrmIncomeRepository);
    }
    async findAllIncomes(filter, filterDate) {
        if (filterDate) {
            const startOfMonth = (0, moment_1.default)((0, moment_1.default)(filterDate).startOf('month').format('YYYY-MM-DD hh:mm:ss')).toDate();
            const endOfMonth = (0, moment_1.default)((0, moment_1.default)(filterDate).endOf('month').format('YYYY-MM-DD hh:mm:ss')).toDate();
            return filter
                ? await this.findAll({
                    where: {
                        valueDate: (0, typeorm_2.Between)(startOfMonth, endOfMonth),
                        ...filter.where
                    },
                    relations: filter.relations
                })
                : await this.findAll({
                    where: {
                        valueDate: (0, typeorm_2.Between)(startOfMonth, endOfMonth)
                    }
                });
        }
        return await this.findAll(filter || {});
    }
    countStatistic(data) {
        return data.filter(Number).reduce((a, b) => a + b, 0) !== 0
            ? data.filter(Number).reduce((a, b) => a + b, 0) / data.filter(Number).length
            : 0;
    }
    pagination(filter) {
        if ('where' in filter) {
            const { where } = filter;
            const likeOperator = (0, index_1.isPostgres)() ? 'ILIKE' : 'LIKE';
            if ('notes' in where) {
                filter['where']['notes'] = (0, typeorm_2.Raw)((alias) => `${alias} ${likeOperator} '%${where.notes}%'`);
            }
            if ('valueDate' in where) {
                const { valueDate } = where;
                const { startDate, endDate } = valueDate;
                if (startDate && endDate) {
                    filter['where']['valueDate'] = (0, typeorm_2.Between)(moment_1.default.utc(startDate).format('YYYY-MM-DD HH:mm:ss'), moment_1.default.utc(endDate).format('YYYY-MM-DD HH:mm:ss'));
                }
                else {
                    filter['where']['valueDate'] = (0, typeorm_2.Between)((0, moment_1.default)().startOf('month').utc().format('YYYY-MM-DD HH:mm:ss'), (0, moment_1.default)().endOf('month').utc().format('YYYY-MM-DD HH:mm:ss'));
                }
            }
            if ('tags' in where) {
                const { tags } = where;
                filter['where']['tags'] = {
                    id: (0, typeorm_2.In)(tags)
                };
            }
        }
        return super.paginate(filter);
    }
};
exports.IncomeService = IncomeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(income_entity_1.Income)),
    __metadata("design:paramtypes", [type_orm_income_repository_1.TypeOrmIncomeRepository,
        mikro_orm_income_repository_1.MikroOrmIncomeRepository])
], IncomeService);
//# sourceMappingURL=income.service.js.map