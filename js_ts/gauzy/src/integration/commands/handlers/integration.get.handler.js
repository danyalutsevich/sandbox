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
exports.IntegrationGetHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const integration_get_command_1 = require("./../integration.get.command");
const integration_entity_1 = require("../../integration.entity");
const database_helper_1 = require("./../../../database/database.helper");
const type_orm_integration_repository_1 = require("../../repository/type-orm-integration.repository");
let IntegrationGetHandler = exports.IntegrationGetHandler = class IntegrationGetHandler {
    typeOrmIntegrationRepository;
    constructor(typeOrmIntegrationRepository) {
        this.typeOrmIntegrationRepository = typeOrmIntegrationRepository;
    }
    /**
     *
     * @param command
     * @returns
     */
    async execute(command) {
        const { input } = command;
        const { integrationTypeId, searchQuery, filter } = input;
        const query = this.typeOrmIntegrationRepository.createQueryBuilder('integration');
        query.leftJoinAndSelect('integration.integrationTypes', 'integrationTypes');
        query.where((0, database_helper_1.prepareSQLQuery)('"integrationTypes"."id" = :id'), { id: integrationTypeId });
        query.andWhere(`LOWER(${query.alias}.name) LIKE :name`, { name: `${searchQuery.toLowerCase()}%` });
        if (filter === 'true' || filter === 'false') {
            query.andWhere(`${query.alias}.isPaid = :isPaid`, { isPaid: filter === 'true' });
        }
        return await query.orderBy(`${query.alias}.order`, 'ASC').getMany();
    }
};
exports.IntegrationGetHandler = IntegrationGetHandler = __decorate([
    (0, cqrs_1.CommandHandler)(integration_get_command_1.IntegrationGetCommand),
    __param(0, (0, typeorm_1.InjectRepository)(integration_entity_1.Integration)),
    __metadata("design:paramtypes", [type_orm_integration_repository_1.TypeOrmIntegrationRepository])
], IntegrationGetHandler);
//# sourceMappingURL=integration.get.handler.js.map