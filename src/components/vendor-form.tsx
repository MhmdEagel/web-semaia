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
import { storeSchema, StoreSchema } from "@/schemas/schemas";
import { IStore } from "@/types/Store";
import ErrorCard from "./ui/error-card";
import { createStoreAction } from "@/actions/create-vendor";
import { useState } from "react";
import { Spinner } from "./ui/spinner";

export function StoreForm() {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<StoreSchema>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      description: "",
      logoUrl: "",
    },
  });

  const { errors } = form.formState;

  const handleSubmit = async (data: IStore) => {
    try {
      setIsPending(true);
      await createStoreAction(data);
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

        <FormField
          control={form.control}
          name="logoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo URL</FormLabel>
              <FormControl>
                <Input placeholder="Optional Logo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Spinner variant="circle" color="white" /> : "Create Vendor"}
        </Button>
      </form>
    </Form>
  );
}
