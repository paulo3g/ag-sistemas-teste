import { Controller, Get, Param, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'

import { ProductsService } from '../products.service'

@Controller('/products')
@UseGuards(JwtAuthGuard)
export class GetProductController {
  constructor(private productsService: ProductsService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const product = await this.productsService.findById(id)

    return { product }
  }
}
