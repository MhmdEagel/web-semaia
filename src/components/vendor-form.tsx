"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { storeSchema } from "@/schemas/schemas";
import ErrorCard from "./ui/error-card";
import { createStoreAction } from "@/actions/create-vendor";
import { useState } from "react";
import { Spinner } from "./ui/spinner";
import { z } from "zod";

export function StoreForm() {
  const [isPending, setIsPending] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof storeSchema>>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { errors } = form.formState;

  const handleSubmit = async (data: z.infer<typeof storeSchema>) => {
    try {
      setIsPending(true);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description ?? "");

      if (logoFile) {
        formData.append("logo", logoFile);
      }

      await createStoreAction(formData);
    } catch (error) {
      form.setError("root", { message: (error as Error).message });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {errors.root && <ErrorCard>{errors.root.message}</ErrorCard>}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Name</FormLabel>
              <FormControl>
                <Input placeholder="Your store name" {...field} autoComplete="off" />
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
                <Textarea placeholder="Optional description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Store Logo</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setLogoFile(file);
              }}
            />
          </FormControl>
        </FormItem>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Spinner variant="circle" color="white" /> : "Create Vendor"}
        </Button>
      </form>
    </Form>
  );
}
