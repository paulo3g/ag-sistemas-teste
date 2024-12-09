import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { Env } from '@/config/env'

import { AuthenticateController } from './controllers/authenticate.controller'
import { RegisterController } from './controllers/register.controller'
import { GetProfileController } from './controllers/get-profile.controller'
import { LogoutController } from './controllers/logout.controller'

import { JwtStrategy } from './jwt.strategy'
import { UsersService } from './users.service'

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const secret = config.get('JWT_SECRET', { infer: true })

        return { secret }
      },
    }),
  ],
  controllers: [
    AuthenticateController,
    RegisterController,
    LogoutController,
    GetProfileController,
  ],
  providers: [UsersService, JwtStrategy],
})
export class UsersModule {}
