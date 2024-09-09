import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { ReservationStatus } from "@/interfaces/reservation.interface"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu"
import { Button } from "./button"


const badgeVariants = cva(
  "inline-flex justify-center w-[84px] items-center rounded-full border px-2.5 py-0.5 cursor-pointer rounded-full text-xs transition-colors",
  {
    variants: {
      status: {
        success: "border-transparent bg-chart-2 text-white hover:bg-chart-2/80",
        processing: "border-transparent bg-primary/80 text-white hover:bg-primary/60",
        canceled: "border-transparent bg-destructive text-white hover:bg-destructive/80",
        reserved: "border-transparent bg-chart-5 text-white hover:bg-chart-5/80",
      },
    },
    defaultVariants: {
      status: "success",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }


function Badge({ className, status, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ status }), className)}{...props} >
    </div>
  )
}

export { Badge, badgeVariants }
