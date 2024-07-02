"use client";

import { docWithUser } from "@/types";
import { doc } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import format from "dateformat";
import { Checkbox } from "./checkbox";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const columns: ColumnDef<docWithUser>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => <div className='capitalize'>{row.getValue("name")}</div>,
  },

  {
    accessorKey: "createdBy.name",
    id: "created_by",
    header: () => <div className='text-right'>Author</div>,
    cell: ({ row }) => {
      return (
        <div className='text-right font-medium'>
          {row.getValue("created_by")}
        </div>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          updated_at
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("updated_at") as any;
      return (
        <div className='lowercase'>
          {format(new Date(date), "dddd, mmmm dS, yyyy")}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const doc = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [loading, setLoading] = useState(false);

      const deleteDoc = () => {
        setLoading(true);
        axios
          .delete(`/api/doc/${doc.id}`)
          .then((data) => {
            toast.success("document deleted");
            router.refresh();
          })
          .catch((err) => {
            toast.error(err.response.data);
          })
          .finally(() => {
            setLoading(false);
          });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem disabled={loading} onClick={() => deleteDoc()}>
              delete
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push(`/user/doc/${doc.id}`)}
            >
              edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
