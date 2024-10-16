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
exports.IntegrationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crud_1 = require("../core/crud");
const integration_entity_1 = require("./integration.entity");
const type_orm_integration_repository_1 = require("./repository/type-orm-integration.repository");
const mikro_orm_integration_repository_1 = require("./repository/mikro-orm-integration.repository");
let IntegrationService = exports.IntegrationService = class IntegrationService extends crud_1.CrudService {
    constructor(typeOrmIntegrationRepository, mikroOrmIntegrationRepository) {
        super(typeOrmIntegrationRepository, mikroOrmIntegrationRepository);
    }
};
exports.IntegrationService = IntegrationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(integration_entity_1.Integration)),
    __metadata("design:paramtypes", [type_orm_integration_repository_1.TypeOrmIntegrationRepository,
        mikro_orm_integration_repository_1.MikroOrmIntegrationRepository])
], IntegrationService);
//# sourceMappingURL=integration.service.js.map