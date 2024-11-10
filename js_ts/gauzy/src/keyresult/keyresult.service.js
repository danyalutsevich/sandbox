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
exports.KeyResultService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const keyresult_entity_1 = require("./keyresult.entity");
const crud_1 = require("./../core/crud");
const type_orm_keyresult_repository_1 = require("./repository/type-orm-keyresult.repository");
const mikro_orm_keyresult_repository_1 = require("./repository/mikro-orm-keyresult.repository");
let KeyResultService = exports.KeyResultService = class KeyResultService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmKeyResultRepository, mikroOrmKeyResultRepository) {
        super(typeOrmKeyResultRepository, mikroOrmKeyResultRepository);
    }
    /**
     *
     * @param input
     * @returns
     */
    async createBulk(input) {
        return await this.typeOrmRepository.save(input);
    }
};
exports.KeyResultService = KeyResultService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(keyresult_entity_1.KeyResult)),
    __metadata("design:paramtypes", [type_orm_keyresult_repository_1.TypeOrmKeyResultRepository,
        mikro_orm_keyresult_repository_1.MikroOrmKeyResultRepository])
], KeyResultService);
//# sourceMappingURL=keyresult.service.js.map