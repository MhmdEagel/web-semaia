"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { EditProductDialog } from "../EditProduct/EditProduct";
import { DeleteProduct } from "../DeleteProduct/DeleteProduct";

export type PRODUCT = {
  name: string;
  id: string;
  createdAt: Date;
  description: string | null;
  price: number;
  stock: number;
  imageUrl: string | null;
  storeId: string;
};

export const columns: ColumnDef<PRODUCT>[] = [
  {
    accessorKey: "imageUrl",
    header: () => <div>Image</div>,
    cell: ({ row }) => {
      const image = row.getValue("imageUrl") as string | null;
      const imageUrl =
        image && image.trim() !== "" ? image : "/images/placeholder.png";
      return (
        <div className="mx-auto">
          <Image
            className="block"
            src={imageUrl}
            width={100}
            height={100}
            alt="Product Image"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: () => <div>Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const desc = row.getValue("description") as string | null;
      return (
        <div className="whitespace-normal text-muted-foreground">
          {desc ?? "-"}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <EditProductDialog product={product} />
            <DeleteProduct productId={product.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
