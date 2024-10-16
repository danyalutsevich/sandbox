import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { RouterModule } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SocialAuthModule } from '../../plugins/auth/dist/index';
import { EventBusModule } from '../event-bus/event-bus.module';
import { Organization, OrganizationTeam, UserOrganization } from './../core/entities/internal';
import { EmailSendModule } from './../email-send/email-send.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CommandHandlers } from './commands/handlers';
import { JwtRefreshTokenStrategy, JwtStrategy } from './strategies';
import { UserOrganizationService } from '../user-organization/user-organization.services';
import { UserModule } from './../user/user.module';
import { EmployeeModule } from './../employee/employee.module';
import { RoleModule } from './../role/role.module';
import { PasswordResetModule } from './../password-reset/password-reset.module';
import { EmailConfirmationService } from './email-confirmation.service';
import { EmailVerificationController } from './email-verification.controller';
import { FeatureModule } from './../feature/feature.module';
import { SocialAccountService } from './social-account/social-account.service';
import { SocialAccountModule } from './social-account/social-account.module';

const providers = [AuthService, EmailConfirmationService, SocialAccountService, UserOrganizationService];

const strategies = [JwtStrategy, JwtRefreshTokenStrategy];

@Module({
	imports: [
		RouterModule.register([
			{
				path: '/auth',
				module: AuthModule,
				children: [{ path: '/', module: SocialAuthModule }]
			}
		]),
		SocialAuthModule.registerAsync({
			imports: [
				TypeOrmModule.forFeature([OrganizationTeam]),
				MikroOrmModule.forFeature([OrganizationTeam]),
				HttpModule,
				AuthModule,
				EmailSendModule,
				UserModule,
				EmployeeModule,
				RoleModule,
				PasswordResetModule,
				CqrsModule,
				SocialAccountModule,
				EventBusModule
			],
			useClass: AuthService
		}),
		TypeOrmModule.forFeature([UserOrganization, Organization, OrganizationTeam]),
		MikroOrmModule.forFeature([UserOrganization, Organization, OrganizationTeam]),
		EmailSendModule,
		UserModule,
		EmployeeModule,
		RoleModule,
		PasswordResetModule,
		FeatureModule,
		CqrsModule,
		EventBusModule
	],
	controllers: [AuthController, EmailVerificationController],
	providers: [...providers, ...CommandHandlers, ...strategies],
	exports: [...providers]
})
export class AuthModule {}
