var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import provider from './admin/auth-provider.js';
import options from './admin/options.js';
import * as Entities from './db/entities/index.js';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            ConfigModule.forRoot({
                envFilePath: '.env',
            }),
            TypeOrmModule.forRoot({
                type: 'postgres',
                host: '127.0.0.1',
                port: 5432,
                database: 'admin',
                username: 'postgres',
                password: 'root',
                synchronize: true,
                logging: true,
                entities: Object.values(Entities),
            }),
            AdminModule.createAdminAsync({
                useFactory: async () => {
                    return {
                        adminJsOptions: options,
                        auth: {
                            provider,
                            cookiePassword: process.env.COOKIE_SECRET,
                            cookieName: 'adminjs',
                        },
                        sessionOptions: {
                            resave: true,
                            saveUninitialized: true,
                            secret: process.env.COOKIE_SECRET,
                        },
                    };
                },
            }),
        ],
        controllers: [AppController],
        providers: [AppService],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map