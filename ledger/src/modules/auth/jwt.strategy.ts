import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'dev-secret',
      algorithms: ['HS256'],
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context, status) {
    console.log('err:', err);
    console.log('user:', user);
    console.log('info:', info);
    console.log('status:', status);
    return super.handleRequest(err, user, info, context, status);
  }
}
