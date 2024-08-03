
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import Link from "next/link";
import { isDate } from "util/types";

export default function Component({
  data,
  head,
}) {

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <TableHead>
          {head.map((key) => (
            <TableHeadCell key={key}>{key}</TableHeadCell>
          ))}
          <TableHeadCell>
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          { data &&
            data.map((row,i) => (
              <TableRow key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                {Object.values(row).map((value,j) => (
                  <TableCell key={i+j} className={j==1?"whitespace-nowrap font-medium text-gray-900 dark:text-white":""}>{<>value</>
                  }</TableCell>
                ))}
                <TableCell>
                  <Link href="/admin/blogs/1" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    Edit
                  </Link>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
}
