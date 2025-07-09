import { z } from "zod"

export const loginSchema = z.object({
  email: z.string({required_error: "Email is required"}).email("Email is invalid"),
  password: z.string({required_error: "Password is required"}).min(6, "Password must be 6 characters minimal"),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    fullname: z.string().min(2, "Fullname must be 2 characters minimal"),
    email: z.string().email("Email is invalid"),
    password: z.string().min(6, "Password must be 6 characters minimal"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password not match",
    path: ["confirmPassword"],
  })

export type RegisterSchema = z.infer<typeof registerSchema>

export const storeSchema = z.object({
  name: z.string().min(3, "Store name must be at least 3 characters"),
  description: z.string().optional(),
})

export type StoreSchema = z.infer<typeof storeSchema>

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  stock: z.coerce.number().min(0, "Stock must be 0 or more"),
  imageUrl: z.string().url("Invalid image URL").optional(),
  storeId: z.string().min(1, "Store ID is required"),
});

export type ProductSchema = z.infer<typeof productSchema>;
