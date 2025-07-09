"use server";

import { v4 as uuidv4 } from "uuid";
import path from 'path';
import { writeFile } from "fs/promises";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";


const createProduct = async (formData: FormData) => {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const stock = parseInt(formData.get('stock') as string);
  const storeId = formData.get('storeId') as string;
  const image = formData.get('image') as File;

  let imageUrl = '';
  if (image && image.size > 0) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${uuidv4()}-${image.name}`;
    const uploadPath = path.join(process.cwd(), "public/uploads", filename);
    await writeFile(uploadPath, buffer);
    imageUrl = `/uploads/${filename}`;
  }

   await db.product.create({
    data: {
      name,
      description,
      price,
      stock,
      storeId,
      imageUrl,
    },
  });
  revalidatePath("/vendor/dashboard/products")

};

export default createProduct;
