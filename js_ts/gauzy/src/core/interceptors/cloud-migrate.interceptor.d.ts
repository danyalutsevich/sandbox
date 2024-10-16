import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class CloudMigrateInterceptor implements NestInterceptor {
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<any>;
}
