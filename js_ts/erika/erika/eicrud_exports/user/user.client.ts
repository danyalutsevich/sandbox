import { VerifyEmailDto } from './cmds/verify_email/verify_email.dto';
import { TimeoutUserDto } from './cmds/timeout_user/timeout_user.dto';
import { SendVerificationEmailDto } from './cmds/send_verification_email/send_verification_email.dto';
import { SendPasswordResetEmailDto } from './cmds/send_password_reset_email/send_password_reset_email.dto';
import { ResetPasswordDto } from './cmds/reset_password/reset_password.dto';
import { LogoutEverywhereDto } from './cmds/logout_everywhere/logout_everywhere.dto';
import { CreateAccountDto } from './cmds/create_account/create_account.dto';
import { ChangePasswordDto } from './cmds/change_password/change_password.dto';
import { SuperClientConfig, ClientOptions, CrudClient } from "@eicrud/client";
import { ICrudOptions } from "@eicrud/shared/interfaces";
import { User } from "./user.entity";


export class UserClient extends CrudClient<User> {
  constructor(config: SuperClientConfig) {
    super({...config, serviceName: 'user'});
  }
  // GENERATED START
  async verify_email(
      dto: VerifyEmailDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmd('verify_email', dto, options, copts);
  }

  async verify_emailS(
      dto: VerifyEmailDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmdS('verify_email', dto, options, copts);
  }

  async verify_emailL(
      dto: VerifyEmailDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmdL('verify_email', dto, options, copts) as any;
  }

  async verify_emailSL(
      dto: VerifyEmailDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmdSL('verify_email', dto, options, copts) as any;
  }

  async timeout_user(
      dto: TimeoutUserDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmd('timeout_user', dto, options, copts);
  }

  async timeout_userS(
      dto: TimeoutUserDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmdS('timeout_user', dto, options, copts);
  }

  async timeout_userL(
      dto: TimeoutUserDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmdL('timeout_user', dto, options, copts) as any;
  }

  async timeout_userSL(
      dto: TimeoutUserDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmdSL('timeout_user', dto, options, copts) as any;
  }

  async send_verification_email(
      dto: SendVerificationEmailDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmd('send_verification_email', dto, options, copts);
  }

  async send_verification_emailS(
      dto: SendVerificationEmailDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmdS('send_verification_email', dto, options, copts);
  }

  async send_verification_emailL(
      dto: SendVerificationEmailDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmdL('send_verification_email', dto, options, copts) as any;
  }

  async send_verification_emailSL(
      dto: SendVerificationEmailDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmdSL('send_verification_email', dto, options, copts) as any;
  }

  async send_password_reset_email(
      dto: SendPasswordResetEmailDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmd('send_password_reset_email', dto, options, copts);
  }

  async send_password_reset_emailS(
      dto: SendPasswordResetEmailDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmdS('send_password_reset_email', dto, options, copts);
  }

  async send_password_reset_emailL(
      dto: SendPasswordResetEmailDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmdL('send_password_reset_email', dto, options, copts) as any;
  }

  async send_password_reset_emailSL(
      dto: SendPasswordResetEmailDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmdSL('send_password_reset_email', dto, options, copts) as any;
  }

  async reset_password(
      dto: ResetPasswordDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmd('reset_password', dto, options, copts);
  }

  async reset_passwordS(
      dto: ResetPasswordDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmdS('reset_password', dto, options, copts);
  }

  async reset_passwordL(
      dto: ResetPasswordDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmdL('reset_password', dto, options, copts) as any;
  }

  async reset_passwordSL(
      dto: ResetPasswordDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmdSL('reset_password', dto, options, copts) as any;
  }

  async logout_everywhere(
      dto: LogoutEverywhereDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmd('logout_everywhere', dto, options, copts);
  }

  async logout_everywhereS(
      dto: LogoutEverywhereDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmdS('logout_everywhere', dto, options, copts);
  }

  async logout_everywhereL(
      dto: LogoutEverywhereDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmdL('logout_everywhere', dto, options, copts) as any;
  }

  async logout_everywhereSL(
      dto: LogoutEverywhereDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmdSL('logout_everywhere', dto, options, copts) as any;
  }

  async create_account(
      dto: CreateAccountDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmd('create_account', dto, options, copts);
  }

  async create_accountS(
      dto: CreateAccountDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmdS('create_account', dto, options, copts);
  }

  async create_accountL(
      dto: CreateAccountDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmdL('create_account', dto, options, copts) as any;
  }

  async create_accountSL(
      dto: CreateAccountDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmdSL('create_account', dto, options, copts) as any;
  }

  async change_password(
      dto: ChangePasswordDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmd('change_password', dto, options, copts);
  }

  async change_passwordS(
      dto: ChangePasswordDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmdS('change_password', dto, options, copts);
  }

  async change_passwordL(
      dto: ChangePasswordDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmdL('change_password', dto, options, copts) as any;
  }

  async change_passwordSL(
      dto: ChangePasswordDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<any> {
      return super.cmdSL('change_password', dto, options, copts) as any;
  }

}