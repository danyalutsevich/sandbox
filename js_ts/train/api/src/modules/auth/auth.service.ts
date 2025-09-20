import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@utils/entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/Login.dto';
import { RegisterDto } from './dto/Register.dto';
import { AuthErrors } from '@utils/errors/Auth.errors';
import * as crypto from 'crypto';
import { MessageDto } from '@/utils/dto/message.dto';
// import { SendEmailService } from '../email/sendEmail.service';
// import { EmailTemplate } from '@/utils/enums/EmailTemplate.enum';
// import { MessageDto } from '@/utils/types/Message.dto';
// import { Role } from '@/utils/enums/Role.enum';
// import { AuthActions } from '@/utils/enums/AuthActions.enum';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    // private sendEmailService: SendEmailService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  async login(dto: LoginDto) {
    const userWithSecret = await this.userRepository.findOne({
      where: { email: dto.email },
      select: ['password', 'email'],
    });
    if (
      userWithSecret &&
      (await bcrypt.compare(dto.password, userWithSecret.password))
    ) {
      const user = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      const jwt = this.jwtService.sign(
        { ...user },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_EXPIRATION,
        },
      );
      const refresh = this.jwtService.sign(
        { ...user },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: process.env.JWT_REFRESH_EXPIRATION,
        },
      );

      return { user, jwt, refresh };
    } else {
      throw new BadRequestException('Invalid credentials');
    }
  }

  async register({ email, username, password }: RegisterDto) {
    // const user = await this.userRepository.findOne({ where: { email } });

    // if (user && !user.isEmailConfirmed) {
    //   await this.userRepository.delete({ email: email });
    // }
    //
    // if (user && user.isEmailConfirmed) {
    //   throw new BadRequestException(AuthErrors.EMAIL_ALREADY_EXISTS);
    // }
    const passwordHash = await bcrypt.hash(password, 10);

    await this.userRepository.save({
      email: email,
      username: username,
      password: passwordHash,
      emailConfirmCode: this.generateSixDigitNumber(),
    });

    return await this.login({ email, password });
  }

  async refresh(refreshToken: string, req?: any) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const user = await this.userRepository.findOne({
        where: { email: payload.email },
      });

      const jwt = this.jwtService.sign(
        { ...user },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_EXPIRATION,
        },
      );
      const refresh = this.jwtService.sign(
        { ...user },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: process.env.JWT_REFRESH_EXPIRATION,
        },
      );

      return { user, jwt, refresh };
    } catch (error) {
      throw new BadRequestException(AuthErrors.INVALID_TOKEN);
    }
  }

  // async confirmEmail(email: string, token: string) {
  //   const user = await this.userRepository.findOne({
  //     where: {
  //       email: email,
  //       // emailConfirmCode: token,
  //     },
  //   });
  //
  //   if (!user) {
  //     throw new BadRequestException(AuthErrors.INVALID_TOKEN);
  //   }
  //
  //   await this.userRepository.update(
  //     { email: email },
  //     { isEmailConfirmed: true, emailConfirmCode: null },
  //   );
  //
  //   const jwt = this.jwtService.sign(
  //     { ...user },
  //     {
  //       secret: process.env.JWT_SECRET,
  //       expiresIn: process.env.JWT_EXPIRATION,
  //     },
  //   );
  //   const refresh = this.jwtService.sign(
  //     { ...user },
  //     {
  //       secret: process.env.JWT_REFRESH_SECRET,
  //       expiresIn: process.env.JWT_REFRESH_EXPIRATION,
  //     },
  //   );
  //
  //   return { user, jwt, refresh };
  // }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(AuthErrors.USER_NOT_FOUND);
    }

    const resetPasswordToken = crypto.randomUUID();

    // await this.userRepository.update(
    //   { email },
    //   { resetPasswordToken: resetPasswordToken },
    // );
    //
    // await this.sendEmailService.sendTemplateEmail(
    //   [email],
    //   EmailTemplate.FORGOT_PASSWORD_EN,
    //   {
    //     link: `${process.env.APP_FRONTEND_URL}/reset-password?token=${resetPasswordToken}&email=${email}`,
    //   },
    // );

    return new MessageDto('Recovery email sent');
  }

  async resetPassword(token: string, password: string, email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email, resetPasswordToken: token },
    });

    if (!user) {
      throw new NotFoundException(AuthErrors.USER_NOT_FOUND);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await this.userRepository.update(
      { email: email },
      { password: passwordHash, resetPasswordToken: null },
    );

    const jwt = this.jwtService.sign(
      { ...user },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRATION,
      },
    );

    const refresh = this.jwtService.sign(
      { ...user },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRATION,
      },
    );

    return { user, jwt, refresh };
  }

  generateSixDigitNumber() {
    const characters = '1234567890';
    let randomNumber = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = crypto.randomInt(characters.length);
      const randomChar = characters.charAt(randomIndex);
      randomNumber += randomChar;
    }

    return randomNumber;
  }
}
