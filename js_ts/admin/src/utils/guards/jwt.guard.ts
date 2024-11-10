import { UserEntity } from '../../db/entities';
import {
  CanActivate,
  ExecutionContext,
  //   ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;
    const bearer = headers.authorization;

    // const roles: string[] = this.reflector.get<string[]>(
    //   'roles',
    //   context.getHandler(),
    // );

    if (!bearer) {
      throw new UnauthorizedException();
    }

    const jwt = bearer.replace('Bearer ', '');
    try {
      const valid = this.jwtService.verify(jwt, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.userRepository.findOne({
        where: { id: valid.user.id },
      });

      //   if (roles) {
      //     const allowedRole = user.roles.some((el) => roles.includes(el.name));
      //     if (!allowedRole) {
      //       throw new UnauthorizedException(AuthErrors.InsufficientRole);
      //     }
      //   }

      request.user = user;

      if (valid) {
        return true;
      }
    } catch (ex) {
      throw new UnauthorizedException(ex.message);
    }
  }
}
