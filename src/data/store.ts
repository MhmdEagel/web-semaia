import { db } from "@/lib/db";

const getUserStoreProducts = async (id: string) => {
  const store = await db.store.findUnique({
    where: { ownerId: id },
    include: {
      products: true, // ← ambil semua produk toko ini
    },
  });
  return store
};

export {getUserStoreProducts};
