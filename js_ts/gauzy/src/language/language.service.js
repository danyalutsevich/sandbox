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
exports.LanguageService = void 0;
const language_entity_1 = require("./language.entity");
const core_1 = require("../core");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const repository_1 = require("./repository");
let LanguageService = exports.LanguageService = class LanguageService extends core_1.CrudService {
    constructor(typeOrmLanguageRepository, mikroOrmLanguageRepository) {
        super(typeOrmLanguageRepository, mikroOrmLanguageRepository);
    }
    /**
     * Finds a single Language entity by its name.
     *
     * @param name The name of the Language entity to be found.
     * @returns A promise that resolves to the Language entity if found, or null if not found.
     */
    findOneByName(name) {
        return super.findOneByOptions({
            where: { name }
        });
    }
};
exports.LanguageService = LanguageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(language_entity_1.Language)),
    __metadata("design:paramtypes", [repository_1.TypeOrmLanguageRepository,
        repository_1.MikroOrmLanguageRepository])
], LanguageService);
//# sourceMappingURL=language.service.js.map