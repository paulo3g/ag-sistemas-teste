import { api } from '@/lib/axios'

export interface CreateProductBody {
  name: string
  description: string
  price: number
}

export async function createProduct({
  name,
  description,
  price,
}: CreateProductBody) {
  await api.post('/products', { name, description, price })
}
