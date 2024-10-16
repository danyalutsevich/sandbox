import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Entities from './db/entities';

import { ServiceModule } from './modules/service/service.module';
import { UserModule } from './modules/user/user.module';
import { GlobalModule } from './modules/global/global.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrderModule } from './modules/order/order.module';
import { I18nModule } from './modules/i18n/i18n.module';
import { CqrsModule } from './modules/cqrs/cqrs.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule } from '@nestjs/config';
import { QuestionModule } from './modules/question/question.module';
import { AnswerModule } from './modules/answer/answer.module';
import { BetterAuthModule } from './modules/better-auth/better-auth.module';

const emailConfig = {
  EMAIL_USER: 'cruderycrudery@gmail.com',
  EMAIL_PASSWORD: 'bldhpmbwnfssmbcx',
  EMAIL_HOST: 'smtp.gmail.com',
  EMAIL_SSL: true,
  EMAIL_PORT: 465,
  EMAIL_SERVICE: 'Gmail',
};

const transportString = `smtps://${emailConfig.EMAIL_USER}:${emailConfig.EMAIL_PASSWORD}@${emailConfig.EMAIL_HOST}:${emailConfig.EMAIL_PORT}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      database: 'admin',
      username: 'postgres',
      password: 'root',
      synchronize: true,
      logging: false,
      entities: Object.values(Entities),
    }),
    MailerModule.forRoot({
      transport: {
        host: emailConfig.EMAIL_HOST,
        port: emailConfig.EMAIL_PORT,
        secure: true,
        service: emailConfig.EMAIL_SERVICE,
        auth: {
          user: emailConfig.EMAIL_USER,
          pass: emailConfig.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      // transport: transportString,
      defaults: {
        from: process.env.EMAIL_USER,
      },
      preview: false,
      template: {
        dir: process.cwd() + '/src/utils/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    GlobalModule,
    AuthModule,
    ServiceModule,
    OrderModule,
    UserModule,
    I18nModule,
    CqrsModule,
    QuestionModule,
    AnswerModule,
    BetterAuthModule,
  ],
})
export class AppModule {
  constructor() {
    // console.log(process.env);
  }
}
