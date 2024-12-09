import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function ProductTableSkeleton() {
  return Array.from({ length: 10 }).map((_, i) => (
    <TableRow key={i}>
      <TableCell>
        <Skeleton className="h-4 w-[300px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[210px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[auto]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[150px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[100px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[100px]" />
      </TableCell>
    </TableRow>
  ))
}
