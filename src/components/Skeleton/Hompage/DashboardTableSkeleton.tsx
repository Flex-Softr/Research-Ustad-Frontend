import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export default function TableSkeleton() {
  return (
    <div className="">
      <Table>
        <TableHeader className='bg-gray-100'>
          <TableRow>
            <TableHead>
              <Skeleton className="h-6 w-28 bg-slate-200" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-6 w-28 bg-slate-200" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-6 w-28 bg-slate-200" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-6 w-28 bg-slate-200" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-6 w-28 bg-slate-200" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-6 w-28 bg-slate-200" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-6 w-28 bg-slate-200" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-6 w-28 bg-slate-200" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-6 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-24" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
