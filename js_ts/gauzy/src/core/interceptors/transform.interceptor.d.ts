import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class TransformInterceptor implements NestInterceptor {
    /**
     * Intercepts the execution context and the call handler.
     * Transforms the data using class-transformer's instanceToPlain.
     * Catches and handles errors, returning appropriate exceptions.
     * @param ctx - The execution context.
     * @param next - The call handler.
     * @returns An observable that represents the intercepted response.
     */
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<any>;
}
