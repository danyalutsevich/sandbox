"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LanguageModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const language_service_1 = require("./language.service");
const language_controller_1 = require("./language.controller");
const language_entity_1 = require("./language.entity");
let LanguageModule = exports.LanguageModule = LanguageModule_1 = class LanguageModule {
};
exports.LanguageModule = LanguageModule = LanguageModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                { path: '/languages', module: LanguageModule_1 }
            ]),
            typeorm_1.TypeOrmModule.forFeature([language_entity_1.Language]),
            nestjs_1.MikroOrmModule.forFeature([language_entity_1.Language]),
        ],
        controllers: [language_controller_1.LanguageController],
        providers: [language_service_1.LanguageService],
        exports: [language_service_1.LanguageService]
    })
], LanguageModule);
//# sourceMappingURL=language.module.js.map