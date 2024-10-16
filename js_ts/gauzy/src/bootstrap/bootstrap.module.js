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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootstrapModule = void 0;
const common_1 = require("@nestjs/common");
const index_1 = require("../../plugins/config/dist/index");
const index_2 = require("../../plugins/plugin/dist/index");
const app_module_1 = require("./../app.module");
const logger_1 = require("../logger");
let BootstrapModule = exports.BootstrapModule = class BootstrapModule {
    constructor() { }
    /**
     *
     * @param consumer
     */
    configure(consumer) {
        consumer.apply().forRoutes('*');
    }
    /**
     *
     * @param signal
     */
    async onApplicationShutdown(signal) {
        if (signal) {
            logger_1.Logger.log(`Received shutdown signal: ${signal}`);
            if (process.env.OTEL_ENABLED === 'true') {
                try {
                    // Dynamically import the tracer module. We need it because otherwise tracer can initialize at different times etc
                    const { default: tracer } = await import('./tracer.js');
                    if (tracer) {
                        await tracer.shutdown();
                    }
                }
                catch (error) {
                    console.error('Error terminating tracing', error);
                }
            }
            if (signal === 'SIGTERM') {
                logger_1.Logger.log('SIGTERM shutting down. Please wait...');
            }
        }
    }
};
exports.BootstrapModule = BootstrapModule = __decorate([
    (0, common_1.Module)({
        imports: [index_1.ConfigModule, logger_1.LoggerModule.forRoot(), index_2.PluginModule.init(), app_module_1.AppModule]
    }),
    __metadata("design:paramtypes", [])
], BootstrapModule);
//# sourceMappingURL=bootstrap.module.js.map