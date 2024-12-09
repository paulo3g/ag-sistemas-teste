import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'

import { PrismaService } from '@/modules/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
    const user = this.prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.prisma.user.findUnique({
      where: { email },
    })

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.prisma.user.findUnique({
      where: { id },
    })

    return user
  }
}
