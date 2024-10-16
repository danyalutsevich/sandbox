import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class TenantBaseGuard implements CanActivate {
    /**
     *
     * @param context
     * @returns
     */
    canActivate(context: ExecutionContext): Promise<boolean>;
}
