import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe'
import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common'
import { z } from 'zod'

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'

import { ProductsService } from '../products.service'

const updateProductBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
})

const bodyValidationPipe = new ZodValidationPipe(updateProductBodySchema)

type UpdateProductBodySchema = z.infer<typeof updateProductBodySchema>

@Controller('/products')
@UseGuards(JwtAuthGuard)
export class UpdateProductController {
  constructor(private productsService: ProductsService) {}

  @Put(':id')
  async handle(
    @Param('id') id: string,
    @Body(bodyValidationPipe) body: UpdateProductBodySchema,
  ) {
    const { name, description, price } = body

    const product = await this.productsService.update(id, {
      name,
      description,
      price,
    })

    return { product }
  }
}
