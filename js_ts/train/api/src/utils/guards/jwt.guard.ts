import { UserEntity } from '@utils/entities';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const bearer = request.headers['authorization'];
    const jwt = bearer?.replace('Bearer ', '');

    const roles: string[] = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!jwt) {
      return false;
    }

    let payload: any;
    try {
      payload = this.jwtService.verify(jwt, {
        secret: process.env.JWT_SECRET,
      });
    } catch (e) {
      return false;
    }

    const user = await this.userRepository.findOne({
      where: { id: payload.id },
      relations: ['roles'],
    });

    if (roles) {
      const allowedRole = roles.includes(user.role);
      if (!allowedRole) {
        return false;
      }
    }

    request.user = user;

    return true;
  }
}
