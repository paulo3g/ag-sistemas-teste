import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import * as cookieParser from 'cookie-parser'

import { Env } from '@/config/env'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())

  // Como é uma aplicação para teste, vamos habilitar o CORS para aceitar requisições de qualquer origem
  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  })

  const configService = app.get<ConfigService<Env, true>>(ConfigService)
  const port = configService.get('PORT', { infer: true })

  await app.listen(port)
}

bootstrap()
