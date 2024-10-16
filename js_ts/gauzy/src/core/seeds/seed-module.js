"use strict";
// Modified code from https://github.com/alexitaylor/angular-graphql-nestjs-postgres-starter-kit.
// MIT License, see https://github.com/alexitaylor/angular-graphql-nestjs-postgres-starter-kit/blob/master/LICENSE
// Copyright (c) 2019 Alexi Taylor
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedModule = void 0;
const yargs_1 = __importDefault(require("yargs"));
const chalk_1 = __importDefault(require("chalk"));
const core_1 = require("@nestjs/core");
const bootstrap_1 = require("./../../bootstrap");
const seed_data_service_1 = require("./seed-data.service");
const seeder_module_1 = require("./seeder.module");
/**
* Usage:
* yarn seed:module All
* yarn seed:module Default
* yarn seed:module Jobs
* yarn seed:module Reports
* yarn seed:module Ever
*
*/
async function seedModule(devConfig) {
    await (0, bootstrap_1.registerPluginConfig)(devConfig);
    core_1.NestFactory.createApplicationContext(seeder_module_1.SeederModule.forPlugins(), {
        logger: ['log', 'error', 'warn', 'debug', 'verbose']
    }).then((app) => {
        const seeder = app.get(seed_data_service_1.SeedDataService);
        const argv = (0, yargs_1.default)(process.argv).argv;
        const module = argv.name;
        const methodName = `run${module}Seed`;
        if (seeder[methodName]) {
            seeder[methodName]()
                .catch((error) => {
                throw error;
            })
                .finally(() => app.close());
        }
        else {
            console.log(chalk_1.default.red(`Method ${methodName} not found in SeedDataService`));
            app.close();
        }
    }).catch((error) => {
        throw error;
    });
}
exports.seedModule = seedModule;
//# sourceMappingURL=seed-module.js.map