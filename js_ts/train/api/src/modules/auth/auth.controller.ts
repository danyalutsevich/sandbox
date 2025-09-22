import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
// import { EventEmitter2 } from '@nestjs/event-emitter';
import { ResetPasswordDto } from './dto/resetPassword.dto';
// import { EventType } from '@/utils/enums/EventType.enum';
import { JwtAuthGuard } from '@/utils/guards/jwt.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    // private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    console.log(dto);
    const user = await this.authService.register(dto);
    // this.eventEmitter.emit(EventType.UserRegistered, user.user);
    return user;
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('resend-confirm-email')
  async resendConfirmEmail(@Req() req: any) {
    // this.eventEmitter.emit(EventType.ResendConfirmEmail, req.user);
  }

  @Get('refresh')
  async refresh(@Query('refreshToken') refreshToken: string, @Req() req: any) {
    return this.authService.refresh(refreshToken, req);
  }

  // @Get('confirm-email')
  // async confirmEmail(
  //   @Query('token') token: string,
  //   @Query('email') email: string,
  // ) {
  //   return this.authService.confirmEmail(email, token);
  // }

  @Get('forgot-password')
  async forgotPassword(@Query('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.token, dto.password, dto.email);
  }
}
