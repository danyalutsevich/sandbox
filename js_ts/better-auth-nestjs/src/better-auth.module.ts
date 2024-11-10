import { Module } from "@nestjs/common";
import { BetterAuthController } from "./better-auth.controller.js";
import { BetterAuthService } from "./better-auth.service.js";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
  ],
  controllers: [BetterAuthController],
  providers: [BetterAuthService],
  exports: [BetterAuthService],
})
export class BetterAuthModule { }
