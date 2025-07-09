"use server";

import { db } from "@/lib/db";
import { writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

export async function updateProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string);
  // const storeId = formData.get("storeId") as string;

  let imageUrl: string | undefined;

  const file = formData.get("image") as File | null;
  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${uuidv4()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public", "uploads", filename);
    await writeFile(filePath, buffer);
    imageUrl = `/uploads/${filename}`;
  }

  await db.product.update({
    where: { id },
    data: {
      name,
      description,
      price,
      stock,
      ...(imageUrl && { imageUrl }),
    },
  });

  revalidatePath("/vendor/products");
}
