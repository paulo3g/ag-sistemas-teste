import { zodResolver } from '@hookform/resolvers/zod'
import { SearchIcon, XIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const productFiltersSchema = z.object({
  productId: z.string().optional(),
  productName: z.string().optional(),
})

type ProductFiltersSchema = z.infer<typeof productFiltersSchema>

export function ProductTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const productId = searchParams.get('productId')
  const productName = searchParams.get('productName')

  const { register, reset, handleSubmit } = useForm<ProductFiltersSchema>({
    resolver: zodResolver(productFiltersSchema),
    defaultValues: {
      productId: productId ?? '',
      productName: productName ?? '',
    },
  })

  function handleFilter({ productId, productName }: ProductFiltersSchema) {
    setSearchParams((state) => {
      if (productId) {
        state.set('productId', productId.trim())
      } else {
        state.delete('productId')
      }

      if (productName) {
        state.set('productName', productName)
      } else {
        state.delete('productName')
      }

      state.set('page', '1')

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('productId')
      state.delete('productName')
      state.set('page', '1')

      return state
    })

    reset({ productId: '', productName: '' })
  }

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleFilter)}
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        placeholder="ID do produto"
        className="h-8 w-auto"
        {...register('productId')}
      />
      <Input
        placeholder="Nome do produto"
        className="h-8 w-[320px]"
        {...register('productName')}
      />

      <Button type="submit" variant="secondary" size="xs">
        <SearchIcon className="w-h4 mr-2 h-4" />
        Filtrar resultados
      </Button>

      <Button variant="outline" size="xs" onClick={handleClearFilters}>
        <XIcon className="w-h4 mr-2 h-4" />
        Remover filtros
      </Button>
    </form>
  )
}
