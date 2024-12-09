import { Module } from '@nestjs/common'

import { CreateProductController } from './controllers/create-product.controller'
import { UpdateProductController } from './controllers/update-product.controller'
import { DeleteProductController } from './controllers/delete-product.controller'
import { FetchProductsController } from './controllers/fetch-products.controller'
import { GetProductController } from './controllers/get-product.controller'

import { ProductsService } from './products.service'

@Module({
  controllers: [
    CreateProductController,
    UpdateProductController,
    DeleteProductController,
    FetchProductsController,
    GetProductController,
  ],
  providers: [ProductsService],
})
export class ProductsModule {}
