import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SearchBar from "@/components/ui/search-bar";
import { db } from "@/lib/db";
import Image from "next/image";

export default async function Browse() {
  const products = await db.product.findMany({
    include: {
      store: true
    }
  });

  console.log(products);

  return (
    <div className="p-4 pb-32">
      <div className="mt-4 max-w-xl mx-auto">
        <SearchBar />
      </div>
      <div className="mt-6 flex flex-wrap">
        {products.map((item) => (
          <Card key={item.id} className="w-full max-w-[400px]">
            <CardHeader>
              <div className="bg-gray-600 flex justify-center items-center  aspect-square">
                <Image
                  src={"/images/placeholder.png"}
                  width={100}
                  height={100}
                  alt="Product image"
                />
              </div>
              <CardTitle>
                <div className="text-lg font-bold text-primary">
                  {item.name}
                </div>
              </CardTitle>
              <CardDescription>{item.store.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="max-h-[100px] text-ellipsis  line-clamp-6">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
