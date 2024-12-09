import { api } from '@/lib/axios'

export interface GetProductDetailsParams {
  productId: string
}

export interface GetProductDetailsResponse {
  id: string
  name: string
  description: string
  price: string
  createdAt: Date
  updatedAt: Date
  userId: string
}

export async function getProductDetails({
  productId,
}: GetProductDetailsParams) {
  const response = await api.get<GetProductDetailsResponse>(
    `/products/${productId}`,
  )

  return response.data
}
