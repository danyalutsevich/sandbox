import { NestMiddleware } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Request, Response, NextFunction } from 'express';
import { IntegrationTenantService } from 'integration-tenant/integration-tenant.service';
export declare class GithubMiddleware implements NestMiddleware {
    private cacheManager;
    private readonly _integrationTenantService;
    private logging;
    constructor(cacheManager: Cache, _integrationTenantService: IntegrationTenantService);
    /**
     *
     * @param request
     * @param _response
     * @param next
     */
    use(request: Request, _response: Response, next: NextFunction): Promise<void>;
}
