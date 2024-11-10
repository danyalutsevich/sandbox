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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const moment_1 = __importDefault(require("moment"));
const common_2 = require("../plugins/common");
let AppController = exports.AppController = class AppController {
    _configService;
    constructor(_configService) {
        this._configService = _configService;
    }
    /**
     * This is a controller method for handling the HTTP GET request to the root endpoint ('/').
     * It is decorated with @HttpCode, @Get, and @Public decorators.
     */
    async getAppStatus() {
        /**
         * Retrieve Application Name from Configuration Service
         *
         * This code snippet represents the retrieval of the application name from a configuration service.
         * It uses the `_configService` to get the application name and performs a type assertion to indicate
         * that the retrieved value is treated as a string.
         *
         * @returns {string} The application name retrieved from the configuration service.
         */
        const app_name = this._configService.get('app.app_name');
        // Return a JSON object with status and message
        return {
            status: common_1.HttpStatus.OK,
            message: `${app_name} API`
        };
    }
    /**
     * Controller method to get application configurations.
     *
     * This method is decorated with @HttpCode, @Get decorators to specify HTTP response code
     * and handle GET requests for the '/configs' endpoint.
     *
     * @returns {Object} Object containing application configurations, including timezone, date, and settings.
     */
    async getAppConfigs() {
        /**
         * Get application configurations.
         */
        const configs = this._configService.get('app');
        /**
         * Get application settings.
         */
        const settings = this._configService.get('setting');
        /**
         * Return an object containing timezone, date, application configurations, and application settings.
         */
        return {
            /** The guessed timezone using moment.js. */
            timezone: moment_1.default.tz.guess(),
            /** The current date and time using moment.js. */
            date: (0, moment_1.default)().format(),
            /** Application-specific configurations obtained from the configuration service. */
            ...configs,
            /** Application settings obtained from the configuration service. */
            ...settings
        };
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK) // Set the HTTP response code to 200 OK
    ,
    (0, common_1.Get)('/') // Define that this method handles GET requests for the root endpoint
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAppStatus", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK) // Set the HTTP response code to 200 OK
    ,
    (0, common_1.Get)('/configs') // Define that this method handles GET requests for the '/configs' endpoint
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAppConfigs", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    (0, common_2.Public)() // This seems to be a custom decorator indicating that this controller's endpoints are public
    ,
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppController);
//# sourceMappingURL=app.controller.js.map