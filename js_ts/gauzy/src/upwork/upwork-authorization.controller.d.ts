import { Response } from 'express';
import { ConfigService } from '../../plugins/config/dist/index';
export declare class UpworkAuthorizationController {
    private readonly _config;
    constructor(_config: ConfigService);
    /**
    * Handle the callback from the Upwork integration.
    *
    * @param {any} query - The query parameters from the callback.
    * @param {Response} response - Express Response object.
    */
    upworkIntegrationCallback(query: any, response: Response): Promise<void>;
}
