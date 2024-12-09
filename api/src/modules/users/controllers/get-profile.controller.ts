import { Controller, Get, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { CurrentUser } from '@/common/decorators/current-user.decorator'

import { UserPayload } from '../jwt.strategy'
import { UsersService } from '../users.service'

@Controller('/me')
@UseGuards(JwtAuthGuard)
export class GetProfileController {
  constructor(private usersService: UsersService) {}

  @Get()
  async handle(@CurrentUser() userToken: UserPayload) {
    const { sub: userId } = userToken

    const user = await this.usersService.findById(userId)

    return { ...user }
  }
}
