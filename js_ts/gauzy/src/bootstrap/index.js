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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMigrationsSetting = exports.preBootstrapApplicationConfig = exports.registerPluginConfig = exports.bootstrap = exports.startTracing = void 0;
const v8 = __importStar(require("v8"));
function logMemoryLimit() {
    const heapStats = v8.getHeapStatistics();
    const heapSizeLimit = heapStats.heap_size_limit;
    console.log(`Heap size limit: ${heapSizeLimit / 1024 / 1024} MB`);
}
logMemoryLimit();
// Note: below code can't be moved to other places because it has to be executed first, before we load any other modules!
const tracer_1 = __importDefault(require("./tracer"));
/**
 * Start tracing using if OTEL is enabled.
 */
function startTracing() {
    if (process.env.OTEL_ENABLED === 'true' && tracer_1.default) {
        // Start tracing
        tracer_1.default.start();
        console.log('OTEL Tracing started');
    }
    else {
        console.log('OTEL Tracing not enabled');
    }
}
exports.startTracing = startTracing;
startTracing(); // Start tracing if OTEL is enabled.
// import * as csurf from 'csurf';
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const class_validator_1 = require("class-validator");
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const redis_1 = require("redis");
const helmet_1 = __importDefault(require("helmet"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = require("path");
const express_1 = require("express");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/config/dist/index");
const index_2 = require("../../plugins/plugin/dist/index");
const entities_1 = require("../core/entities");
const subscribers_1 = require("../core/entities/subscribers");
const guards_1 = require("../shared/guards");
const shared_module_1 = require("../shared/shared.module");
const custom_entity_fields_1 = require("../core/entities/custom-entity-fields");
const app_service_1 = require("../app.service");
const app_module_1 = require("../app.module");
/**
 * Bootstrap the NestJS application, configuring various settings and initializing the server.
 *
 * @param pluginConfig - Optional plugin configuration.
 * @returns A promise that resolves to the initialized NestJS application.
 */
async function bootstrap(pluginConfig) {
    console.time('Application Bootstrap Time'); // Timing the bootstrap process
    // Pre-bootstrap the application configuration
    const config = await preBootstrapApplicationConfig(pluginConfig);
    // Import the BootstrapModule dynamically
    const { BootstrapModule } = await import('./bootstrap.module.js');
    // Create the NestJS application
    const app = await core_1.NestFactory.create(BootstrapModule, {
        logger: ['log', 'error', 'warn', 'debug', 'verbose'],
        bufferLogs: true // Buffer logs to avoid loss during startup
    });
    // Register custom entity fields for Mikro ORM
    await (0, custom_entity_fields_1.registerMikroOrmCustomFields)(config);
    // Enable Express behind proxies (https://expressjs.com/en/guide/behind-proxies.html)
    app.set('trust proxy', true);
    // Starts listening for shutdown hooks
    app.enableShutdownHooks();
    // This will lock all routes and make them accessible by authenticated users only.
    const reflector = app.get(core_1.Reflector);
    app.useGlobalGuards(new guards_1.AuthGuard(reflector));
    // Configure Sentry for error tracking, if applicable
    const { sentry } = index_1.environment;
    if (sentry && sentry.dsn && config.logger) {
        app.useLogger(config.logger); // Use Sentry logger
    }
    else {
        // Handle uncaught exceptions and unhandled rejections
        process.on('uncaughtException', handleUncaughtException);
        process.on('unhandledRejection', handleUnhandledRejection);
    }
    // Set JSON and URL-encoded body parsers with a size limit
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '50mb' }));
    // Enable CORS with specific settings
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
        allowedHeaders: 'Authorization, Language, Tenant-Id, Organization-Id, X-Requested-With, X-Auth-Token, X-HTTP-Method-Override, Content-Type, Content-Language, Accept, Accept-Language, Observe'
    });
    // TODO: enable csurf is not good idea because it was deprecated.
    // Maybe review https://github.com/Psifi-Solutions/csrf-csrf as alternative?
    // As explained on the csurf middleware page https://github.com/expressjs/csurf#csurf,
    // the csurf module requires either a session middleware or cookie-parser to be initialized first.
    // app.use(csurf());
    // We use sessions for Passport Auth
    // For production we use RedisStore
    // https://github.com/tj/connect-redis
    // Manage sessions with Redis or in-memory fallback
    let redisWorked = false;
    console.log('REDIS_ENABLED: ', process.env.REDIS_ENABLED);
    if (process.env.REDIS_ENABLED === 'true') {
        try {
            const url = process.env.REDIS_URL ||
                (process.env.REDIS_TLS === 'true'
                    ? `rediss://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
                    : `redis://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
            console.log('REDIS_URL: ', url);
            let host, port, username, password;
            const isTls = url.startsWith('rediss://');
            // Removing the protocol part
            let authPart = url.split('://')[1];
            // Check if the URL contains '@' (indicating the presence of username/password)
            if (authPart.includes('@')) {
                // Splitting user:password and host:port
                let [userPass, hostPort] = authPart.split('@');
                [username, password] = userPass.split(':');
                [host, port] = hostPort.split(':');
            }
            else {
                // If there is no '@', it means there is no username/password
                [host, port] = authPart.split(':');
            }
            port = parseInt(port);
            const redisConnectionOptions = {
                url: url,
                username: username,
                password: password,
                isolationPoolOptions: {
                    min: 1,
                    max: 100
                },
                socket: {
                    tls: isTls,
                    host: host,
                    port: port,
                    passphrase: password,
                    rejectUnauthorized: process.env.NODE_ENV === 'production'
                },
                ttl: 60 * 60 * 24 * 7 // 1 week
            };
            const redisClient = (0, redis_1.createClient)(redisConnectionOptions)
                .on('error', (err) => {
                console.log('Redis Session Store Client Error: ', err);
            })
                .on('connect', () => {
                console.log('Redis Session Store Client Connected');
            })
                .on('ready', () => {
                console.log('Redis Session Store Client Ready');
            })
                .on('reconnecting', () => {
                console.log('Redis Session Store Client Reconnecting');
            })
                .on('end', () => {
                console.log('Redis Session Store Client End');
            });
            // connecting to Redis
            await redisClient.connect();
            // ping Redis
            const res = await redisClient.ping();
            console.log('Redis Session Store Client Sessions Ping: ', res);
            const redisStore = new connect_redis_1.default({
                client: redisClient,
                prefix: index_1.environment.production ? 'gauzyprodsess:' : 'gauzydevsess:'
            });
            app.use((0, express_session_1.default)({
                store: redisStore,
                secret: index_1.environment.EXPRESS_SESSION_SECRET,
                resave: false,
                saveUninitialized: true
                // cookie: { secure: true } // TODO
            }));
            redisWorked = true;
        }
        catch (error) {
            console.error(error);
        }
    }
    if (!redisWorked) {
        app.use(
        // this runs in memory, so we lose sessions on restart of server/pod
        (0, express_session_1.default)({
            secret: index_1.environment.EXPRESS_SESSION_SECRET,
            resave: true,
            saveUninitialized: true
            // cookie: { secure: true } // TODO
        }));
    }
    // let's use helmet for security in production
    if (index_1.environment.envName === 'prod') {
        app.use((0, helmet_1.default)());
    }
    // Set the global prefix for routes
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const service = app.select(app_module_1.AppModule).get(app_service_1.AppService);
    await service.seedDBIfEmpty();
    /**
     * Dependency injection with class-validator
     */
    (0, class_validator_1.useContainer)(app.select(shared_module_1.SharedModule), { fallbackOnErrors: true });
    // Start the server
    const { port = 3000, host = '0.0.0.0' } = config.apiConfigOptions;
    console.log(chalk_1.default.green(`Configured Host: ${host}`));
    console.log(chalk_1.default.green(`Configured Port: ${port}`));
    // Configure Swagger for API documentation
    const options = new swagger_1.DocumentBuilder().setTitle('Gauzy API').setVersion('1.0').addBearerAuth().build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('swg', app, document);
    console.log(chalk_1.default.green(`Swagger UI available at http://${host}:${port}/swg`));
    // Configure Atlassian Connect Express
    // const addon = ac(express());
    // app.use(addon.middleware());
    await app.listen(port, host, () => {
        console.timeEnd('Application Bootstrap Time'); // End timing
        // Note: do not change this prefix because we may use it to detect the success message from the running server!
        const successMessagePrefix = 'Listening at http';
        const message = `${successMessagePrefix}://${host}:${port}/${globalPrefix}`;
        console.log(chalk_1.default.magenta(message));
        // Send message to parent process (desktop app)
        if (process.send) {
            process.send(message);
        }
        if (index_1.environment.demo) {
            service.executeDemoSeed(); // Seed demo data if in demo mode
        }
    });
    return app;
}
exports.bootstrap = bootstrap;
/**
 * Handles uncaught exceptions.
 * @param error - The uncaught exception.
 */
