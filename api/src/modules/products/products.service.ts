import { Injectable } from '@nestjs/common'
import { Prisma, Product } from '@prisma/client'

import { PrismaService } from '@/modules/prisma/prisma.service'

interface FindAllParams {
  userId: string
  filters?: {
    productId?: string
    productName?: string
  }
  pagination: {
    pageIndex: number
    perPage: number
  }
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProductUncheckedCreateInput): Promise<Product> {
    const product = await this.prisma.product.create({
      data,
    })

    return product
  }

  async update(
    id: string,
    data: Prisma.ProductUncheckedUpdateInput,
  ): Promise<Product> {
    const product = await this.prisma.product.update({
      where: { id },
      data,
    })

    return product
  }

  async delete(id: string): Promise<Product> {
    const product = await this.prisma.product.delete({
      where: { id },
    })

    return product
  }

  async findAll(
    params: FindAllParams,
  ): Promise<{ products: Product[]; total: number }> {
    const { userId, filters, pagination } = params

    const where: Prisma.ProductWhereInput = {
      userId,
      ...(filters?.productId && {
        id: filters.productId,
      }),
      ...(filters?.productName && {
        name: { contains: filters.productName },
      }),
    }

    const [products, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        skip: (pagination.pageIndex - 1) * pagination.perPage,
        take: pagination.perPage,
      }),
      this.prisma.product.count({ where }),
    ])

    return { products, total }
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    })

    return product
  }
}
