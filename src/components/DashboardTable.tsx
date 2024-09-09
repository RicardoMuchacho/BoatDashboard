"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Reservation, ReservationStatus } from "@/interfaces/reservation.interface"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { ClipLoader } from 'react-spinners';

export const columns: ColumnDef<Reservation>[] = [
  {
    accessorFn: (row) => `${row.start_date} / ${row.end_date}`,
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          className="bg-inherit text-inherit border-0 hover:bg-inherit hover:text-gray-800"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          className="bg-inherit text-inherit border-0 hover:bg-inherit hover:text-gray-800"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    id: 'full_name',
    header: ({ column }) => {
      return (
        <Button
          className="bg-inherit text-inherit border-0 hover:bg-inherit hover:text-gray-800"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("full_name")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Telefono",
    cell: ({ row }) => (
      <a href={`https://wa.me/${row.getValue("phone")}`} target="_blanck" className="capitalize">{row.getValue("phone")}</a>
    ),
  },
  {
    accessorKey: "boat_name",
    header: "Lancha",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("boat_name")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Monto</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const rowStatus: ReservationStatus = row.getValue("status")

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Badge status={rowStatus}>{rowStatus}</Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {Object.values(ReservationStatus)
              .filter((status) => status !== rowStatus)
              .map((status) => (
                <>
                  <DropdownMenuItem className="">{status}</DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0 bg-inherit text-inherit border-0 hover:bg-inherit hover:text-gray-800">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Detalles</DropdownMenuLabel>
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

interface Props {
  data: Reservation[];
  loading: boolean;
}

export function DashboardTable({ data, loading }: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 5 })

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination
    },
  })

  return (
    <div className="w-full mt-6">
      <Card className="flex flex-col h-[465px]">
        <CardHeader className="pt-0 pb-0">
          <div className="flex items-center justify-between py-4">
            <CardTitle className="text-start">Reservas</CardTitle>
            <div className="flex gap-2">
              <Input
                placeholder="Buscar correo"
                value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("email")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              <Button className="border-2 border-gray-200 bg-inherit text-gray-600">
                Agregar Reserva
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columnas <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

          </div>
        </CardHeader>

        <CardContent className="flex flex-col flex-grow">
          <div className="rounded-md border mb-2">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead className="text-center" key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {loading && (
                  <div className="absolute inset-0 top-40">
                    <ClipLoader size={48} color="text-primary" className="text-primary" />
                  </div>
                )}
                {!loading && !table.getRowModel().rows?.length && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
                {!loading && table.getRowModel().rows?.length && (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell className="p-2.5" key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-1 items-end gap-4 justify-end mt-2">
            <div className="flex mb-1 text-sm text-muted-foreground">
              {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()} pagina(s).
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Siguiente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
