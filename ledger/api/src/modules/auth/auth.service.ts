import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepo: Repository<UserEntity>,
    private readonly jwt: JwtService,
  ) { }

  async register(username: string, email: string, password: string) {
    const existing = await this.usersRepo.findOne({
      where: [{ username }, { email }],
    });
    if (existing) throw new UnauthorizedException('User exists');
    const hash = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({ username, email, password: hash });
    await this.usersRepo.save(user);
    return this.sign(user);
  }

  async login(username: string, password: string) {
    const user = await this.usersRepo.findOne({ where: { username } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return this.sign(user);
  }

  private sign(user: UserEntity) {
    const payload = { sub: user.id, username: user.username };
    const accessToken = this.jwt.sign(payload);
    return { accessToken, user: payload };
  }
}
