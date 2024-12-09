import {
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { hash } from 'bcryptjs'

import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe'

import { UsersService } from '../users.service'

const registerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type RegisterBodySchema = z.infer<typeof registerBodySchema>

@Controller('/register')
export class RegisterController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(registerBodySchema))
  async handle(@Body() body: RegisterBodySchema) {
    const { name, email, password } = body

    const userWithSameEmail = await this.usersService.findByEmail(email)

    if (userWithSameEmail) {
      throw new ConflictException(
        'User with same e-mail address already exists.',
      )
    }

    const hashedPassword = await hash(password, 8)

    await this.usersService.create({
      name,
      email,
      password: hashedPassword,
    })
  }
}
