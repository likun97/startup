"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { DialogNewUser } from "./dialog"  // 在users的相关文件中
import { createClient } from '@/utils/supabase/client'
import { useRouter } from "next/navigation"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
 
 
export type User = {
  id: string
  city: string
  occupation: string
  childAge: number
  lifestyle: string
  annualClothingSpend: number
  purchaseHistory1: string
  purchaseHistory2: string
  purchaseHistory3: string
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "User ID",
    cell: ({ row }) => {
      const value = row.getValue("id") as string
      return <div className="min-w-[100px] w-full truncate">{value}</div>
    }
  },
  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => {
      const value = row.getValue("city") as string
      return <div className="min-w-[100px] w-full truncate">{value}</div>
    }
  },
  {
    accessorKey: "occupation",
    header: "Occupation",
    cell: ({ row }) => {
      const value = row.getValue("occupation") as string
      return <div className="min-w-[100px] w-full truncate">{value}</div>
    }
  },
  {
    accessorKey: "childAge",
    header: "Child Age",
    cell: ({ row }) => {
      const value = row.getValue("childAge") as number
      return <div className="min-w-[80px] w-full truncate">{value}</div>
    }
  },
  {
    accessorKey: "lifestyle",
    header: "Lifestyle",
    cell: ({ row }) => {
      const value = row.getValue("lifestyle") as string
      return <div className="min-w-[120px] w-full truncate">{value}</div>
    }
  },
  {
    accessorKey: "annualClothingSpend",
    header: "Annual Clothing Spend (¥)",
    cell: ({ row }) => {
      const value = row.getValue("annualClothingSpend") as number
      return (
        <div className="min-w-[120px] w-full truncate text-right">
          {value ? `¥${value.toLocaleString()}` : '-'}
        </div>
      )
    }
  },
  {
    accessorKey: "purchaseHistory1",
    header: "Purchase History 1",
    cell: ({ row }) => {
      const value = row.getValue("purchaseHistory1") as string
      return <div className="min-w-[200px] w-full truncate">{value}</div>
    }
  },
  {
    accessorKey: "purchaseHistory2",
    header: "Purchase History 2",
    cell: ({ row }) => {
      const value = row.getValue("purchaseHistory2") as string
      return <div className="min-w-[200px] w-full truncate">{value}</div>
    }
  },
  {
    accessorKey: "purchaseHistory3",
    header: "Purchase History 3",
    cell: ({ row }) => {
      const value = row.getValue("purchaseHistory3") as string
      return <div className="min-w-[200px] w-full truncate">{value}</div>
    }
  },
   
  {
    accessorKey: "create_at", 
    header: ({ column }) => {
        return (
          <Label 
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Create At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Label>
        )
      },
  }, 
//   {
//     accessorKey: "amount",
//     header: () => <div className="text-right">Amount</div>,
//     cell: ({ row }) => {
//       const amount = parseFloat(row.getValue("amount"))
//       const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(amount)
 
//       return <div className="text-right font-medium">{formatted}</div>
//     },
//   },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
      const router = useRouter()
      
      const handleDelete = async () => {
        try {
          const supabase = createClient() 
          const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', user.id)

          if (error) throw error
          
          router.refresh()
        } catch (error) {
          console.error('Error deleting user:', error)
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Label className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Label>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Check Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DialogNewUser user={user} mode="edit" />
            <DropdownMenuItem 
              onClick={handleDelete}
              className="text-red-600 focus:text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
