import { useMutation } from '@tanstack/react-query'
import { Loader2Icon } from 'lucide-react'
import { useRef } from 'react'
import { toast } from 'sonner'

import { deleteProduct } from '@/api/products/delete-product'
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { queryClient } from '@/lib/react-query'

interface DeleteProductModalProps {
  productId: string
}

export function DeleteProductModal({ productId }: DeleteProductModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const { mutateAsync: deleteFn, isPending } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['fetch-products'] })

      toast.success('Produto excluído com sucesso')

      closeButtonRef.current?.click()
    },
  })

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
        <AlertDialogDescription>
          Tem certeza que deseja excluir este produto? Esta ação não pode ser
          desfeita.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel ref={closeButtonRef} disabled={isPending}>
          Cancelar
        </AlertDialogCancel>

        <Button
          variant="destructive"
          disabled={isPending}
          onClick={() => deleteFn({ productId })}
        >
          {isPending && <Loader2Icon className="animate-spin" />}
          Excluir
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
