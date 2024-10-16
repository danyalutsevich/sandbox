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
exports.IntegrationTypeGetHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const integration_type_get_command_1 = require("../integration-type.get.command");
const integration_type_entity_1 = require("../../integration-type.entity");
const type_orm_integration_type_repository_1 = require("../../repository/type-orm-integration-type.repository");
let IntegrationTypeGetHandler = exports.IntegrationTypeGetHandler = class IntegrationTypeGetHandler {
    typeOrmIntegrationTypeRepository;
    constructor(typeOrmIntegrationTypeRepository) {
        this.typeOrmIntegrationTypeRepository = typeOrmIntegrationTypeRepository;
    }
    /**
     *
     * @param command
     * @returns
     */
    async execute(command) {
        return await this.typeOrmIntegrationTypeRepository.find({
            order: {
                order: 'ASC'
            }
        });
    }
};
exports.IntegrationTypeGetHandler = IntegrationTypeGetHandler = __decorate([
    (0, cqrs_1.CommandHandler)(integration_type_get_command_1.IntegrationTypeGetCommand),
    __param(0, (0, typeorm_1.InjectRepository)(integration_type_entity_1.IntegrationType)),
    __metadata("design:paramtypes", [type_orm_integration_type_repository_1.TypeOrmIntegrationTypeRepository])
], IntegrationTypeGetHandler);
//# sourceMappingURL=integration-type.get.handler.js.map