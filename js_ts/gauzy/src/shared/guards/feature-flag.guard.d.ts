import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { FeatureService } from './../../feature/feature.service';
/**
 * Feature enabled/disabled guard
 *
 * @returns
 */
export declare class FeatureFlagGuard implements CanActivate {
    private cacheManager;
    private readonly _reflector;
    private readonly featureFlagService;
    constructor(cacheManager: Cache, _reflector: Reflector, featureFlagService: FeatureService);
    /**
     * Determines if the current request can be activated based on feature flag metadata.
     * @param context The execution context of the request.
     * @returns A boolean indicating whether access is allowed.
     */
    canActivate(context: ExecutionContext): Promise<boolean>;
}
