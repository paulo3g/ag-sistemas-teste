import { format } from 'date-fns'
import { PencilIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'

import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { DeleteProductModal } from './modals/delete-product-modal'
import { UpsertProductModal } from './modals/upsert-product-modal'

interface ProductTableRowProps {
  product: {
    id: string
    name: string
    description: string
    price: string
    createdAt: Date
  }
}

export function ProductTableRow({ product }: ProductTableRowProps) {
  const [isEditingOpen, setIsEditingOpen] = useState(false)

  return (
    <TableRow>
      <TableCell className="font-mono text-xs font-medium">
        {product.id}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {product.createdAt &&
          format(new Date(product.createdAt), "MM/dd/yyyy 'às' H:mm:SS")}
      </TableCell>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell className="font-medium">
        {Number(product.price).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        <Dialog open={isEditingOpen} onOpenChange={setIsEditingOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <PencilIcon className="h-3 w-3" />
              Editar
            </Button>
          </DialogTrigger>

          {isEditingOpen && (
            <UpsertProductModal
              productId={product.id}
              product={product}
              onOpenChange={setIsEditingOpen}
            />
          )}
        </Dialog>
      </TableCell>
      <TableCell>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="xs"
              className="text-destructive hover:text-destructive"
            >
              <Trash2Icon className="h-3 w-3" />
              Excluir
            </Button>
          </AlertDialogTrigger>

          <DeleteProductModal productId={product.id} />
        </AlertDialog>
      </TableCell>
    </TableRow>
  )
}
