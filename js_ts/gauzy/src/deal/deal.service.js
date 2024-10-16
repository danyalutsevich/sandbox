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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealService = void 0;
const common_1 = require("@nestjs/common");
const crud_1 = require("./../core/crud");
const type_orm_deal_repository_1 = require("./repository/type-orm-deal.repository");
const mikro_orm_deal_repository_1 = require("./repository/mikro-orm-deal.repository");
let DealService = exports.DealService = class DealService extends crud_1.TenantAwareCrudService {
    typeOrmDealRepository;
    mikroOrmDealRepository;
    constructor(typeOrmDealRepository, mikroOrmDealRepository) {
        super(typeOrmDealRepository, mikroOrmDealRepository);
        this.typeOrmDealRepository = typeOrmDealRepository;
        this.mikroOrmDealRepository = mikroOrmDealRepository;
    }
};
exports.DealService = DealService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [type_orm_deal_repository_1.TypeOrmDealRepository,
        mikro_orm_deal_repository_1.MikroOrmDealRepository])
], DealService);
//# sourceMappingURL=deal.service.js.map