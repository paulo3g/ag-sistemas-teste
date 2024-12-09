import { api } from '@/lib/axios'

export interface FetchProductsQuery {
  pageIndex?: number | null
  productId?: string | null
  productName?: string | null
}

export interface FetchProductsResponse {
  products: {
    id: string
    name: string
    description: string
    price: string
    createdAt: Date
    updatedAt: Date
    userId: string
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function fetchProducts({
  pageIndex,
  productId,
  productName,
}: FetchProductsQuery) {
  const response = await api.get<FetchProductsResponse>('/products', {
    params: { pageIndex, productId, productName },
  })

  return response.data
}
