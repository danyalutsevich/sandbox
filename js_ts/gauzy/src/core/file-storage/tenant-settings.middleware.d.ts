import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantSettingService } from '../../tenant/tenant-setting/tenant-setting.service';
import { Cache } from 'cache-manager';
export declare class TenantSettingsMiddleware implements NestMiddleware {
    private cacheManager;
    private readonly tenantSettingService;
    private logging;
    constructor(cacheManager: Cache, tenantSettingService: TenantSettingService);
    /**
     *
     * @param _request
     * @param _response
     * @param next
     */
    use(_request: Request, _response: Response, next: NextFunction): Promise<void>;
}
