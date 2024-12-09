import { useQuery } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { fetchProducts } from '@/api/products/fetch-products'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { UpsertProductModal } from './modals/upsert-product-modal'
import { ProductTableFilters } from './product-table-filter'
import { ProductTableRow } from './product-table-row'
import { ProductTableSkeleton } from './product-table-skeleton'

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [isUpsertModalOpen, setIsUpsertModalOpen] = useState(false)

  const productId = searchParams.get('productId')
  const productName = searchParams.get('productName')

  const pageIndex = z.coerce.number().parse(searchParams.get('page') ?? '1')

  const { data: result, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['fetch-products', pageIndex, productId, productName],
    queryFn: () => fetchProducts({ pageIndex, productId, productName }),
  })

  function handlePagination(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', pageIndex.toString())

      return state
    })
  }

  return (
    <>
      <Helmet title="Produtos" />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>

        <Dialog open={isUpsertModalOpen} onOpenChange={setIsUpsertModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <PlusIcon className="mr-2 h-4 w-4" />
              Novo Produto
            </Button>
          </DialogTrigger>

          <UpsertProductModal onOpenChange={setIsUpsertModalOpen} />
        </Dialog>
      </div>

      <div className="space-y-3">
        <ProductTableFilters />

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Identificador</TableHead>
                <TableHead className="w-[210px]">Criado em</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="w-[150px]">Preço</TableHead>
                <TableHead className="w-[132px]"></TableHead>
                <TableHead className="w-[132px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingProducts && <ProductTableSkeleton />}

              {result &&
                result.products.map((product) => (
                  <ProductTableRow key={product.id} product={product} />
                ))}
            </TableBody>
          </Table>
        </div>

        {result && (
          <Pagination
            pageIndex={result.meta.pageIndex}
            totalCount={result.meta.totalCount}
            perPage={result.meta.perPage}
            onPageChange={handlePagination}
          />
        )}
      </div>
    </>
  )
}
