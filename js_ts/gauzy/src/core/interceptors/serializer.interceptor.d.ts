import { ExecutionContext, CallHandler, ClassSerializerInterceptor, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class SerializerInterceptor extends ClassSerializerInterceptor implements NestInterceptor {
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<any>;
}
