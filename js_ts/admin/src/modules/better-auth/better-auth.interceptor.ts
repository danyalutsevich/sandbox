import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BetterAuthService } from './better-auth.service';

@Injectable()
export class BetterAuthInterceptor implements NestInterceptor {
  constructor(public readonly service: BetterAuthService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const now = Date.now();
    console.log(`Before request...`);
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const { toNodeHandler } = await import('better-auth/node');

    const authHandler = toNodeHandler(this.service.betterAuth);

    authHandler(req as any, res as any);

    return of();

    // return next.handle().pipe(
    //   map((data) => {
    //     return {
    //       statusCode: 200,
    //       message: 'Request was successful!',
    //       result: data,
    //     };
    //   }),
    // );
    // .pipe(tap(() => console.log(`After request... ${Date.now() - now}ms`)));
  }
}
