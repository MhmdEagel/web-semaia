"use server";

import { db } from "@/lib/db";
import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

export async function deleteProduct(productId: string) {
  // Step 1: ambil data produk (buat dapat imageUrl)
  const product = await db.product.findUnique({
    where: { id: productId },
  });

  if (!product) return;

  // Step 2: jika ada imageUrl, hapus file fisik-nya
  if (product.imageUrl && product.imageUrl.startsWith("/uploads/")) {
    const imagePath = path.join(process.cwd(), "public", product.imageUrl);

    try {
      await fs.unlink(imagePath);
      console.log(`Image deleted: ${imagePath}`);
    } catch (err) {
      console.warn("Image file not found or failed to delete:", err);
      // gak fatal, lanjut aja
    }
  }

  // Step 3: hapus dari database
  await db.product.delete({
    where: { id: productId },
  });

  revalidatePath("/vendor/products");
}
