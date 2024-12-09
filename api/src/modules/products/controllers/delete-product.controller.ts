import { Controller, Delete, Param, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'

import { ProductsService } from '../products.service'

@Controller('/products')
@UseGuards(JwtAuthGuard)
export class DeleteProductController {
  constructor(private productsService: ProductsService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    const product = await this.productsService.delete(id)

    return { product }
  }
}
