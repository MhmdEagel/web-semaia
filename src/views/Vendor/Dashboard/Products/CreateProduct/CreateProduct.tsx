"use client";

import createProduct from "@/actions/create-product";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { productSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = productSchema.omit({ imageUrl: true });

export default function CreateProduct({ storeId }: { storeId: string }) {
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      storeId: storeId,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description ?? "");
    formData.append("price", data.price.toString());
    formData.append("stock", data.stock.toString());
    formData.append("storeId", data.storeId);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    startTransition(() => {
      createProduct(formData)
        .then(() => {
          form.reset();
          setImageFile(null);
          setOpen(false);
        })
        .catch((err) => {
          console.error("Error creating product: ", err);
        });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
            <DialogDescription>
              Please fill in the informations about the product you want to add.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4 max-h-[400px] overflow-y-auto pr-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product name"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Product description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setImageFile(file);
                  }}
                />
              </FormControl>
            </FormItem>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                Save Product
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
