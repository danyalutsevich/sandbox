"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var SeederModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const path = __importStar(require("path"));
const index_1 = require("../../../plugins/config/dist/index");
const index_2 = require("../../../plugins/plugin/dist/index");
const contracts_1 = require("../../../plugins/contracts");
const seed_data_service_1 = require("./seed-data.service");
const database_module_1 = require("./../../database/database.module");
/**
 * Import and provide seeder classes.
 *
 * @module
 */
let SeederModule = exports.SeederModule = SeederModule_1 = class SeederModule {
    /**
     * Creates a dynamic module configuration for SeederModule with plugin support.
     * @returns A dynamic module definition.
     */
    static forPlugins() {
        return {
            module: SeederModule_1,
            providers: [],
            imports: [
                database_module_1.DatabaseModule,
                nestjs_i18n_1.I18nModule.forRoot({
                    fallbackLanguage: contracts_1.LanguagesEnum.ENGLISH,
                    loaderOptions: {
                        path: path.resolve(__dirname, '../../i18n/'),
                        watch: !index_1.environment.production
                    },
                    resolvers: [new nestjs_i18n_1.HeaderResolver(['language'])]
                }),
                ...(0, index_2.getDynamicPluginsModules)(),
            ],
            exports: []
        };
    }
};
exports.SeederModule = SeederModule = SeederModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [index_1.ConfigModule],
        providers: [seed_data_service_1.SeedDataService],
        exports: [seed_data_service_1.SeedDataService]
    })
], SeederModule);
//# sourceMappingURL=seeder.module.js.map