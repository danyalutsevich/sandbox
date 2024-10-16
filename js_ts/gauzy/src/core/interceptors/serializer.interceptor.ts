import {
	Injectable,
	ExecutionContext,
	CallHandler,
    ClassSerializerInterceptor,
	NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { instanceToPlain } from 'class-transformer';
import { verify } from 'jsonwebtoken';
import { environment } from '../../../plugins/config';
import { RolesEnum } from '../../../plugins/contracts';
import { RequestContext } from './../../core/context';

@Injectable()
export class SerializerInterceptor extends ClassSerializerInterceptor implements NestInterceptor {

    intercept(
		ctx: ExecutionContext,
		next: CallHandler
	): Observable<any> {
		const token = RequestContext.currentToken();
		const { role } = verify(token, environment.JWT_SECRET) as {
			id: string;
			role: RolesEnum;
		};
		return next
			.handle()
			.pipe(
				map((data) => instanceToPlain(data, { groups: [role] }))
			);
	}
}