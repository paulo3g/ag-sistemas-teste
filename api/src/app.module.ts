import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { envSchema } from '@/config/env'

import { PrismaModule } from '@/modules/prisma/prisma.module'
import { UsersModule } from '@/modules/users/users.module'
import { ProductsModule } from '@/modules/products/products.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    ProductsModule,
  ],
})
export class AppModule {}
