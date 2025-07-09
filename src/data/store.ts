import { db } from "@/lib/db";

const getUserStoreProducts = async (id?: string) => {
  const store = await db.store.findUnique({
    where: { ownerId: id },
    include: {
      products: true, // ← ambil semua produk toko ini
    },
  });
  return store
};

const getUserStore = async (id?: string) => {
   const currentUser = await db.store.findUnique({
    where: {ownerId: id}
   })
   return currentUser;
}

export {getUserStoreProducts, getUserStore};
