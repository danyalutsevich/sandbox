import { HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class AppController {
    private readonly _configService;
    constructor(_configService: ConfigService);
    /**
     * This is a controller method for handling the HTTP GET request to the root endpoint ('/').
     * It is decorated with @HttpCode, @Get, and @Public decorators.
     */
    getAppStatus(): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    /**
     * Controller method to get application configurations.
     *
     * This method is decorated with @HttpCode, @Get decorators to specify HTTP response code
     * and handle GET requests for the '/configs' endpoint.
     *
     * @returns {Object} Object containing application configurations, including timezone, date, and settings.
     */
    getAppConfigs(): Promise<object>;
}
