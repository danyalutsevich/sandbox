import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestConfigProvider } from '../../../plugins/plugins/integration-ai/dist/index';
import { IntegrationTenantService } from './../../integration-tenant/integration-tenant.service';
import { Cache } from 'cache-manager';
export declare class IntegrationAIMiddleware implements NestMiddleware {
    private cacheManager;
    private readonly _integrationTenantService;
    private readonly _requestConfigProvider;
    private logging;
    constructor(cacheManager: Cache, _integrationTenantService: IntegrationTenantService, _requestConfigProvider: RequestConfigProvider);
    use(request: Request, _response: Response, next: NextFunction): Promise<void>;
}
