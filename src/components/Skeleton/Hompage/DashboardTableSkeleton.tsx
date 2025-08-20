import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function TableSkeleton() {
  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader className='bg-gray-100'>
          <TableRow>
            <TableHead className="px-2 py-3">
              <Skeleton className="h-4 w-16 md:w-20 bg-slate-200" />
            </TableHead>
            <TableHead className="px-2 py-3">
              <Skeleton className="h-4 w-20 md:w-24 bg-slate-200" />
            </TableHead>
            <TableHead className="px-2 py-3">
              <Skeleton className="h-4 w-16 md:w-20 bg-slate-200" />
            </TableHead>
            <TableHead className="px-2 py-3">
              <Skeleton className="h-4 w-16 md:w-20 bg-slate-200" />
            </TableHead>
            <TableHead className="px-2 py-3">
              <Skeleton className="h-4 w-16 md:w-20 bg-slate-200" />
            </TableHead>
            <TableHead className="px-2 py-3">
              <Skeleton className="h-4 w-20 md:w-24 bg-slate-200" />
            </TableHead>
            <TableHead className="px-2 py-3">
              <Skeleton className="h-4 w-16 md:w-20 bg-slate-200" />
            </TableHead>
            <TableHead className="px-2 py-3">
              <Skeleton className="h-4 w-16 md:w-20 bg-slate-200" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <TableRow key={index}>
                <TableCell className="px-2 py-3">
                  <Skeleton className="h-4 w-12 md:w-16" />
                </TableCell>
                <TableCell className="px-2 py-3">
                  <Skeleton className="h-4 w-24 md:w-32" />
                </TableCell>
                <TableCell className="px-2 py-3">
                  <Skeleton className="h-4 w-16 md:w-20" />
                </TableCell>
                <TableCell className="px-2 py-3">
                  <Skeleton className="h-4 w-12 md:w-16" />
                </TableCell>
                <TableCell className="px-2 py-3">
                  <Skeleton className="h-4 w-16 md:w-20" />
                </TableCell>
                <TableCell className="px-2 py-3">
                  <Skeleton className="h-4 w-20 md:w-24" />
                </TableCell>
                <TableCell className="px-2 py-3">
                  <Skeleton className="h-4 w-12 md:w-16" />
                </TableCell>
                <TableCell className="px-2 py-3">
                  <Skeleton className="h-4 w-16 md:w-20" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
