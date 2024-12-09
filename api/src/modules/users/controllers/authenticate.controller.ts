import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { z } from 'zod'
import { compare } from 'bcryptjs'
import { Response } from 'express'

import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe'

import { UsersService } from '../users.service'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/login')
export class AuthenticateController {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(
    @Body() body: AuthenticateBodySchema,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { email, password } = body

    const user = await this.usersService.findByEmail(email)

    if (!user) {
      throw new UnauthorizedException('User credentials do not match.')
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('User credentials do not match.')
    }

    const accessToken = this.jwt.sign({ sub: user.id })

    response.cookie('accessToken', accessToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })

    return {
      acess_token: accessToken,
    }
  }
}
