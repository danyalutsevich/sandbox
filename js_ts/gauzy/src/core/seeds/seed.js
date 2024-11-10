"use strict";
// Modified code from https://github.com/alexitaylor/angular-graphql-nestjs-postgres-starter-kit.
// MIT License, see https://github.com/alexitaylor/angular-graphql-nestjs-postgres-starter-kit/blob/master/LICENSE
// Copyright (c) 2019 Alexi Taylor
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDefault = void 0;
const core_1 = require("@nestjs/core");
const bootstrap_1 = require("../../bootstrap");
const seed_data_service_1 = require("./seed-data.service");
const seeder_module_1 = require("./seeder.module");
/**
* WARNING: Running this file will DELETE all data in your database
* and generate and insert new, system default minimal data into your database.
*
* BE CAREFUL running this file in production env. It's possible to delete all production data.
* SeedData checks if environment is in production or not by checking src/environments/environment.ts file configs.
* If environment.production config is set to true, then the seeding process will only generate default roles and 2 default users.
*
*/
async function seedDefault(devConfig) {
    await (0, bootstrap_1.registerPluginConfig)(devConfig);
    core_1.NestFactory.createApplicationContext(seeder_module_1.SeederModule.forPlugins(), {
        logger: ['log', 'error', 'warn', 'debug', 'verbose']
    }).then((app) => {
        const seeder = app.get(seed_data_service_1.SeedDataService);
        seeder
            .runDefaultSeed(false)
            .then(() => { })
            .catch((error) => {
            throw error;
        })
            .finally(() => app.close());
    }).catch((error) => {
        throw error;
    });
}
exports.seedDefault = seedDefault;
//# sourceMappingURL=seed.js.map