function handleUncaughtException(error) {
    console.error('Uncaught Exception Handler in Bootstrap:', error);
    setTimeout(() => {
        process.exit(1);
    }, 3000);
}
/**
 * Handles unhandled rejections.
 * @param reason - The reason for the unhandled rejection.
 * @param promise - The rejected promise.
 */
function handleUnhandledRejection(reason, promise) {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
}
/**
 * Registers a plugin configuration, applying pre-bootstrap operations to ensure it's ready for use.
 *
 * @param config - The partial application configuration to be pre-bootstrapped.
 * @returns A promise that resolves to the pre-bootstrapped application configuration.
 */
async function registerPluginConfig(config) {
    // Apply pre-bootstrap operations and return the updated configuration
    return await preBootstrapApplicationConfig(config);
}
exports.registerPluginConfig = registerPluginConfig;
/**
 * Prepares the application configuration before initializing plugins.
 * Configures migration settings, registers entities and subscribers,
 * and applies additional plugin configurations.
 *
 * @param applicationConfig - The initial application configuration.
 * @returns A promise that resolves to the final application configuration after pre-bootstrap operations.
 */
async function preBootstrapApplicationConfig(applicationConfig) {
    if (Object.keys(applicationConfig).length > 0) {
        // Set initial configuration if any properties are provided
        (0, index_1.setConfig)(applicationConfig);
    }
    // Configure migration settings
    (0, index_1.setConfig)({
        dbConnectionOptions: {
            ...getMigrationsSetting()
        }
    });
    // Log the current database configuration (for debugging or informational purposes)
    console.log(chalk_1.default.green(`DB Config: ${JSON.stringify((0, index_1.getConfig)().dbConnectionOptions)}`));
    // Register core and plugin entities and subscribers
    const entities = await preBootstrapRegisterEntities(applicationConfig);
    const subscribers = await preBootstrapRegisterSubscribers(applicationConfig);
    // Update configuration with registered entities and subscribers
    (0, index_1.setConfig)({
        dbConnectionOptions: {
            entities: entities,
            subscribers: subscribers // Core and plugin subscribers
        },
        dbMikroOrmConnectionOptions: {
            entities: entities,
            subscribers: subscribers // MikroORM subscribers
        }
    });
    // Apply additional plugin configurations
    const config = await preBootstrapPluginConfigurations((0, index_1.getConfig)());
    // Register custom entity fields for Type ORM
    await (0, custom_entity_fields_1.registerTypeOrmCustomFields)(config);
    // Return the final configuration after all pre-bootstrap operations
    return config;
}
exports.preBootstrapApplicationConfig = preBootstrapApplicationConfig;
/**
 * Asynchronously applies configurations from plugin configuration functions
 * to the given application configuration, in parallel.
 *
 * @param config - The initial application configuration to be modified.
 * @returns A promise that resolves to the updated application configuration.
 */
