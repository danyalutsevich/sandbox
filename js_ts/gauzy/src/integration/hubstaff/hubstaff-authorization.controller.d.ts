import { Response } from 'express';
import { ConfigService } from '../../../plugins/config/dist/index';
export declare class HubstaffAuthorizationController {
    private readonly _config;
    constructor(_config: ConfigService);
    /**
    * Handle the callback from the Hubstaff integration.
    *
    * @param {any} query - The query parameters from the callback.
    * @param {Response} response - Express Response object.
    */
    hubstaffIntegrationCallback(query: any, response: Response): Promise<void>;
}
