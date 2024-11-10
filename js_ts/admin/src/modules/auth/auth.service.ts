import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async login(body: any) {
    const { email, password } = body;

    const user = await this.userRepository.findOne({
      where: {
        email: email,
        password: password,
      },
    });

    if (!user) {
      return 'wrong password';
    }

    return await this.jwtService.sign({ user }, {});
  }

  async register(body: any) {
    const { email, password, name } = body;
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      return 'user with this email already registered';
    } else {
      await this.userRepository.save({
        email,
        name,
        password,
      });
    }
  }
}