async function preBootstrapPluginConfigurations(config) {
    // Retrieve a list of plugin configuration functions based on the provided config
    const pluginConfigurations = (0, index_2.getPluginConfigurations)(config.plugins);
    // Iterate over each plugin configuration function
    for await (const pluginConfigurationFn of pluginConfigurations) {
        // Check if the item is a function, and apply it to the current configuration
        if (typeof pluginConfigurationFn === 'function') {
            // Update the config by applying the function and awaiting its result
            config = await pluginConfigurationFn(config);
        }
    }
    // Return the modified configuration
    return config;
}
/**
 * Register entities from core and plugin configurations.
 * Ensures no conflicts between core entities and plugin entities.
 *
 * @param config - Plugin configuration containing plugin entities.
 * @returns A promise that resolves to an array of registered entity types.
 */
async function preBootstrapRegisterEntities(config) {
    try {
        // Retrieve the list of core entities
        const coreEntitiesList = entities_1.coreEntities;
        // Get the list of entities from the plugin configuration
        const pluginEntitiesList = (0, index_2.getEntitiesFromPlugins)(config.plugins);
        // Check for conflicts and register plugin entities
        for (const pluginEntity of pluginEntitiesList) {
            const entityName = pluginEntity.name;
            // If a core entity has the same name as a plugin entity, throw a conflict exception
            if (coreEntitiesList.some((entity) => entity.name === entityName)) {
                throw new common_1.ConflictException({
                    message: `Error: ${entityName} conflicts with default entities.`
                });
            }
            // If no conflict, add the plugin entity to the core entity list
            coreEntitiesList.push(pluginEntity);
        }
        // Return the updated list of registered entities
        return coreEntitiesList;
    }
    catch (error) {
        // Log any errors and re-throw for further handling
        console.error('Error registering entities:', error);
        throw error;
    }
}
/**
 * Registers subscriber entities from core and plugin configurations, ensuring no conflicts.
 *
 * @param config - The application configuration that might contain plugin subscribers.
 * @returns A promise that resolves to an array of registered subscriber entity types.
 */
