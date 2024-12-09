import { Controller, Post, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'

@Controller('/logout')
@UseGuards(JwtAuthGuard)
export class LogoutController {
  constructor() {}

  @Post()
  async handle(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('accessToken', {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
  }
}
