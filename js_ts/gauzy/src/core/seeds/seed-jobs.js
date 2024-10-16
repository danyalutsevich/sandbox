"use strict";
// Modified code from https://github.com/alexitaylor/angular-graphql-nestjs-postgres-starter-kit.
// MIT License, see https://github.com/alexitaylor/angular-graphql-nestjs-postgres-starter-kit/blob/master/LICENSE
// Copyright (c) 2019 Alexi Taylor
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedJob = void 0;
const core_1 = require("@nestjs/core");
const bootstrap_1 = require("./../../bootstrap");
const seed_data_service_1 = require("./seed-data.service");
const seeder_module_1 = require("./seeder.module");
/**
* WARNING: Running this file will generate and insert new, random jobs related data into your database.
*
*/
async function seedJob(devConfig) {
    await (0, bootstrap_1.registerPluginConfig)(devConfig);
    core_1.NestFactory.createApplicationContext(seeder_module_1.SeederModule.forPlugins(), {
        logger: ['log', 'error', 'warn', 'debug', 'verbose']
    }).then((app) => {
        const seeder = app.get(seed_data_service_1.SeedDataService);
        seeder
            .runJobsSeed()
            .then(() => { })
            .catch((error) => {
            throw error;
        })
            .finally(() => app.close());
    }).catch((error) => {
        throw error;
    });
}
exports.seedJob = seedJob;
//# sourceMappingURL=seed-jobs.js.map