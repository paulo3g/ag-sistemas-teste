import { Controller, Get, Query, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe'
import { CurrentUser } from '@/common/decorators/current-user.decorator'

import { UserPayload } from '@/modules/users/jwt.strategy'

import { ProductsService } from '../products.service'
import { z } from 'zod'

const fetchProductsQuerySchema = z.object({
  productId: z.string().optional(),
  productName: z.string().optional(),
  pageIndex: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1)),
})

const queryValidationPipe = new ZodValidationPipe(fetchProductsQuerySchema)

export type FetchProductsQuerySchema = z.infer<typeof fetchProductsQuerySchema>

@Controller('/products')
@UseGuards(JwtAuthGuard)
export class FetchProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async handle(
    @Query(queryValidationPipe) params: FetchProductsQuerySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { productId, productName, pageIndex } = params

    const perPage = 10

    const { products, total } = await this.productsService.findAll({
      userId: user.sub,
      filters: {
        productId,
        productName,
      },
      pagination: {
        pageIndex,
        perPage,
      },
    })

    const meta = {
      pageIndex,
      perPage,
      totalCount: total,
    }

    return {
      products,
      meta,
    }
  }
}