async function preBootstrapRegisterSubscribers(config) {
    try {
        // List of core subscribers
        const subscribers = subscribers_1.coreSubscribers;
        // Get plugin subscribers from the application configuration
        const pluginSubscribersList = (0, index_2.getSubscribersFromPlugins)(config.plugins);
        // Check for conflicts and add new plugin subscribers
        for (const pluginSubscriber of pluginSubscribersList) {
            const subscriberName = pluginSubscriber.name;
            // Check for name conflicts with core subscribers
            if (subscribers.some((subscriber) => subscriber.name === subscriberName)) {
                // Throw an exception if there's a conflict
                throw new common_1.ConflictException({
                    message: `Error: ${subscriberName} conflicts with default subscribers.`
                });
            }
            else {
                // Add the new plugin subscriber to the list if no conflict
                subscribers.push(pluginSubscriber);
            }
        }
        // Return the updated list of subscribers
        return subscribers;
    }
    catch (error) {
        // Handle errors and log to console
        console.error('Error registering subscribers:', error.message);
    }
}
/**
 * Gets the migrations directory and CLI migration paths.
 *
 * @returns An object containing paths for migrations and CLI migrations directory.
 */
function getMigrationsSetting() {
    // Log the current directory for debugging purposes (consider removing in production)
    console.log(`Reporting __dirname: ${__dirname}`);
    // Define the path for migration files, allowing for both TypeScript (.ts) and JavaScript (.js) files
    const migrationsPath = (0, path_1.join)(__dirname, '../database/migrations/*{.ts,.js}');
    // Define the directory for CLI migrations, typically where new migration files are created
    const cliMigrationsDir = (0, path_1.join)(__dirname, '../../src/database/migrations');
    // Return the paths for migrations and CLI migration directory
    return {
        migrations: [migrationsPath],
        cli: {
            migrationsDir: cliMigrationsDir // Directory for CLI migrations
        }
    };
}
exports.getMigrationsSetting = getMigrationsSetting;
//# sourceMappingURL=index.js.map