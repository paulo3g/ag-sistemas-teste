import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe'
import { CurrentUser } from '@/common/decorators/current-user.decorator'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'

import { UserPayload } from '@/modules/users/jwt.strategy'

import { ProductsService } from '../products.service'

const createProductBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
})

const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema)

type CreateProductBodySchema = z.infer<typeof createProductBodySchema>

@Controller('/products')
@UseGuards(JwtAuthGuard)
export class CreateProductController {
  constructor(private productsService: ProductsService) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateProductBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, description, price } = body

    const product = await this.productsService.create({
      name,
      description,
      price,
      userId: user.sub,
    })

    return { product }
  }
}
