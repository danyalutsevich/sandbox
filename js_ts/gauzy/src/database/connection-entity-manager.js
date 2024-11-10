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
exports.ConnectionEntityManager = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ConnectionEntityManager = exports.ConnectionEntityManager = class ConnectionEntityManager {
    entityManager;
    constructor(entityManager) {
        this.entityManager = entityManager;
    }
    /**
     * Retrieves the raw EntityManager instance.
     *
     * @returns The raw EntityManager instance.
     */
    get rawEntityManager() {
        return this.entityManager;
    }
    /**
     * Retrieves the raw connection from the EntityManager.
     *
     * @returns The raw connection from the EntityManager.
     */
    get rawConnection() {
        return this.entityManager.connection;
    }
    /**
     * Returns a TypeORM repository based on the provided target.
     *
     * @param target The target entity type or entity schema for which to retrieve the repository.
     * @returns The TypeORM repository for the specified target entity.
     */
    getRepository(target) {
        return this.rawEntityManager.getRepository(target);
    }
};
exports.ConnectionEntityManager = ConnectionEntityManager = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], ConnectionEntityManager);
//# sourceMappingURL=connection-entity-manager.js.map