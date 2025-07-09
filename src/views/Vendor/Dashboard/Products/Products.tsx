import Image from "next/image";
import CreateProduct from "./CreateProduct/CreateProduct";
import { getUserStoreProducts } from "@/data/store";
import { redirect } from "next/navigation";
import getCurrentUser from "@/lib/auth";

export default async function Products() {
  const user = await getCurrentUser();
  const store = await getUserStoreProducts(user?.id);
  if (!store) redirect("/vendor");

  const { products } = store;

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image
        className="mb-4"
        src={"/images/ilustration/empty.svg"}
        width={300}
        height={300}
        alt="Vendor not found"
      />

      <h2 className="text-2xl text-primary font-bold">There are no products</h2>
      <p className="mb-4">it seems you don&apos;t add any products.</p>
      <CreateProduct storeId={store?.id} />
    </div>
  );
}
