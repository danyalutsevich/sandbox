"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthModule = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const cache_health_indicator_1 = require("./indicators/cache-health.indicator");
const redis_health_indicator_1 = require("./indicators/redis-health.indicator");
const health_controller_1 = require("./health.controller");
const database_module_1 = require("database/database.module");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const user_entity_1 = require("user/user.entity");
let HealthModule = exports.HealthModule = class HealthModule {
};
exports.HealthModule = HealthModule = __decorate([
    (0, common_1.Module)({
        controllers: [health_controller_1.HealthController],
        imports: [
            // We need to import the TypeOrmModule and MikroOrmModule here to use Repositories in Health Service
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            nestjs_1.MikroOrmModule.forFeature([user_entity_1.User]),
            database_module_1.DatabaseModule,
            terminus_1.TerminusModule.forRoot({
                logger: common_1.ConsoleLogger
                // https://docs.nestjs.com/recipes/terminus#graceful-shutdown-timeout
                // gracefulShutdownTimeoutMs: 1000
            })
        ],
        providers: [cache_health_indicator_1.CacheHealthIndicator, redis_health_indicator_1.RedisHealthIndicator]
    })
], HealthModule);
//# sourceMappingURL=health.module.js.map