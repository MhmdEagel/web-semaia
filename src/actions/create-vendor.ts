"use server";

import { db } from "@/lib/db";
import getCurrentUser from "@/lib/auth";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";

export async function createStoreAction(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const logoFile = formData.get("logo") as File | null;

  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  let logoUrl = "";

  if (logoFile && logoFile.size > 0) {
    const buffer = Buffer.from(await logoFile.arrayBuffer());
    const filename = `${uuidv4()}-${logoFile.name}`;
    const dirPath = path.join(process.cwd(), "public/images/uploads/vendor");

    // Buat folder jika belum ada
    if (!existsSync(dirPath)) {
      await mkdir(dirPath, { recursive: true });
    }

    const uploadPath = path.join(dirPath, filename);
    await writeFile(uploadPath, buffer);

    logoUrl = `/images/uploads/vendor/${filename}`;
  }

  await db.store.create({
    data: {
      name,
      description,
      logoUrl,
      ownerId: user.id,
    },
  });

  redirect("/vendor/dashboard");
}
