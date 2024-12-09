import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Loader2Icon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createProduct, CreateProductBody } from '@/api/products/create-product'
import { updateProduct, UpdateProductBody } from '@/api/products/update-product'
import { MoneyInput } from '@/components/money-input'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { queryClient } from '@/lib/react-query'

interface UpsertProductModalProps {
  productId?: string
  product?: {
    name: string
    description: string
    price: string
  }
  onOpenChange: (open: boolean) => void
}

const upsertProductSchema = z.object({
  name: z.string().min(1, 'Informe um nome'),
  description: z.string().min(1, 'Informe uma descrição'),
  price: z.string({ message: 'Informe um preço' }).min(1, 'Informe um preço'),
})

type UpsertProductSchema = z.infer<typeof upsertProductSchema>

export function UpsertProductModal({
  productId,
  product,
  onOpenChange,
}: UpsertProductModalProps) {
  const {
    control,
    register,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
  } = useForm<UpsertProductSchema>({
    resolver: zodResolver(upsertProductSchema),
    defaultValues: {
      name: product?.name ?? '',
      description: product?.description ?? '',
      price: product
        ? Number(product.price).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
        : '',
    },
  })

  const { mutateAsync: upsertProductFn } = useMutation({
    mutationFn: (payload: CreateProductBody | UpdateProductBody) => {
      if (productId) {
        return updateProduct({ productId, ...payload })
      }

      return createProduct(payload)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['fetch-products'] })

      reset()
      toast.success(
        `Produto ${productId ? 'atualizado' : 'criado'} com sucesso.`,
      )

      onOpenChange(false)
    },
  })

  async function handleUpsertProduct(data: UpsertProductSchema) {
    try {
      const numericValue = parseFloat(data.price.replace(/[^\d]/g, '')) / 100

      await upsertProductFn({
        name: data.name,
        description: data.description,
        price: numericValue,
      })
    } catch (error) {
      if (isAxiosError(error)) {
        const description = error.response?.data?.message || error.message

        toast.error(`Erro ao ${productId ? 'atualizar' : 'criar'} produto.`, {
          description,
        })
        return
      }

      toast.error('Ops! Ocorreu um erro inesperado, informe ao suporte.')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{productId ? 'Editar' : 'Novo'} Produto</DialogTitle>
        <DialogDescription>
          Preencha os dados do produto abaixo
        </DialogDescription>
      </DialogHeader>

      <form className="space-y-4" onSubmit={handleSubmit(handleUpsertProduct)}>
        <div className="space-y-2">
          <Label htmlFor="name">
            Nome do produto <span className="text-red-600">*</span>
          </Label>
          <Input id="name" {...register('name')} />

          {errors?.name && (
            <p className="text-sm font-medium text-destructive">
              {errors?.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">
            Descrição <span className="text-red-600">*</span>
          </Label>
          <Textarea id="description" {...register('description')} />

          {errors?.description && (
            <p className="text-sm font-medium text-destructive">
              {errors?.description.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">
            Preço <span className="text-red-600">*</span>
          </Label>
          <Controller
            name="price"
            control={control}
            render={({ field: { onChange, value } }) => (
              <MoneyInput id="price" value={value} onChange={onChange} />
            )}
          />

          {errors?.price && (
            <p className="text-sm font-medium text-destructive">
              {errors?.price.message}
            </p>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isSubmitting}>
              Cancelar
            </Button>
          </DialogClose>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2Icon className="animate-spin" />}
            {productId ? 'Atualizar' : 'Criar'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
