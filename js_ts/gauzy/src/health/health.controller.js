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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const index_1 = require("../../plugins/common/dist/index");
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const cache_health_indicator_1 = require("./indicators/cache-health.indicator");
const redis_health_indicator_1 = require("./indicators/redis-health.indicator");
const uuid_1 = require("uuid");
const path = __importStar(require("path"));
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const utils_1 = require("core/utils");
const user_entity_1 = require("user/user.entity");
const type_orm_user_repository_1 = require("user/repository/type-orm-user.repository");
const mikro_orm_user_repository_1 = require("user/repository/mikro-orm-user.repository");
let HealthController = exports.HealthController = class HealthController {
    dataSource;
    health;
    typeOrmHealthIndicator;
    mikroOrmHealthIndicator;
    disk;
    cacheHealthIndicator;
    redisHealthIndicator;
    typeOrmUserRepository;
    mikroOrmUserRepository;
    constructor(dataSource, health, typeOrmHealthIndicator, mikroOrmHealthIndicator, disk, cacheHealthIndicator, redisHealthIndicator, typeOrmUserRepository, mikroOrmUserRepository) {
        this.dataSource = dataSource;
        this.health = health;
        this.typeOrmHealthIndicator = typeOrmHealthIndicator;
        this.mikroOrmHealthIndicator = mikroOrmHealthIndicator;
        this.disk = disk;
        this.cacheHealthIndicator = cacheHealthIndicator;
        this.redisHealthIndicator = redisHealthIndicator;
        this.typeOrmUserRepository = typeOrmUserRepository;
        this.mikroOrmUserRepository = mikroOrmUserRepository;
        this.ormType = (0, utils_1.getORMType)();
    }
    ormType;
    checkDb = true;
    checkStorage = true;
    checkCache = true;
    checkRedis = true;
    // Note: we disable by default because we notice some connection
    // related issues with Terminus DB checks (in MikroORM)
    checkDbWithTerminus = false;
    async check() {
        const uniqueLabel = `HealthCheckExecutionTimer-${(0, uuid_1.v4)()}`;
        console.log('Health check started: ', uniqueLabel);
        console.time(uniqueLabel);
        const checks = [];
        if (this.checkDb) {
            checks.push(async () => {
                console.log(`Checking ${uniqueLabel} Database...`);
                switch (this.ormType) {
                    case utils_1.MultiORMEnum.TypeORM:
                        let queryRunner;
                        try {
                            let message;
                            if (this.checkDbWithTerminus) {
                                queryRunner = this.dataSource.createQueryRunner();
                                const resDatabase = await this.typeOrmHealthIndicator.pingCheck('database', {
                                    connection: queryRunner.connection,
                                    timeout: 60000
                                });
                                message = resDatabase?.database?.message;
                            }
                            const usersCount = await this.typeOrmUserRepository.count();
                            console.log(`Database (TypeORM) users count ${uniqueLabel} is: ${usersCount}`);
                            console.log(`Database (TypeORM) check ${uniqueLabel} completed`);
                            return {
                                database: {
                                    status: 'up',
                                    message: message
                                }
                            };
                        }
                        catch (err) {
                            console.error(`Database (TypeORM) check ${uniqueLabel} failed`, err);
                            return {
                                database: {
                                    status: 'down',
                                    message: err.message
                                }
                            };
                        }
                        finally {
                            if (this.checkDbWithTerminus && queryRunner)
                                await queryRunner.release();
                        }
                    case utils_1.MultiORMEnum.MikroORM:
                        try {
                            let message;
                            if (this.checkDbWithTerminus) {
                                const resDatabase = await this.mikroOrmHealthIndicator.pingCheck('database', {
                                    timeout: 60000
                                });
                                message = resDatabase?.database?.message;
                            }
                            const usersCount = await this.mikroOrmUserRepository.count();
                            console.log(`Database (MikroORM) users count ${uniqueLabel} is: ${usersCount}`);
                            console.log(`Database (MikroORM) check ${uniqueLabel} completed`);
                            return {
                                database: {
                                    status: 'up',
                                    message: message
                                }
                            };
                        }
                        catch (err) {
                            console.error(`Database (MikroORM) check ${uniqueLabel} failed`, err);
                            return {
                                database: {
                                    status: 'down',
                                    message: err.message
                                }
                            };
                        }
                    default:
                        throw new Error('ORM not supported');
                }
            });
        }
        if (this.checkStorage) {
            checks.push(async () => {
                console.log(`Checking ${uniqueLabel} Storage...`);
                try {
                    const currentPath = path.resolve(__dirname);
                    console.log(`Checking ${uniqueLabel} Storage at path: ${currentPath}`);
                    const resStorage = await this.disk.checkStorage('storage', {
                        path: currentPath,
                        // basically will fail if disk is full
                        thresholdPercent: 99.999999
                    });
                    console.log(`Storage check ${uniqueLabel} completed`);
                    return resStorage;
                }
                catch (err) {
                    console.error(`Storage check ${uniqueLabel} failed`, err);
                    return {
                        disk: {
                            status: 'down',
                            message: err.message
                        }
                    };
                }
            });
        }
        if (this.checkCache) {
            checks.push(async () => {
                console.log(`Checking ${uniqueLabel} Cache...`);
                const resCache = await this.cacheHealthIndicator.isHealthy('cache');
                console.log(`Cache check ${uniqueLabel} completed`);
                return resCache;
            });
        }
        if (this.checkRedis) {
            if (process.env.REDIS_ENABLED === 'true') {
                checks.push(async () => {
                    console.log(`Checking ${uniqueLabel} Redis...`);
                    const resRedis = await this.redisHealthIndicator.isHealthy('redis');
                    console.log(`Redis check ${uniqueLabel} completed`);
                    return resRedis;
                });
            }
        }
        const result = await this.health.check(checks);
        console.timeEnd(uniqueLabel);
        console.log(`Health check ${uniqueLabel} result: ${JSON.stringify(result)}`);
        return result;
    }
};
__decorate([
    (0, index_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "check", null);
exports.HealthController = HealthController = __decorate([
    (0, common_1.Controller)('health'),
    __param(0, (0, typeorm_2.InjectDataSource)()),
    __param(7, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        terminus_1.HealthCheckService,
        terminus_1.TypeOrmHealthIndicator,
        terminus_1.MikroOrmHealthIndicator,
        terminus_1.DiskHealthIndicator,
        cache_health_indicator_1.CacheHealthIndicator,
        redis_health_indicator_1.RedisHealthIndicator, typeof (_a = typeof type_orm_user_repository_1.TypeOrmUserRepository !== "undefined" && type_orm_user_repository_1.TypeOrmUserRepository) === "function" ? _a : Object, typeof (_b = typeof mikro_orm_user_repository_1.MikroOrmUserRepository !== "undefined" && mikro_orm_user_repository_1.MikroOrmUserRepository) === "function" ? _b : Object])
], HealthController);
//# sourceMappingURL=health.controller.js.map