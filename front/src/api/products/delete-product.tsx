import { api } from '@/lib/axios'

export interface DeleteProductBody {
  productId: string
}

export async function deleteProduct({ productId }: DeleteProductBody) {
  await api.delete(`/products/${productId}`)
}
