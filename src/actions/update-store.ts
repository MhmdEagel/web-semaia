"use server";

import { db } from "@/lib/db";
import getCurrentUser from "@/lib/auth";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { writeFile, unlink, mkdir } from "fs/promises";
import { existsSync } from "fs";

export async function updateStoreAction(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const storeId = formData.get("storeId") as string;
  const logoFile = formData.get("image") as File | null;

  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  let logoUrl: string | undefined;

  if (logoFile && logoFile.size > 0) {
    const buffer = Buffer.from(await logoFile.arrayBuffer());
    const filename = `${uuidv4()}-${logoFile.name}`;
    const dirPath = path.join(process.cwd(), "public/images/uploads/vendor");

    // Buat direktori kalau belum ada
    if (!existsSync(dirPath)) {
      await mkdir(dirPath, { recursive: true });
    }

    const uploadPath = path.join(dirPath, filename);
    await writeFile(uploadPath, buffer);

    logoUrl = `/images/uploads/vendor/${filename}`;

    // Optional: hapus logo lama
    const existingStore = await db.store.findUnique({
      where: { id: storeId },
    });

    if (
      existingStore?.logoUrl &&
      existingStore.logoUrl.startsWith("/images/uploads/vendor")
    ) {
      const oldImagePath = path.join(
        process.cwd(),
        "public",
        existingStore.logoUrl
      );
      await unlink(oldImagePath).catch(() => null); // amanin kalau file udah kehapus duluan
    }
  }

  await db.store.update({
    where: { id: storeId },
    data: {
      name,
      description,
      ...(logoUrl && { logoUrl }),
    },
  });

  redirect("/vendor/dashboard");
}
