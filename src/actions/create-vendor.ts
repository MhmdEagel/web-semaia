"use server"

import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import getCurrentUser from "@/lib/auth" // asumsi kamu punya auth helper
import { IStore } from "@/types/Store"

export async function createStoreAction(data: IStore) {
  const {name, description, logoUrl} = data;
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Unauthorized")
  }
  await db.store.create({
    data: {
      name,
      description,
      logoUrl,
      ownerId: user.id
    },
  })

  redirect("/vendor") // atau ganti sesuai kebutuhanmu
}
