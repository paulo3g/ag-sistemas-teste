import { api } from '@/lib/axios'

export interface UpdateProductBody {
  productId: string
  name: string
  description: string
  price: number
}

export async function updateProduct({
  productId,
  name,
  description,
  price,
}: UpdateProductBody) {
  await api.put(`/products/${productId}`, { name, description, price })
}
